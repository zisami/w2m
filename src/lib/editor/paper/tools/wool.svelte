<script>
	import { onMount } from 'svelte';
	import paper from 'paper';
	import { sheep } from '$lib/stores/sheep.js';

	onMount(() => {

        console.log('mout wool');
		const tool = new paper.Tool();
		tool.name = 'wool';

		let path;
		let startPoint;
		let flipArc = true;
		tool.minDistance = 5;
		tool.maxDistance = 40;
		tool.onMouseDown = (event) => {
			//console.clear();
			paper.project.activeLayer.children = [];
			path = new paper.Path();
			path.strokeColor = 'black';
			path.add(event.point);

			startPoint = event.point;
		};

		tool.onMouseDrag = function (event) {
			if (!path.segments[1]) {
				flipArc = path.segments[0].point.x - event.point.x < 0;
				/*console.log(
					'first',
					path.segments[0].point.x,
					event.point.x,
					path.segments[0].point.x - event.point.x
				);*/
			}
			//console.log(flipArc);
			path.arcTo(event.point, flipArc);
		};

		tool.onMouseUp = function (event) {
			console.log(event);
			//mouse must be moved from the start point to close the path
			if (event.point.x !== startPoint.x && event.point.y !== startPoint.y) {
				path.arcTo(event.point, flipArc);
				path.arcTo(startPoint, flipArc);
				path.closePath();
				const bounds = new paper.Path.Rectangle(path.getBounds());
				bounds.strokeColor = 'black';
				bounds.strokeWidth = 2;
				bounds.intersect(path);
				const outline = paper.project.activeLayer.lastChild;
				outline.fillColor = 'grey';
				paper.project.activeLayer.children = [outline];
				$sheep.svg = paper.project.exportSVG();
			}
		};
        
        tool.activate();
	});
	const onActivate = () => {
		//console.log('onActivateWool', paper.tool);
		const tool = paper.tools.find((tool) => tool.name === 'wool');
		tool.activate();
	};
</script>

<div class="button" on:click={onActivate}>Wool Tool</div>
