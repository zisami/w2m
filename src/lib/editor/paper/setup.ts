import paper from 'paper';
import head from '$lib/sheep/head.svg';
import type { SkeletonConfig, Skeleton, SkeletonJoint } from '$lib/stores/sheep';
import { onFrame } from './editor';
import { vectorHelper } from './helpers';

export function setupSheep(skeletonConfig: SkeletonConfig): Skeleton {
	//importSkelletonDots();
	const skeleton = buildSkeleton(skeletonConfig);
	renderSkeleton(skeleton);
	addBody();
	//importHead();
	onFrame();
	return skeleton;
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
		}
	};
	return skeleton;
}
function renderSkeleton(skeleton: Skeleton): void {
	console.log(skeleton);

	const skeletonLayer = new paper.Layer();
	skeletonLayer.name = 'skeleton';
	for (const key in skeleton) {
		const joint: SkeletonJoint = skeleton[key];
		console.log(`${key}: ${joint.rotatesAround} `);
		//const dot = new paper.Path.Circle(joint.point, 20);
		//const dot = new paper.Path.RegularPolygon(joint.point, 3, 20);
		//dot.name = key;
		//dot.rotation = joint.point.angle;

		let rotationPoint = new paper.Point(0, 0);
		if (joint.rotatesAround) {
			rotationPoint = skeleton[joint.rotatesAround].point;
		}
		vectorHelper(rotationPoint, joint.point);
	}
	skeletonLayer.fillColor = new paper.Color(100, 0, 0);
}
