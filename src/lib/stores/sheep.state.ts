import { writable } from 'svelte/store';

import Skeleton from '$lib/animal/skeleton';
import { pose } from '$lib/animal/pose';
import { BodyPart } from '$lib/animal/bodyparts';
import paper from 'paper';

export interface SheepState {
	scaleingFactor: number | null;
	svg: SVGElement | null;
	colors?: THREE.Color[] | null;
	skeleton?: Skeleton;
	bodyParts?: BodyPart[];
}

const skeleton = new Skeleton(pose);
const initialState: SheepState = {
	scaleingFactor: null,
	svg: null,
	skeleton: skeleton,
	bodyParts: [
		new BodyPart({
			name: 'body',
			startPoint: skeleton.getAbsolutePointByName('hips'),
			endPoint: skeleton.getAbsolutePointByName('shoulders'),
			startRadius: 50,
			endRadius: 50
		}),
		new BodyPart({
			name: 'neck',
			startPoint: skeleton.getAbsolutePointByName('shoulders'),
			endPoint: skeleton.getAbsolutePointByName('head'),
			startRadius: 50,
			endRadius: 30
		}),
		new BodyPart({
			name: 'uppLegLeftFront',
			startPoint: skeleton.getAbsolutePointByName('shoulders'),
			endPoint: skeleton.getAbsolutePointByName('knee_FR'),
			startRadius: 30,
			endRadius: 20
		}),
		new BodyPart({
			name: 'lowerLegLeftFront',
			startPoint: skeleton.getAbsolutePointByName('knee_FR'),
			endPoint: skeleton.getAbsolutePointByName('ankle_FR'),
			startRadius: 20,
			endRadius: 10
		}),
		new BodyPart({
			name: 'footLegLeftFront',
			startPoint: skeleton.getAbsolutePointByName('ankle_FR'),
			endPoint: skeleton.getAbsolutePointByName('foot_FR'),
			startRadius: 10,
			endRadius: 10
		})
	]
};
console.log(initialState);

export const sheep = writable<SheepState>(initialState);
