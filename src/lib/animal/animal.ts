import type { iPose } from './animal.d';
import type { BodyPartParam } from './bodyparts';
import { BodyPart } from './bodyparts';
import Skeleton from './skeleton';

export default class Animal {
	//pose: iPose;
	skeleton: Skeleton;
	bodyParts: BodyPart[] = [];
	constructor(pose: iPose, bodyPartsParams: BodyPartParam[]) {
		//this.pose = pose;
		this.skeleton = new Skeleton(pose);
		this.bodyParts = this.initBodyParts(bodyPartsParams);
	}
	initBodyParts(bodyPartsParams: BodyPartParam[]): BodyPart[] {
		const bodyParts = bodyPartsParams
			.map((bodyPartParam) => {
				if (!bodyPartParam?.startPointName || !bodyPartParam?.endPointName) return bodyPartParam;
				return {
					...bodyPartParam,
					startPoint: this.skeleton.getAbsolutePointByName(bodyPartParam.startPointName),
					endPoint: this.skeleton.getAbsolutePointByName(bodyPartParam.endPointName)
				};
			})
			.map((bodyPartParam) => {
				return new BodyPart(bodyPartParam);
			});
		return bodyParts;
	}
	updateBodyParts(): void {
		console.log(this.skeleton.getLimbByName('knee_FR'));

		this.bodyParts.forEach((bodyPart) => {
			bodyPart.startPoint = this.skeleton.getAbsolutePointByName(bodyPart.startPointName);
			bodyPart.endPoint = this.skeleton.getAbsolutePointByName(bodyPart.endPointName);
		});
	}
}
