import { writable } from 'svelte/store';
export type paperState = {
	renderSkeletonVectors: boolean;
	renderEventVector: boolean;
	eventVector: eventVector;
};
type eventVector = {
	itemName: string;
	jointName: string;
	distance: number;
	angle: number;
	isValidAngle: boolean;
	isValidDistance: boolean;
};

const initaleventVector: eventVector = {
	itemName: '',
	jointName: '',
	distance: 0,
	angle: 0,
	isValidAngle: false,
	isValidDistance: false
};

const initalPaperStore = {
	eventVector: initaleventVector,
	renderSkeletonVectors: false,
	renderEventVector: false
};

export const paperState = writable(initalPaperStore);
