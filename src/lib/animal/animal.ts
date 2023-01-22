import type { iPose } from './pose';
import Skeleton from './skeleton';

export default class Animal {
	pose: iPose;
	skeleton: Skeleton;
	constructor(pose: iPose) {
		this.pose = pose;
		this.skeleton = new Skeleton(pose);
	}
}
