<script lang="ts">
	import { onMount } from 'svelte';
	import paper from 'paper';
	import { sheep } from '$lib/stores/sheep.state';
	import type Skeleton from '$lib/animal/skeleton';
	import { paperState } from '$lib/editor/paper/paper.store';
	import { vectorChecker, getLayerByName } from '../helpers';
	import { updateSheep } from '../setup';
	interface moveLayer extends paper.Tool {
		name: string;
	}
	paper.Tool;
	const toolName = 'moveSkeleton';
	let clickedItem: paper.Item | null = null;
	let limb: Skeleton | null = null;
	let limbChain: Skeleton[] | null = null;

	onMount(() => {
		const tool: moveLayer = new paper.Tool();
		tool.name = toolName;
		tool.onMouseDown = function (event: paper.ToolEvent) {
			// Test for a hit on any layer
			let hitResult = paper.project.hitTest(event.point);
			if (hitResult?.item?.name) {
				clickedItem = hitResult.item;
				$paperState.eventVector.itemName = clickedItem.name;
				limb = $sheep.skeleton?.getLimbByName(clickedItem.name) || null;
				limbChain = $sheep.skeleton?.getLimbChainByName(clickedItem.name) || null;
				$paperState.eventVector.jointName = limbChain?.reverse()?.[1]?.name || '';
				$paperState.eventVector.limbChain =
					limbChain
						?.map((limb) => limb.name)
						?.reverse()
						?.join(' -> ') || '';
			}
		};

		tool.onMouseDrag = function (event: paper.ToolEvent) {
			if (clickedItem && limb && limbChain) {
				const rotatesAround = $sheep?.skeleton?.getRotationPointByName(clickedItem.name);
				const combinedAngle = $sheep?.skeleton?.getCombinedAngleByName(clickedItem.name);

				if (rotatesAround && typeof combinedAngle !== 'undefined') {
					const distance = rotatesAround.getDistance(event.point);
					const angle = event.point.subtract(rotatesAround)?.angle - combinedAngle;
					$paperState.eventVector.distance = distance;
					$paperState.eventVector.angle = angle;
					$paperState.eventVector.angleCombined = combinedAngle;
					//console.log('roratesAround', rotatesAround.x);

					if (distance && angle) {
						const validDistance = limb.length.isValid(distance);
						const validAngle = limb.angle.isValid(angle);
						vectorChecker(rotatesAround, event.point, validDistance, validAngle);

						if (validDistance || validAngle) {
							if (validDistance) {
								limb.length.last = distance;
							}
							if (validAngle) {
								limb.angle.last = angle;
							}

							if ($sheep.skeleton) {
								updateSheep($sheep.skeleton);
							}
						}
					}
				}
			}
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
</script>

<button class="btn btn-primary" on:click={onActivate} on:keydown={onActivate}>Skeleton</button>
