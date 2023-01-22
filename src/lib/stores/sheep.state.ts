import { writable } from 'svelte/store';

import Skeleton from '$lib/animal/skeleton';
import { pose } from '$lib/animal/pose';

export interface SheepState {
	scaleingFactor: number | null;
	svg: SVGElement | null;
	colors?: THREE.Color[] | null;
	skeleton?: Skeleton;
}

const initialState: SheepState = {
	scaleingFactor: null,
	svg: null,
	skeleton: new Skeleton(pose)
};
export const sheep = writable<SheepState>(initialState);
