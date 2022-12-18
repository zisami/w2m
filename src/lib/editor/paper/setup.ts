import paper from 'paper';
import head from '$lib/sheep/head.svg';
import skeleton from '$lib/sheep/skeletonDots.svg';

export async function setupSheep(): Promise<void> {
	addBody();
	importSkelletonDots();
	importHead();
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
	const svgItem = layer.importSVG(skeleton, (item, svgData) => {
		console.log(item);
		console.log(item.children.find((c) => c.name === 'skeletonDotsLayer'));

		const skeletonDotsLayer = item.children.find((c) => c.name === 'skeletonDotsLayer');
		if (skeletonDotsLayer) {
			layer.children = skeletonDotsLayer.children;
		}
		//console.log(svgData);
	});
	console.log(svgItem);

	console.log(layer.children.find((child) => child.name === 'skeletonDots'));

	//console.log(paper.project.layers.map((layer) => layer.name));
}

function addBody() {
	const layer = new paper.Layer();
	layer.name = 'body';
}
