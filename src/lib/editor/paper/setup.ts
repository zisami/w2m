import paper from 'paper';
import head from '$lib/sheep/head.svg';
import type { Limb } from '$lib/stores/sheep';
import { onFrame } from './editor';
import { vectorHelper, getLayerByName } from './helpers';

export function setupSheep(skeleton: Limb, paperState): Skeleton {
	//importSkelletonDots();
	getLayerByName('skeleton')?.remove();
	const skeletonLayer = new paper.Layer();
	skeletonLayer.name = 'skeleton';
	renderSkeleton(skeleton);
	renderSkeletonVectors(skeleton, paperState);
	addBody();
	//importHead();
	onFrame();
	return skeleton;
}
export function updateSheep(skeleton: Limb, paperState): void {
	//importSkelletonDots();
	getLayerByName('skeleton')?.remove();
	const skeletonLayer = new paper.Layer();
	skeletonLayer.name = 'skeleton';
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

export function renderSkeleton(
	limb: Limb,
	rotationPoint: paper.Point = new paper.Point(0, 0)
): void {
	//console.log('limb', limb);
	//console.log('rotationPoint', rotationPoint);

	const jointPoint = rotationPoint.add(
		new paper.Point({ length: limb.length.last, angle: limb.angle.last })
	);
	//console.log('jointPoint', jointPoint.length, jointPoint.angle);
	if (jointPoint) {
		const jointMarker = new paper.Path.Circle(jointPoint, 5);
		jointMarker.name = limb.name;
		jointMarker.fillColor = new paper.Color('#AAA');
		jointMarker.strokeColor = new paper.Color('#555');
		jointMarker.strokeWidth = 2;
		jointMarker.visible = true;

		if (limb?.limbs?.length) {
			limb.limbs.forEach((limb) => {
				renderSkeleton(limb, jointPoint);
			});
		}
	}
}
export function renderSkeletonVectors(skeleton: Limb, paperState): void {
	//reset Layer
	getLayerByName('skeletonVectors')?.remove();
	const skeletonLayer = new paper.Layer();
	skeletonLayer.name = 'skeletonVectors';
	if (paperState?.renderSkeletonVectors) {
		//render vector helper for every bodypart
		renderLimbVectors(skeleton);
	}
}
export function renderLimbVectors(
	limb: Limb,
	rotationPoint: paper.Point = new paper.Point(0, 0)
): void {
	console.log(limb.name);

	const jointPoint = rotationPoint.add(
		new paper.Point({ length: limb.length.last, angle: limb.angle.last })
	);
	vectorHelper(rotationPoint, jointPoint);

	if (limb?.limbs?.length) {
		limb.limbs.forEach((limb) => {
			renderLimbVectors(limb, jointPoint);
		});
	}
}
