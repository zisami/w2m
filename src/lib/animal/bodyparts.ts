import paper from 'paper';

export type BodyPartParam = {
	name: string;
	startPointName: string;
	startPoint?: paper.Point;
	startRadius: number;
	endPointName: string;
	endPoint?: paper.Point;
	endRadius: number;
};

export class BodyPart {
	#name: string;
	#startPointName: string;
	#endPointName: string;
	#startPoint: paper.Point;
	#startRadius: number;
	#endPoint: paper.Point;
	#endRadius: number;

	constructor(params: BodyPartParam) {
		if (
			!params.name ||
			!params.startPointName ||
			!params.endPointName ||
			!params.startRadius ||
			!params.endRadius ||
			!params.startPoint ||
			!params.endPoint
		) {
			throw new Error('BodyPart: missing parameter');
		}

		this.#name = params.name;
		this.#startPointName = params.startPointName;
		this.#startPoint = params.startPoint;
		this.#endPointName = params.endPointName;
		this.#endPoint = params.endPoint;
		this.#startRadius = params.startRadius;
		this.#endRadius = params.endRadius;
		console.log('bodypart created');
	}
	get name(): string {
		return this.#name;
	}

	get startPoint(): paper.Point {
		return this.#startPoint;
	}
	set startPoint(point: paper.Point) {
		this.#startPoint = point;
	}
	get startPointName(): string {
		return this.#startPointName;
	}
	get startRadius(): number {
		return this.#startRadius;
	}

	get endPointName(): string {
		return this.#endPointName;
	}
	set endPoint(point: paper.Point) {
		this.#endPoint = point;
	}
	get endPoint(): paper.Point {
		return this.#endPoint;
	}
	get endRadius(): number {
		return this.#endRadius;
	}

	draw(): void {
		const bodypartVector = this.endPoint.subtract(this.startPoint);
		const bodypartLength = bodypartVector.length;
		const bodypartAngle = bodypartVector.angle;
		//console.log(bodypartVector, bodypartLength, bodypartAngle);

		const bodyPartOutline = new paper.Path();
		bodyPartOutline.strokeColor = new paper.Color('black');
		bodyPartOutline.add(
			this.startPoint.add(new paper.Point({ length: this.startRadius, angle: bodypartAngle - 90 }))
		);
		bodyPartOutline.add(
			this.endPoint.add(new paper.Point({ length: this.endRadius, angle: bodypartAngle - 90 }))
		);
		bodyPartOutline.arcBy(
			new paper.Point({ length: this.endRadius * 2, angle: bodypartAngle + 90 })
		);
		bodyPartOutline.add(
			this.startPoint.add(new paper.Point({ length: this.startRadius, angle: bodypartAngle + 90 }))
		);
		bodyPartOutline.arcBy(
			new paper.Point({ length: this.startRadius * 2, angle: bodypartAngle - 90 })
		);
		//bodyPartOutline.closed = true;
		//bodyPartOutline.smooth({ type: 'continuous', factor: 0.5 });
		bodyPartOutline.fillColor = new paper.Color('green');
		bodyPartOutline.opacity = 0.1;
		//console.log('draw');
	}
}
