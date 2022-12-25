import paper from 'paper';
import head from '$lib/sheep/head.svg';
import skeleton from '$lib/sheep/skeletonDots.svg';
import { onFrame } from './editor';

export async function setupSheep(): Promise<void> {
	importSkelletonDots();
	addBody();
	importHead();
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
