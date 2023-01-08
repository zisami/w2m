import paper from 'paper';
import head from '$lib/sheep/head.svg';
import type { Limb, Skeleton } from '$lib/stores/sheep';
import type { paperState } from '$lib/editor/paper/paper.store';
import { onFrame } from './editor';
import { vectorHelper, getLayerByName } from './helpers';

export function setupSheep(skeleton: Limb, paperState: paperState): Limb {
	//importSkelletonDots();
	getLayerByName('skeleton')?.remove();
	const skeletonLayer = new paper.Layer();
	skeletonLayer.name = 'skeleton';
	renderLimb(skeleton);
	renderSkeletonVectors(skeleton, paperState);
	addBody();
	importHead();
	onFrame();
	return skeleton;
}
export function updateSheep(skeleton: Limb, paperState?: paperState): void {
	//importSkelletonDots();
	getLayerByName('skeleton')?.remove();
	const skeletonLayer = new paper.Layer();
	skeletonLayer.name = 'skeleton';
	renderLimb(skeleton);
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

export function renderLimb(
	limb: Skeleton | Limb,
	rotationPoint: paper.Point = new paper.Point(0, 0)
): void {
	const jointPoint = rotationPoint.add(
		new paper.Point({ length: limb.length.last, angle: limb.angle.last })
	);
	if (jointPoint) {
		addJointMarker(jointPoint);
		if (limb?.limbs?.length) {
			limb.limbs.forEach((limb) => {
				renderLimb(limb, jointPoint);
			});
		}
	}

	function addJointMarker(jointPoint: paper.Point): void {
		const jointMarker = new paper.Path.Circle(jointPoint, 5);
		jointMarker.name = limb.name;
		jointMarker.fillColor = new paper.Color('#AAA');
		jointMarker.strokeColor = new paper.Color('#555');
		jointMarker.strokeWidth = 2;
		jointMarker.visible = true;
	}
}
export function renderSkeletonVectors(skeleton: Limb, paperState?: paperState): void {
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
	limb: Skeleton | Limb,
	rotationPoint: paper.Point = new paper.Point(0, 0)
): void {
	//console.log(limb.name);

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
