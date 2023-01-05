import { writable } from 'svelte/store';
import paper from 'paper';
import type PaperEditor from '$lib/editor/paper/paper-editor.svelte';

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
	neck: Bodypart;
	thigh: Bodypart;
	lowerLeg: Bodypart;
}
export type Bodypart = {
	length: SkeletonParams;
	angle: SkeletonParams;
};
export type SkeletonParams = {
	init: number;
	last?: number;
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
	head: SkeletonJoint;
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
		},
		neck: {
			length: {
				init: 100,
				min: 0,
				max: 150
			},
			angle: {
				init: -45,
				min: 180,
				max: -180
			}
		},
		thigh: {
			length: {
				init: 30,
				min: 20,
				max: 75
			},
			angle: {
				init: 45,
				min: 0,
				max: -135
			}
		},
		lowerLeg: {
			length: {
				init: 25,
				min: 15,
				max: 50
			},
			angle: {
				init: 45,
				min: 45,
				max: 180
			}
		}
	}
};
export const sheep = writable<SheepState>(initialState);
