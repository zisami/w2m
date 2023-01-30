import paper from 'paper';
import head from '$lib/sheep/head.svg';
import type Skeleton from '$lib/animal/skeleton';
import type { paperState } from '$lib/editor/paper/paper.store';
import { onFrame } from './editor';
import { vectorHelper, getLayerByName } from './helpers';
import type { AnimalState } from '$lib/stores/animal.state';
import type Animal from '$lib/animal/animal';

export function setupAnimal(skeleton: Skeleton, paperState: paperState): Skeleton {
	//importSkelletonDots();
	getLayerByName('skeleton')?.remove();
	const skeletonLayer = new paper.Layer();
	skeletonLayer.name = 'skeleton';
	renderLimb(skeleton, skeleton);
	renderSkeletonVectors(skeleton, paperState);
	addBody();
	//importHead();
	onFrame();
	return skeleton;
}
export function updateAnimalOld(skeleton: Skeleton, paperState?: paperState): void {
	//importSkelletonDots();
	getLayerByName('skeleton')?.remove();
	const skeletonLayer = new paper.Layer();
	skeletonLayer.name = 'skeleton';
	renderLimb(skeleton, skeleton);
	renderSkeletonVectors(skeleton, paperState);
}
export function updateAnimal(animalState: AnimalState, paperState?: paperState): void {
	if (!animalState?.animal?.skeleton) return;
	drawSkeleton(animalState.animal, paperState);
	//console.log('updateAnimalV2');
	drawBodyparts(animalState.animal);
	drawOutline(animalState.animal);
	drawSkeleton(animalState.animal, paperState);
}
function drawSkeleton(animal: Animal, paperState: paperState | undefined) {
	if (!animal?.skeleton) return;
	getLayerByName('skeleton')?.remove();
	const skeletonLayer = new paper.Layer();
	skeletonLayer.name = 'skeleton';
	renderLimb(animal.skeleton, animal.skeleton);
	renderSkeletonVectors(animal.skeleton, paperState);
}

function drawBodyparts(animal: Animal) {
	//console.log(paper.project.layers.map((layer) => layer.name));

	getLayerByName('bodyparts')?.remove();
	const bodypartsLayer = new paper.Layer();
	bodypartsLayer.name = 'bodyparts';

	animal.updateBodyParts();

	const drawParams = {
		fillColor: 'darkgreen',
		strokeColor: 'blue',
		opacity: 0.1
	};
	animal?.bodyParts?.forEach((part) => part?.draw(drawParams));
}
function drawOutline(animal: Animal) {
	//console.log(paper.project.layers.map((layer) => layer.name));
	getLayerByName('helperLayer')?.remove();
	const helperLayer = new paper.Layer();
	helperLayer.name = 'helperLayer';

	animal.updateBodyParts();

	const drawParams = {
		//fillColor: 'darkblue',
		opacity: 0.1
	};
	animal?.bodyParts?.forEach((part) => part?.draw(drawParams));
	let outline = new paper.Path();
	helperLayer.children.forEach((child) => {
		if (child instanceof paper.Path) {
			outline = outline.unite(child);
		}
	});
	//outline.smooth();
	//outline.fillColor = new paper.Color('pink');
	outline.strokeColor = new paper.Color('pink');
	outline.strokeWidth = 4;
	outline.opacity = 0.5;

	getLayerByName('outlineLayer')?.remove();
	const outlineLayer = new paper.Layer();
	outlineLayer.name = 'outlineLayer';
	outlineLayer.addChild(outline);

	getLayerByName('helperLayer')?.remove();
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
	skeleton: Skeleton,
	limb: Skeleton,
	rotationPoint = new paper.Point(0, 0)
): void {
	if (!limb) return;
	const combinedAngle = skeleton.getCombinedAngleByName(limb.name);
	//console.log(limb.name, combinedAngle);
	const limbPoint = new paper.Point({
		length: limb.length.last,
		angle: limb.angle.last
	});
	if (limb.name !== 'body') {
		limbPoint.angle += combinedAngle;
	}
	const jointPoint = rotationPoint.add(limbPoint);
	if (jointPoint) {
		addJointMarker(jointPoint);
		if (limb?.limbs?.length) {
			limb.limbs.forEach((limb) => {
				renderLimb(skeleton, limb, jointPoint);
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
		jointMarker.opacity = 0.25;
	}
}
export function renderSkeletonVectors(skeleton: Skeleton, paperState?: paperState): void {
	//remove Layer
	getLayerByName('skeletonVectors')?.remove();
	if (paperState?.renderSkeletonVectors) {
		const skeletonLayer = new paper.Layer();
		skeletonLayer.name = 'skeletonVectors';
		//render vector helper for every bodypart
		renderLimbVectors(skeleton, skeleton);
	}
}
export function renderLimbVectors(
	skeleton: Skeleton,
	limb: Skeleton,
	rotationPoint = new paper.Point(0, 0)
): void {
	if (!limb) return;
	const combinedAngle = skeleton.getCombinedAngleByName(limb.name);
	const limbPoint = new paper.Point({
		length: limb.length.last,
		angle: limb.angle.last
	});
	if (limb.name !== 'body') {
		limbPoint.angle += combinedAngle;
	}
	const jointPoint = rotationPoint.add(limbPoint);
	vectorHelper(rotationPoint, jointPoint);

	if (limb?.limbs?.length) {
		limb.limbs.forEach((limb) => {
			renderLimbVectors(skeleton, limb, jointPoint);
		});
	}
}
