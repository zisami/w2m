import { writable } from 'svelte/store';
import paper from 'paper';

export interface SheepState {
	scaleingFactor: number | null;
	svg: SVGElement | null;
	colors?: THREE.Color[] | null;
	skeleton?: Skeleton;
}

export type valueRange = {
	min: number;
	init: number;
	max: number;
};

export interface Limb {
	[key: string]: string | paper.Point | LimbParam | Limb | Limb[] | undefined | null;
	name: string;
	length: LimbParam;
	angle: LimbParam;
	limbs: Limb[];
}
export interface Pose {
	[key: string]: string | valueRange | Pose[] | undefined | null;
	name: string;
	length: valueRange;
	angle: valueRange;
	limbs: Pose[];
}
export interface Skeleton {
	name: string;
	length: LimbParam;
	angle: LimbParam;
	limbs: Limb[];
	getLimbByName(name: string, limbsToSearch?: Limb[]): Limb | null;
	getParentByLimbName(name: string, limbsToSearch?: Limb[]): Limb | null;
}
//implement SkeletonParams class
export class LimbParam {
	min: number;
	init: number;
	max: number;
	last: number;

	constructor(params: valueRange) {
		//always use the lower value as min and the greater one as max
		this.min = params.min <= params.max ? params.min : params.max;
		this.max = params.max >= params.min ? params.max : params.min;
		//inital value has to be always within range
		if (params.init >= this.min && params.init <= this.max) {
			this.init = params.init;
		} else if (params.init < this.min) {
			this.init = this.min;
		} else {
			this.init = this.max;
		}
		this.last = this.init;
	}

	/*get last(): number {
		return this.last;
	}
	set last(value: number) {
		if (value >= this.min && value <= this.max) {
			this.last = value;
		}
	}*/
	isValid(value: number): boolean {
		return value >= this.min && value <= this.max;
	}
}
export class Skeleton implements Skeleton {
	constructor(pose: Pose) {
		this.name = pose.name;
		this.length = new LimbParam(pose.length);
		this.angle = new LimbParam(pose.angle);
		if (pose.limbs) {
			this.limbs = this.initLimbs(pose.limbs);
		}
	}
	initLimbs(poses: Pose[]): Limb[] {
		if (!poses) return [];
		return poses?.map((pose: Pose): Limb => {
			const limb: Limb = {
				name: pose.name,
				length: new LimbParam(pose.length),
				angle: new LimbParam(pose.angle),
				limbs: []
			};
			if (pose?.limbs?.length) {
				limb.limbs = this.initLimbs(pose.limbs);
			}
			return limb;
		});
	}
	getLimbByName(name: string, limbsToSearch?: Limb[]): Limb | null {
		if (!limbsToSearch) limbsToSearch = this.limbs;
		for (const nextLimb of limbsToSearch) {
			if (nextLimb.name === name) return nextLimb;
			if (nextLimb?.limbs?.length) {
				const result = this.getLimbByName(name, nextLimb.limbs);
				if (result) return result;
			}
		}
		return null;
	}
	getLimbChainByName(name: string, limbsToSearch?: Limb[]): Limb[] | null {
		if (!limbsToSearch) limbsToSearch = this.limbs;
		const limbChain: Limb[] = [];
		for (const nextLimb of limbsToSearch) {
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
	//get the (Parent) Point a Limb rotates arround by the Name of the Limb
	getRotationPointByName(name: string, limbsToSearch?: Limb[]): paper.Point {
		if (!limbsToSearch) limbsToSearch = this.limbs;
		//get all limbs from start to searched name
		const limbChain = this.getLimbChainByName(name, limbsToSearch);
		//start from body position
		let rotaionPoint = new paper.Point({ length: this.length.last, angle: this.angle.last });
		//add up all limbs till searched name is reached
		if (limbChain?.length) {
			rotaionPoint = limbChain.reduce((rotaionPoint: paper.Point, nextLimb: Limb): paper.Point => {
				if (nextLimb.name !== name) {
					return rotaionPoint.add(
						new paper.Point({ length: nextLimb.length.last, angle: nextLimb.angle.last })
					);
				}
				return rotaionPoint;
			}, rotaionPoint);
		}
		return rotaionPoint;
	}
}
const pose: Pose = {
	name: 'body',
	length: {
		min: 0,
		init: 200,
		max: 200
	},
	angle: {
		min: 0,
		init: 45,
		max: 45
	},
	limbs: [
		{
			name: 'hips',
			length: {
				min: 0,
				init: 0,
				max: 0
			},
			angle: {
				min: 0,
				init: 0,
				max: 0
			},
			limbs: [
				{
					name: 'shoulders',
					length: {
						min: 50,
						init: 150,
						max: 250
					},
					angle: {
						min: -180,
						init: 0,
						max: 0
					},
					limbs: [
						{
							name: 'head',
							length: {
								init: 75,
								min: 25,
								max: 100
							},
							angle: {
								init: -45,
								min: -90,
								max: 75
							},
							limbs: []
						},
						{
							name: 'knee_FR',
							length: {
								min: 50,
								init: 75,
								max: 100
							},
							angle: {
								min: -15,
								init: 45,
								max: 135
							},
							limbs: [
								{
									name: 'ankle_FR',
									length: {
										min: 20,
										init: 40,
										max: 60
									},
									angle: {
										min: 90,
										init: 135,
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
								init: 75,
								max: 100
							},
							angle: {
								min: -15,
								init: 85,
								max: 135
							},
							limbs: [
								{
									name: 'ankle_FL',
									length: {
										min: 20,
										init: 40,
										max: 60
									},
									angle: {
										min: 90,
										init: 135,
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
						init: 75,
						max: 100
					},
					angle: {
						min: -15,
						init: 155,
						max: 155
					},
					limbs: [
						{
							name: 'ankle_RR',
							length: {
								min: 20,
								init: 40,
								max: 60
							},
							angle: {
								min: -90,
								init: 0,
								max: 80
							},
							limbs: []
						}
					]
				},
				{
					name: 'knee_RL',
					length: {
						min: 50,
						init: 75,
						max: 100
					},
					angle: {
						min: -15,
						init: 45,
						max: 135
					},
					limbs: [
						{
							name: 'ankle_RL',
							length: {
								min: 20,
								init: 40,
								max: 60
							},
							angle: {
								min: -90,
								init: 0,
								max: 80
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
