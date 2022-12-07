<script>
	import {  InteractiveObject, T } from '@threlte/core';
	import { spring } from 'svelte/motion';
	import { state } from '$lib/stores/state.js';

	const scale = spring(0.001);
	const colors = ['white', 'black'];

    export let shape;
    export let index = 0;

	function toggleEditorPane() {
		$state.hideEditorPane = !$state.hideEditorPane;
	}
	//console.log(shape);
</script>

<T.Mesh castShadow let:ref>
	<InteractiveObject
		object={ref}
		interactive
		on:click={toggleEditorPane}
		on:pointerup={() => ($scale = 0.001)}
	/>
	<T.ExtrudeGeometry args={[shape, { depth: 50 }]} />
	<T.MeshStandardMaterial color={colors[index]} />
</T.Mesh>
