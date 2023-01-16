<script lang="ts">
	import { InteractiveObject } from '@threlte/core';
	import { T } from '@threlte/core';
	import { spring } from 'svelte/motion';
	import { stateUi } from '$lib/stores/stateUi';
	import { state3D } from '$lib/product-viewer/state3D';
	const scale = spring(0.01);

	export let shape: T.Shape;

	function toggleEditorPane() {
		$stateUi.showEditorPane = !$stateUi.showEditorPane;
	}
	//console.log(shape);
</script>

<T.Mesh castShadow let:ref>
	<InteractiveObject
		object={ref}
		interactive
		on:click={toggleEditorPane}
		on:pointerup={() => ($scale = 0.01)}
	/>
	<T.ExtrudeGeometry args={[shape, { depth: $state3D.model.depth }]} />
	<T.MeshStandardMaterial color={'#FFFFFF'} side={2} />
</T.Mesh>
