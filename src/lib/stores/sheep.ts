import { writable } from 'svelte/store';

export interface SheepState {
	scaleingFactor: number | null;
	svg: SVGElement | null;
	colors?: THREE.Color[] | null;
}
const initialState: SheepState = {
	scaleingFactor: null,
	svg: null
};
export const sheep = writable<SheepState>(initialState);
