import paper from 'paper';
import head from '$lib/sheep/head.svg';
import skeleton from '$lib/sheep/skeletonDots.svg';
import type { SkeletonConfig } from '$lib/stores/sheep';
import { onFrame } from './editor';

export async function setupSheep(skeletonConfig: SkeletonConfig): Promise<void> {
	//importSkelletonDots();
	buildSkeleton(skeletonConfig);
	addBody();
	//importHead();
	onFrame();
	console.log(paper.project.layers);
}

function importHead() {
	const layer = new paper.Layer();
	layer.name = 'head';
	layer.importSVG(head);
}

function importSkelletonDots() {
	const layer = new paper.Layer();
	layer.name = 'skeletonDots';
	layer.importSVG(skeleton, (item: paper.Item) => {
		console.log(item);
		console.log(item.children.find((c) => c.name === 'skeletonDotsLayer'));

		const skeletonDotsLayer = item.children.find((c) => c.name === 'skeletonDotsLayer');
		if (skeletonDotsLayer) {
			layer.children = [skeletonDotsLayer];
		}
	});
}

function addBody() {
	const layer = new paper.Layer();
	layer.name = 'body';
}
function buildSkeleton(skeletonConfig: SkeletonConfig) {
	const layer = new paper.Layer();
	layer.name = 'skeleton';
	const hips_Vector = skeletonConfig.startPoint.add(new paper.Point(0, 0));
	const shoulder_Vector = hips_Vector.add(
		new paper.Point({
			length: skeletonConfig.body.length.init,
			angle: skeletonConfig.body.angle.init
		})
	);
	console.log('skeleton Lyaer', layer);
}
