import { writable } from 'svelte/store';
import type { vectorHelperValues } from './helpers';
export type paperState = {
	renderSkeletonVectors: boolean;
	skeletonRenderOptions?: vectorHelperValues;
	renderEventVector: boolean;
	eventVector: eventVector;
};
type eventVector = {
	limbChain: string;
	itemName: string;
	jointName: string;
	distance: number;
	angle: number;
	angleCombined?: number;
	angleTotal?: number;
	isValidAngle: boolean;
	isValidDistance: boolean;
};

const initaleventVector: eventVector = {
	itemName: '',
	jointName: '',
	distance: 0,
	angle: 0,
	isValidAngle: false,
	isValidDistance: false,
	limbChain: ''
};

const initalPaperStore = {
	eventVector: initaleventVector,
	renderSkeletonVectors: false,
	renderEventVector: false,
	skeletonRenderOptions: {}
};

export const paperState = writable(initalPaperStore);
