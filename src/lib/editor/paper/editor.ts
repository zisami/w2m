import paper from 'paper';
import { getLayerByName } from './helpers';

export function onFrame(): void {
	paper.view.onFrame = () => {
		const headPoint = getLayerByName('skeletonDots')
			?.children.find((c) => c.name === 'skeletonDots')
			?.children.find((c) => c.name === 'skeletonDotsLayer')
			?.children.find((c) => c.name === 'front')
			?.children.find((c) => c.name === 'headPoint');
		console.log(headPoint);

		const head = getLayerByName('head')?.children.find((c) => c.name === 'head-svg');
		//console.log(head);
		if (headPoint && head) {
			head.position = headPoint.position;
		}
	};
}
