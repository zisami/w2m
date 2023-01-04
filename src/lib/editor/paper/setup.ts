import paper from 'paper';
import head from '$lib/sheep/head.svg';
import type { SkeletonConfig, Skeleton, SkeletonJoint } from '$lib/stores/sheep';
import { onFrame } from './editor';
import { vectorHelper, getLayerByName } from './helpers';

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
export function updateSheep(skeleton: Skeleton, paperState) {
	renderSkeleton(skeleton);
	renderSkeletonVectors(skeleton, paperState);
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
export function renderSkeleton(skeleton: Skeleton): void {
	getLayerByName('skeleton')?.remove();
	const skeletonLayer = new paper.Layer();
	skeletonLayer.name = 'skeleton';
	for (const key in skeleton) {
		const joint: SkeletonJoint = skeleton[key];
		const dot = new paper.Path.Circle(joint.point, 10);
		//const dot = new paper.Path.RegularPolygon(joint.point, 3, 20);
		dot.name = key;
		dot.rotation = joint.point.angle;
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
