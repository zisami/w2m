import { writable } from 'svelte/store';

import Skeleton from '$lib/animal/skeleton';
import Animal from '$lib/animal/animal';

import { pose } from '$lib/sheep/pose';
import { BodyPartParams } from '$lib/sheep/bodypartsParams';

export interface AnimalState {
	skeleton?: Skeleton;
	animal: Animal;
}
const sheep = new Animal(pose, BodyPartParams());

const skeleton = new Skeleton(pose);
const initialState: AnimalState = {
	skeleton: skeleton,
	animal: sheep
};
console.log(initialState);

export const animalState = writable<AnimalState>(initialState);
