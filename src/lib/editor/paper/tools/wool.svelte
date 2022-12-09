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
		let flipArc = false;
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
			//only on the frist point
			if (!path?.segments[1]) {
				const d = getDrawingDirection(event.downPoint, event.point);
				console.log(d);
				const q = getQadrant(getCanvasSize(event.event.originalTarget), event.downPoint);
				console.log(q);
				console.log(flipArc);
				flipArc = false;
				if (q === 'UL') {
					if (d.right && d.up) {
						flipArc = true
					}
				}
				if (q === 'UR') {
					if (d.right && d.down) {
						flipArc = true
					}
				}
				if (q === 'LR') {
					if (d.left && d.down) {
						flipArc = true
					}
				}
				if (q === 'LL') {
					if (d.left && d.up) {
						flipArc = true
					}
				}
				console.log(flipArc);
			}
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
	function getCanvasSize(canvas) {
		return { width: canvas.width, height: canvas.height };
	}
	function getDrawingDirection(pointA, pointB) {
		return {
			left: pointA.x - pointB.x >= 0,
			right: pointA.x - pointB.x < 0,
			up: pointA.y - pointB.y >= 0,
			down: pointA.y - pointB.y < 0
		};
	}
	function getQadrant(size, point) {
		console.log(size, point);
		const left = point.x < size.width / 2;
		const upper = point.y < size.height / 2;
		return `${upper ? 'U' : 'L'}${left ? 'L' : 'R'}`;
	}
</script>

<div class="button" on:click={onActivate} on:keydown={onActivate}>Wool Tool</div>
