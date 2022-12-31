<script lang="ts">
	import { onMount } from 'svelte';
	import paper from 'paper';
	import { sheep, type SkeletonJoint } from '$lib/stores/sheep';
	import { vectorHelper } from '../helpers';
	interface moveLayer extends paper.Tool {
		name: string;
	}


	const toolName = 'moveSkeleton';
	let clickedLayer: paper.Layer | null = null;
	let clickedItem: paper.Item | null = null;
	let rotatesAround: string | null = null;

	onMount(() => {
		const tool: moveLayer = new paper.Tool();
		tool.name = toolName;
		tool.onMouseDown = function (event: paper.ToolEvent) {
			// Test for a hit on any layer
			let hitResult = paper.project.hitTest(event.point);
			if (hitResult?.item?.name) {
				clickedItem = hitResult.item;
				console.log(clickedItem.name);
				rotatesAround = $sheep?.skeleton?.[clickedItem.name]?.rotatesAround || null;
			}
		};

		tool.onMouseDrag = function (event: paper.ToolEvent) {
			if (clickedItem && rotatesAround) {
				//console.log('event.point', event.point);

				const joint = $sheep?.skeleton?.[rotatesAround];
				if (joint) {
					const distance = joint.point.getDistance(event.point); 
					const angle = joint.point.getDirectedAngle(event.point);
					console.log(distance, angle, joint.point.angle);
					
					if (isValidDistance(distance, joint) && isValidAngle(angle, joint)) {
						clickedItem.position = event.point;
					}
				}
			}
		};
		tool.onMouseUp = function () {
			if (clickedLayer) clickedLayer.selected = false;
		};

		tool.activate();
	});
	const onActivate = () => {
		const tool = paper.tools.find((tool) => {
			if ('name' in tool) {
				console.log('tool.name', tool.name, toolName);
				return tool.name === toolName;
			}
			return false;
		});
		paper.project.layers.find((layer) => layer.name === 'skeletonDots')?.bringToFront();
		tool?.activate();
	};
	/**Check if the distance is within the bounds of the skeleton and if so return true.*/
	function isValidDistance(distance: number, joint: SkeletonJoint): boolean {
		return distance >= joint.length.min && distance <= joint.length.max;
	}

	/**Check if angle is within the bounds of the skeleton */
	function isValidAngle(angle: number, joint: SkeletonJoint): boolean {
		return angle >= joint.angle.min && angle <= joint.angle.max;
	}
</script>

<button class="btn btn-primary" on:click={onActivate} on:keydown={onActivate}>Skeleton</button>
