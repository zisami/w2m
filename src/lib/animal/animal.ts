import type { iPose } from './animal.d';
import type { BodyPart } from './bodyparts';
import Skeleton from './skeleton';

export default class Animal {
	//pose: iPose;
	skeleton: Skeleton;
	bodyparts: BodyPart[] = [];
	constructor(pose: iPose) {
		//this.pose = pose;
		this.skeleton = new Skeleton(pose);
	}
}
