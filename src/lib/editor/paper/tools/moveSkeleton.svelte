<script lang="ts">
	import { onMount } from 'svelte';
	import paper from 'paper';

	interface moveLayer extends paper.Tool {
		name: string;
	}

	const toolName = 'moveSkeleton';
	let clickedLayer: paper.Layer | null = null;
    let clickedItem: paper.Item | null = null;
    const skeletonConfig = {
        lowerLegs:{
            length: {
                min: 15,
                max: 30,
                original: 100,
            }
        }
    }

	onMount(() => {
		const tool: moveLayer = new paper.Tool();
		tool.name = toolName;
		tool.onMouseDown = function (event: paper.ToolEvent) {
			// Test for a hit on any layer
			let hitResult = paper.project.hitTest(event.point);
			if (hitResult?.item) {
				const familyTree = [hitResult.item.name];
				let parent = hitResult.item.parent;
				if (parent) {
					familyTree.push(parent.name);
				}
				while (!(parent instanceof paper.Layer)) {
					parent = parent.parent;
					familyTree.push(parent.name);
				}
				// Get the clicked layer
				clickedLayer = parent;
                clickedItem = hitResult.item;
				clickedItem.selected = true;
				console.log(familyTree);
			}
		};

		tool.onMouseDrag = function (event: paper.ToolEvent) {
			// Move all the items on the clicked layer to the clicked point
			if (clickedItem) {
                console.log(event.point.getDistance(clickedItem.parent.position));
                
					clickedItem.position = event.point;
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
				//console.log('tool.name', tool.name, toolName);
				return tool.name === toolName;
			}
			return false;
		});
        paper.project.layers.find((layer) => layer.name === 'skeletonDots')?.bringToFront()
		tool?.activate();
	};
</script>

<button class="btn btn-primary" on:click={onActivate} on:keydown={onActivate}>Skeleton</button>
