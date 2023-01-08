import paper from 'paper';

export function getLayerByName(name: string): paper.Layer | null {
	//console.log(paper.project.layers.map((layer) => layer.name));
	return paper.project.layers.find((layer) => layer.name === name) || null;
}

type vectorHelperValues = {
	fixLength: boolean;
	fixAngle: boolean;
	showCircle: boolean;
	showAngleLength: boolean;
	showCoordinates: boolean;
	x?: number;
	y?: number;
	length?: number;
	angle?: number;
};

export function vectorHelper(
	startPoint: paper.Point,
	endPoint: paper.Point,
	isValidDistance = false,
	isValidAngle = false
) {
	const values: vectorHelperValues = {
		fixLength: false,
		fixAngle: false,
		showCircle: false,
		showAngleLength: true,
		showCoordinates: true
	};

	const vectorStart: paper.Point = startPoint;
	const vectorPrevious: paper.Point = endPoint;
	let vectorItem: paper.Item | null,
		items: paper.Item[],
		dashedItems: paper.Item[],
		vector: paper.Point;

	processVector(vectorStart, true, isValidDistance, isValidAngle);
	//console.log(startPoint, endPoint);

	function processVector(
		point: paper.Point,
		drag: boolean,
		isValidDistance = false,
		isValidAngle = false
	) {
		vector = endPoint.subtract(startPoint);
		if (vectorPrevious) {
			if (values.fixLength && values.fixAngle) {
				vector = vectorPrevious;
			} else if (values.fixLength) {
				vector.length = vectorPrevious.length;
			} else if (values.fixAngle) {
				vector = vector.project(vectorPrevious);
			}
		}
		drawVector(false, isValidDistance, isValidAngle);
	}

	function drawVector(drag: boolean, isValidDistance = false, isValidAngle = false) {
		const validColor = '#22FF11';
		const notValidColor = '#FF2222';
		if (items) {
			for (let i = 0, l = items.length; i < l; i++) {
				items[i].remove();
			}
		}
		if (vectorItem) vectorItem.remove();
		items = [];
		const arrowVector = vector.normalize(10);
		const end = vectorStart.add(vector);
		vectorItem = new paper.Group([
			new paper.Path([vectorStart, end]),
			new paper.Path([end.add(arrowVector.rotate(135)), end, end.add(arrowVector.rotate(-135))])
		]);
		vectorItem.strokeWidth = 0.75;
		vectorItem.children[0].strokeColor = new paper.Color(
			isValidDistance ? validColor : notValidColor
		);
		vectorItem.children[1].strokeColor = new paper.Color(isValidAngle ? validColor : notValidColor);
		// Display:
		dashedItems = [];
		// Draw Circle
		if (values.showCircle) {
			dashedItems.push(
				new paper.Path.Circle({
					center: vectorStart,
					radius: vector.length
				})
			);
		}
		// Draw Labels
		if (values.showAngleLength) {
			drawAngle(vectorStart, vector, !drag);
			if (!drag) drawLength(vectorStart, end, vector.angle < 0 ? -1 : 1, true);
		}
		const quadrant = vector.quadrant;
		if (values.showCoordinates && !drag) {
			drawLength(
				vectorStart,
				vectorStart.add([vector.x, 0]),
				[1, 3].indexOf(quadrant) != -1 ? -1 : 1,
				true,
				vector.x,
				'x: '
			);
			drawLength(
				vectorStart,
				vectorStart.add([0, vector.y]),
				[1, 3].indexOf(quadrant) != -1 ? 1 : -1,
				true,
				vector.y,
				'y: '
			);
		}
		for (let i = 0, l = dashedItems.length; i < l; i++) {
			const item = dashedItems[i];
			item.strokeColor = new paper.Color('black');
			item.dashArray = [1, 2];
			items.push(item);
		}
		// Update palette
		values.x = vector.x;
		values.y = vector.y;
		values.length = vector.length;
		values.angle = vector.angle;
	}

	function drawAngle(center: paper.Point, vector: paper.Point, label: boolean) {
		const radius = 25,
			threshold = 10;
		if (vector.length < radius + threshold || Math.abs(vector.angle) < 15) return;
		const from = new paper.Point(radius, 0);
		const through = from.rotate(vector.angle / 2);
		const to = from.rotate(vector.angle);
		const end = center.add(to);
		dashedItems.push(
			new paper.Path.Line(center, center.add(new paper.Point(radius + threshold, 0)))
		);
		dashedItems.push(new paper.Path.Arc(center.add(from), center.add(through), end));
		const arrowVector = to.normalize(7.5).rotate(vector.angle < 0 ? -90 : 90);
		dashedItems.push(
			new paper.Path([end.add(arrowVector.rotate(135)), end, end.add(arrowVector.rotate(-135))])
		);
		if (label) {
			// Angle Label
			const text = new paper.PointText(center.add(through).add(new paper.Point(0, 3)));
			text.content = Math.floor(vector.angle * 100) / 100 + '°';
			text.fillColor = new paper.Color('black');
			text.fontSize = 8;
			items.push(text);
		}
	}

	function drawLength(
		from: paper.Point,
		to: paper.Point,
		sign: number,
		label: boolean,
		value?: number,
		prefix?: string
	) {
		const lengthSize = 5;
		if (to.subtract(from).length < lengthSize * 4) return;
		const vector = to.subtract(from);
		const awayVector = vector.normalize(lengthSize).rotate(90 * sign);
		const upVector = vector.normalize(lengthSize).rotate(45 * sign);
		const downVector = upVector.rotate(-90 * sign);
		const lengthVector = vector.normalize(vector.length / 2 - lengthSize * Math.sqrt(2));
		const line = new paper.Path();
		line.add(from.add(awayVector));
		line.lineBy(upVector);
		line.lineBy(lengthVector);
		line.lineBy(upVector);
		const middle = line.lastSegment.point;
		line.lineBy(downVector);
		line.lineBy(lengthVector);
		line.lineBy(downVector);
		dashedItems.push(line);
		if (label) {
			// Length Label
			const textAngle: number = Math.abs(vector.angle) > 90 ? 180 + vector.angle : vector.angle;
			// Label needs to move away by different amounts based on the
			// vector's quadrant:
			const away = (sign >= 0 ? [1, 4] : [2, 3]).indexOf(vector.quadrant) != -1 ? 8 : 0;
			value = value || vector.length;
			const text = new paper.PointText({
				point: middle.add(awayVector.normalize(away + lengthSize)),
				content: (prefix || '') + Math.floor(value * 1000) / 1000,
				fillColor: 'black',
				justification: 'center',
				fontSize: 8
			});
			text.rotate(textAngle);
			items.push(text);
		}
	}
}

export function vectorChecker(
	startPoint: paper.Point,
	endPoint: paper.Point,
	isValidDistance = false,
	isValidAngle = false,
	render = true
) {
	getLayerByName('eventVectors')?.remove();
	if (render) {
		const skeletonLayer = new paper.Layer();
		skeletonLayer.name = 'eventVectors';
		vectorHelper(startPoint, endPoint, isValidDistance, isValidAngle);
	}
}
