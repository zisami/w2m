//import all needed classes
import { LimbParam } from './limb';
import type { iPose } from './animal.d';
import paper from 'paper';
import type { paperState } from '$lib/editor/paper/paper.store';

export default class Skeleton {
	name: string;
	length: LimbParam;
	angle: LimbParam;
	limbs: Skeleton[] = [];
	constructor(pose: iPose) {
		this.name = pose.name;
		this.length = new LimbParam(pose.length);
		this.angle = new LimbParam(pose.angle);
		if (pose.limbs) {
			this.limbs = this.initLimbs(pose.limbs);
		}
	}
	initLimbs(poses: iPose[]): Skeleton[] {
		if (!poses) return [];
		return poses?.map((pose: iPose): Skeleton => {
			const limb: Skeleton = new Skeleton({
				name: pose.name,
				length: new LimbParam(pose.length),
				angle: new LimbParam(pose.angle),
				limbs: []
			});
			if (pose?.limbs?.length) {
				limb.limbs = this.initLimbs(pose.limbs);
			}
			return limb;
		});
	}
	getLimbByName(name: string, limbsToSearch?: Skeleton[]): Skeleton | null {
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
	getLimbChainByName(name: string, limbsToSearch?: Skeleton[]): Skeleton[] | null {
		if (!limbsToSearch) limbsToSearch = this.limbs;
		const limbChain: Skeleton[] = [];
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
	getRotationPointByName(name: string, limbsToSearch?: Skeleton[]): paper.Point {
		if (!limbsToSearch) limbsToSearch = this.limbs;
		//get all limbs from start to searched name
		const limbChain = this.getLimbChainByName(name, limbsToSearch);
		//start from body position
		let rotaionPoint = new paper.Point({ length: this.length.last, angle: this.angle.last });
		//add up all limbs till searched name is reached
		if (limbChain?.length) {
			rotaionPoint = limbChain.reduce((lastPoint: paper.Point, nextLimb: Skeleton): paper.Point => {
				if (nextLimb.name !== name) {
					const combinedAngle = this.getCombinedAngleByName(nextLimb.name);
					return lastPoint.add(
						new paper.Point({
							length: nextLimb.length.last,
							angle: nextLimb.angle.last + combinedAngle
						})
					);
				}
				return lastPoint;
			}, rotaionPoint);
		}
		return rotaionPoint;
	}
	//get the combined angle of all limbs from start to searched name
	getCombinedAngleByName(name: string, limbsToSearch?: Skeleton[]): number {
		if (!limbsToSearch) limbsToSearch = this.limbs;
		//get all limbs from start to searched name
		const limbChain = this.getLimbChainByName(name, limbsToSearch);
		//start from body angle
		let rotationAngle = this.angle.last;
		//add up all limbs till searched name is reached
		if (limbChain?.length) {
			rotationAngle = limbChain
				.map((limb: Skeleton): number => limb.angle.last)
				.reduce((lastAngle: number, nextAngle: number, index: number, array: number[]): number => {
					if (index < array.length - 1) {
						return lastAngle + nextAngle;
					}
					return lastAngle;
				}, 0);
		}
		return rotationAngle;
	}
	getAbsolutePointByName(name: string, limbsToSearch?: Skeleton[]): paper.Point {
		const limbChain = this.getLimbChainByName(name, limbsToSearch);
		const limb = limbChain?.[limbChain.length - 1];
		let startPoint = new paper.Point(0, 0);

		startPoint = startPoint.add(
			new paper.Point({
				length: this?.length?.last,
				angle: this?.angle?.last || 0
			})
		);

		if (!limbChain?.length) return startPoint;

		const point = limbChain.reduce(
			(lastPoint: paper.Point, nextLimb: Skeleton, index: number, array): paper.Point => {
				const combinedAngle = this.getCombinedAngleByName(array?.[index]?.name) || 0;
				return lastPoint.add({
					length: nextLimb.length.last,
					angle: combinedAngle + nextLimb.angle.last
				});
			},
			startPoint
		);
		return point;
	}
}
