import paper from 'paper';
import head from '$lib/sheep/head.svg';
import type { SkeletonConfig, Skeleton, SkeletonJoint } from '$lib/stores/sheep';
import { onFrame } from './editor';
import { vectorHelper, getLayerByName } from './helpers';
import { Skeleton } from 'three';

export function setupSheep(skeletonConfig: SkeletonConfig, paperState): Skeleton {
	//importSkelletonDots();
	const skeleton = buildSkeleton(skeletonConfig);
	renderSkeleton(skeleton);
	renderSkeletonVectors(skeleton, paperState);
	addBody();
	//importHead();
	onFrame();
	return skeleton;
}
export function updateSheep(skeleton: Skeleton, movedJoint, paperState) {
	const skeletonAdjusted = adjustSkeleton(skeleton, movedJoint);
	renderSkeleton(skeletonAdjusted);
	renderSkeletonVectors(skeletonAdjusted, paperState);
	return skeletonAdjusted;
}

function importHead() {
	const layer = new paper.Layer();
	layer.name = 'head';
	layer.importSVG(head);
}

function addBody() {
	const layer = new paper.Layer();
	layer.name = 'body';
}

function buildSkeleton(skeletonConfig: SkeletonConfig): Skeleton {
	const hips_Vector = skeletonConfig.startPoint.add(new paper.Point(0, 0));
	const shoulder_Vector = hips_Vector.add(
		new paper.Point({
			length: skeletonConfig.body.length.init,
			angle: skeletonConfig.body.angle.init
		})
	);
	const head_Vector = shoulder_Vector.add(
		new paper.Point({
			length: skeletonConfig.neck.length.init,
			angle: skeletonConfig.neck.angle.init
		})
	);
	const skeleton: Skeleton = {
		hips: {
			rotatesAround: null,
			point: hips_Vector,
			length: skeletonConfig.body.length,
			angle: skeletonConfig.body.angle
		},
		shoulders: {
			rotatesAround: 'hips',
			point: shoulder_Vector,
			length: skeletonConfig.body.length,
			angle: skeletonConfig.body.angle
		},
		head: {
			rotatesAround: 'shoulders',
			point: head_Vector,
			length: skeletonConfig.neck.length,
			angle: skeletonConfig.neck.angle
		}
	};
	return skeleton;
}

function adjustSkeletonOld(skeletonOld: Skeleton): Skeleton {
	const hips_Vector = skeletonOld.hips.point.add(new paper.Point(0, 0));
	const shoulder_Vector = hips_Vector.add(
		new paper.Point({
			length: hips_Vector.getDistance(
				skeletonOld?.shoulders?.pointNew || skeletonOld?.shoulders?.point
			),
			angle: skeletonOld?.shoulders?.point?.subtract(hips_Vector)?.angle
		})
	);
	const headPoint = skeletonOld.head.pointNew || skeletonOld.head.point;
	const head_Vector = shoulder_Vector.add(
		new paper.Point({
			length: shoulder_Vector.getDistance(headPoint),
			angle: headPoint.subtract(skeletonOld.shoulders.point)?.angle
		})
	);
	console.log(head_Vector);
	const skeleton: Skeleton = { ...skeletonOld };
	skeleton.hips.point = hips_Vector;
	skeleton.shoulders.point = shoulder_Vector;
	skeleton.head.point = head_Vector;

	for (const jointKey in skeleton) {
		if (Object.prototype.hasOwnProperty.call(skeleton, jointKey)) {
			const element = skeleton[jointKey];
			if (element.pointNew) {
				element.point = element.pointNew;
				delete element.pointNew;
			}
		}
	}
	console.log(skeleton);

	return skeleton;
}

function adjustSkeleton(skeletonOld: Skeleton, movedJoint): Skeleton {
	const skeleton: Skeleton = JSON.parse(JSON.stringify(skeletonOld));
	for (const jointName in skeletonOld) {
		if (Object.prototype.hasOwnProperty.call(skeletonOld, jointName)) {
			const joint = skeletonOld[jointName];
			if (jointName in movedJoint) {
				//current joint is the one that moved, so it gets the moved Point as new Point
				skeleton[jointName].point = movedJoint[jointName];
			} else if (joint?.rotatesAround && joint.rotatesAround in movedJoint) {
				//current joint rotates around the moved joint.
				//calcutating the new point from the moved point with the old length and angle

				//get distance from old rotaion point to old joint point
				const distance = skeletonOld[joint.rotatesAround].point.getDistance(
					skeletonOld[jointName].point
				);
				//get angle from old rotaion point to old joint point
				const angle = skeletonOld[jointName].point.subtract(
					skeletonOld[joint.rotatesAround].point
				).angle;
				if (distance && angle) {
					//add new point to moved point with old angle and distance
					skeleton[jointName].point = skeleton[joint.rotatesAround].point.add(
						new paper.Point({
							length: distance,
							angle: angle
						})
					);
				}
			} else {
				skeleton[jointName] = joint;
			}
		}
	}

	console.log(skeleton, skeleton);

	return skeleton;
}

export function renderSkeleton(skeleton: Skeleton): void {
	getLayerByName('skeleton')?.remove();
	const skeletonLayer = new paper.Layer();
	skeletonLayer.name = 'skeleton';
	for (const key in skeleton) {
		const joint: SkeletonJoint = skeleton[key];
		const dot = new paper.Path.Circle(joint.point, 10);
		//const dot = new paper.Path.RegularPolygon(joint.point, 3, 20);
		dot.name = key;
		dot.fillColor = new paper.Color('green');

		let rotationPoint = new paper.Point(0, 0);
		if (joint.rotatesAround) {
			rotationPoint = skeleton[joint.rotatesAround].point;
		}
	}
}

export function renderSkeletonVectors(skeleton: Skeleton, paperState): void {
	getLayerByName('skeletonVectors')?.remove();

	if (paperState?.renderSkeletonVectors) {
		const skeletonLayer = new paper.Layer();
		skeletonLayer.name = 'skeletonVectors';
		for (const key in skeleton) {
			const joint: SkeletonJoint = skeleton[key];
			let rotationPoint = new paper.Point(0, 0);
			if (joint.rotatesAround) {
				rotationPoint = skeleton[joint.rotatesAround].point;
			}
			vectorHelper(rotationPoint, joint.point);
		}
	}
}
