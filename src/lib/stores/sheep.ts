import { writable } from 'svelte/store';
import paper from 'paper';

export interface SheepState {
	scaleingFactor: number | null;
	svg: SVGElement | null;
	colors?: THREE.Color[] | null;
	skeleton?: Skeleton;
}

export type SkeletonParams = {
	min: number;
	last?: number;
	max: number;
};
export interface Limb {
	[key: string]: string | paper.Point | SkeletonParams | Limb | Limb[] | undefined | null;
	point?: paper.Point;
	name: string;
	length: SkeletonParams;
	angle: SkeletonParams;
	limbs: Limb[];
}
export interface Skeleton {
	name: string;
	length: SkeletonParams;
	angle: SkeletonParams;
	limbs: Limb[];
	getLimbByName(name: string, limbsToSearch?: Limb[]): Limb | null;
	getParentByLimbName(name: string, limbsToSearch?: Limb[]): Limb | null;
}
export class Skeleton implements Skeleton {
	constructor(pose: Limb) {
		this.limbs = pose.limbs;
		this.name = pose.name;
		this.length = pose.length;
		this.angle = pose.angle;
	}
	getLimbByName(name: string, limbsToSearch?: Limb[]): Limb | null {
		if (!limbsToSearch) limbsToSearch = this.limbs;
		console.log();
		console.log('name', name);

		for (const nextLimb of limbsToSearch) {
			console.log('limb', nextLimb.name, name);

			if (nextLimb.name === name) {
				return nextLimb;
			}
			if (nextLimb?.limbs?.length) {
				const result = this.getLimbByName(name, nextLimb.limbs);
				if (result) {
					return result;
				}
			}
		}
		return null;
	}
	getLimbChainByName(name: string, limbsToSearch?: Limb[]): Limb[] | null {
		if (!limbsToSearch) limbsToSearch = this.limbs;
		console.log();
		console.log('name', name);
		const limbChain: Limb[] = [];
		for (const nextLimb of limbsToSearch) {
			console.log('limb', nextLimb.name, name);

			if (nextLimb.name === name) {
				return [nextLimb];
			}
			if (nextLimb?.limbs?.length) {
				const result = this.getLimbChainByName(name, nextLimb.limbs);
				if (result?.length) {
					result.unshift(nextLimb);
					return result;
				}
			}
		}
		return limbChain;
	}
}
const pose: Limb = {
	name: 'body',
	length: {
		min: 0,
		last: 200,
		max: 0
	},
	angle: {
		min: 0,
		last: 45,
		max: 0
	},
	limbs: [
		{
			name: 'hips',
			length: {
				min: 0,
				last: 0,
				max: 0
			},
			angle: {
				min: 0,
				last: 0,
				max: 0
			},
			limbs: [
				{
					name: 'shoulders',
					length: {
						last: 150,
						min: 50,
						max: 250
					},
					angle: {
						last: 0,
						min: 0,
						max: -180
					},
					limbs: [
						{
							name: 'head',
							length: {
								min: 25,
								last: 75,
								max: 100
							},
							angle: {
								min: 75,
								last: -45,
								max: -90
							},
							limbs: []
						},
						{
							name: 'knee_FR',
							length: {
								min: 50,
								last: 75,
								max: 100
							},
							angle: {
								min: -15,
								last: 45,
								max: 135
							},
							limbs: [
								{
									name: 'ankle_FR',
									length: {
										min: 20,
										last: 40,
										max: 60
									},
									angle: {
										min: 90,
										last: 135,
										max: 180
									},
									limbs: []
								}
							]
						},
						{
							name: 'knee_FL',
							length: {
								min: 50,
								last: 75,
								max: 100
							},
							angle: {
								min: -15,
								last: 85,
								max: 135
							},
							limbs: [
								{
									name: 'ankle_FL',
									length: {
										min: 5,
										last: 15,
										max: 15
									},
									angle: {
										min: 90,
										last: 145,
										max: 180
									},
									limbs: []
								}
							]
						}
					]
				},
				{
					name: 'knee_RR',
					length: {
						min: 50,
						last: 75,
						max: 100
					},
					angle: {
						min: -15,
						last: 35,
						max: 135
					},
					limbs: [
						{
							name: 'ankle_RR',
							length: {
								min: 5,
								last: 15,
								max: 15
							},
							angle: {
								min: 0,
								last: 45,
								max: 135
							},
							limbs: []
						}
					]
				},
				{
					name: 'knee_RL',
					length: {
						min: 50,
						last: 75,
						max: 100
					},
					angle: {
						min: -15,
						last: 45,
						max: 135
					},
					limbs: [
						{
							name: 'ankle_RL',
							length: {
								min: 5,
								last: 15,
								max: 15
							},
							angle: {
								min: 0,
								last: 45,
								max: 135
							},
							limbs: []
						}
					]
				}
			]
		}
	]
};

const initialState: SheepState = {
	scaleingFactor: null,
	svg: null,
	skeleton: new Skeleton(pose)
};
export const sheep = writable<SheepState>(initialState);
