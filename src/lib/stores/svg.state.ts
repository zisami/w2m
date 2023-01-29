import { writable } from 'svelte/store';

export interface SvgState {
	scaleingFactor: number | null;
	svg: SVGElement | null;
	colors?: THREE.Color[] | null;
}

const initialState: SvgState = {
	scaleingFactor: null,
	svg: null
};

export const svg = writable<SvgState>(initialState);
