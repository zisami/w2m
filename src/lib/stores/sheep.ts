import { writable } from 'svelte/store';
import paper from 'paper';

export interface SheepState {
	scaleingFactor: number | null;
	svg: SVGElement | null;
	colors?: THREE.Color[] | null;
	skeletonConfig: SkeletonConfig;
	skeleton?: Skeleton;
}

export interface SkeletonConfig {
	startPoint: paper.Point;
	body: Bodypart;
}
export type Bodypart = {
	length: SkeletonParams;
	angle: SkeletonParams;
};
export type SkeletonParams = {
	init: number;
	min: number;
	max: number;
};
export type SkeletonJoint = {
	rotatesAround: string | null;
	point: paper.Point;
	length: SkeletonParams;
	angle: SkeletonParams;
};
export type Skeleton = {
	[key: string]: SkeletonJoint;
	hips: SkeletonJoint;
	shoulders: SkeletonJoint;
	//head: SkeletonJoint;
};
const initialState: SheepState = {
	scaleingFactor: null,
	svg: null,
	skeletonConfig: {
		startPoint: new paper.Point(100, 100),
		body: {
			length: {
				init: 100,
				min: 0,
				max: 150
			},
			angle: {
				init: 0,
				min: 0,
				max: -180
			}
		}
	}
};
export const sheep = writable<SheepState>(initialState);
