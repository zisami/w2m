<script lang="ts">
	import { onMount } from 'svelte';
	import paper from 'paper';
	import { sheep, type SkeletonJoint } from '$lib/stores/sheep';
	import { paperState } from '$lib/editor/paper/paper.store';
	import { vectorHelper, vectorChecker, getLayerByName } from '../helpers';
	import { updateSheep } from '../setup';
	interface moveLayer extends paper.Tool {
		name: string;
	}

	const toolName = 'moveSkeleton';
	let clickedLayer: paper.Layer | null = null;
	let clickedItem: paper.Item | null = null;
	let rotatesAround: string | null = null;
	let limb: Limb | null = null;
	let limbChain: Limb[];

	onMount(() => {
		const tool: moveLayer = new paper.Tool();
		tool.name = toolName;
		tool.onMouseDown = function (event: paper.ToolEvent) {
			// Test for a hit on any layer
			let hitResult = paper.project.hitTest(event.point);
			if (hitResult?.item?.name) {
				clickedItem = hitResult.item;
				$paperState.eventVektor.itemName = clickedItem.name;
				limb = $sheep.skeleton?.getLimbByName(clickedItem.name)
				console.log('limb', limb);
				limbChain = $sheep.skeleton?.getLimbChainByName(clickedItem.name)
				console.log('limbChain', limbChain.map(lC => lC.name));

				
			}
		};

		tool.onMouseDrag = function (event: paper.ToolEvent) {
			
		};
		tool.onMouseUp = function () {
			getLayerByName('eventVectors')?.remove();
			//console.log($sheep?.skeleton);
		};

		tool.activate();
	});
	const onActivate = () => {
		const tool = paper.tools.find((tool) => {
			if ('name' in tool) {
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
		if (angle >= 0) {
			return angle >= joint.angle.min && angle <= joint.angle.max;
		}
		return angle <= joint.angle.min && angle >= joint.angle.max;
	}
	
</script>

<button class="btn btn-primary" on:click={onActivate} on:keydown={onActivate}>Skeleton</button>
