<script>
	import { onMount } from 'svelte';
	import paper from 'paper';
	import PaperTools from './paper-tools.svelte';

	onMount(() => {
		console.log('the component has mounted');
		var canvas = document.getElementById('myCanvas');
		paper.setup(canvas);
		paper.view.draw();
	});

</script>

<div class="w-full h-full flex flex-col border-red-500 border">
	<canvas id="myCanvas" class="bg-amber-300 aspect-[2/1.8]" />

	<PaperTools />
</div>

<style>
</style>
