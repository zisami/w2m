<script lang="ts">
	import paper from 'paper';
	import PaperTools from './paper-tools.svelte';
	import { setupSheep } from './setup';

	function usePaper(canvas: HTMLCanvasElement) {
		paper.setup(canvas);
		setupSheep();
		paper.view.update();
	}
</script>

<div class="w-full h-full flex flex-col border-red-500 border">
	<canvas class="bg-amber-300 aspect-[2/1.8] max-w-md" use:usePaper />

	<PaperTools />
</div>

<style>
</style>
