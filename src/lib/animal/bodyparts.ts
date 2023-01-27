import paper from 'paper';

export type BodyPartParam = {
	name: string;
	startPoint: paper.Point;
	endPoint: paper.Point;
	startRadius: number;
	endRadius: number;
};

export const bodyParts: BodyPartParam[] = [
	{
		name: 'body',
		startPoint: new paper.Point(0, 0),
		endPoint: new paper.Point(200, 0),
		startRadius: 50,
		endRadius: 50
	}
];

export class BodyPart {
	#name: string;
	#startPoint: paper.Point;
	#endPoint: paper.Point;
	#startRadius: number;
	#endRadius: number;
	constructor(params: BodyPartParam) {
		this.#name = params.name;
		this.#startPoint = params.startPoint;
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
	get endPoint(): paper.Point {
		return this.#endPoint;
	}
	get startRadius(): number {
		return this.#startRadius;
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
