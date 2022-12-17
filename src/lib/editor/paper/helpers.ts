import paper from 'paper';

export function getLayerByName(name: string): paper.Layer | null {
	console.log(paper.project.layers.map((layer) => layer.name));
	return paper.project.layers.find((layer) => layer.name === name) || null;
}
