<script lang="ts">
	import { onMount } from 'svelte';
	import paper from 'paper';
    import { getLayerByName } from '../helpers';

	interface moveLayer extends paper.Tool {
		name: string;
	}

	const toolName: string = 'moveLayer';
	let clickedLayer: paper.Layer | null = null;
	onMount(() => {
		const tool: moveLayer = new paper.Tool();
		tool.name = toolName;
		tool.onMouseDown = function (event: paper.ToolEvent) {
			// Test for a hit on any layer
            
			let hitResult = paper.project.hitTest(event.point);
			if (hitResult?.item ) {
                const familyTree = [hitResult.item.name]
                let parent = hitResult.item.parent 
                if(parent){
                    familyTree.push(parent.name)
                }
                while (!(parent instanceof paper.Layer)) {
                    parent = parent.parent
                    familyTree.push(parent.name)
                }
                // Get the clicked layer
				clickedLayer = parent;
				clickedLayer.selected = true;
                console.log(familyTree);

			}
		};

		tool.onMouseDrag = function (event: paper.ToolEvent) {
			// Move all the items on the clicked layer to the clicked point
			if (clickedLayer) {
				for (let item of clickedLayer.children) {
					item.position = event.point;
				}
			}
		};
		tool.onMouseUp = function (event: paper.ToolEvent) {
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
            return false
		});
        
		tool?.activate();
	};
</script>

<div class="button" on:click={onActivate} on:keydown={onActivate}>move</div>
