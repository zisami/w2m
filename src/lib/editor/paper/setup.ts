import paper from 'paper';
import head from '$lib/sheep/head.svg';
import skeleton from '$lib/sheep/skeleton.svg';

let layer: paper.Layer;

export async function setupSheep(): Promise<void> {
	addBody();
	await importHead();
	console.log(paper.project.layers.map((layer) => layer.name));
	console.log(paper.project.activeLayer.name);
}
async function importHead() {
	layer = new paper.Layer();
	layer.name = 'head';
	const svgItem = await importSVG(head);
	if (svgItem) {
		layer.addChild(svgItem);
	}
	console.log(layer);
	console.log(paper.project.activeLayer.name);
}

async function importSkelleton() {
	layer = new paper.Layer();
	layer.name = 'skeleton';
	const svgItem = await importSVG(skeleton);
	if (svgItem) {
		layer.addChild(svgItem);
	}
	layer.sendToBack();
}

async function importSVG(path: string): Promise<paper.Item> {
	return await paper.project.importSVG(path);
}

function addBody() {
	layer = new paper.Layer();
	layer.name = 'body';
}
