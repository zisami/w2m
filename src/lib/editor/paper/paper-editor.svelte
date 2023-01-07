<script lang="ts">
	import paper from 'paper';
	import PaperTools from './paper-tools.svelte';
	import { setupSheep, updateSheep, renderLimb, renderSkeletonVectors } from './setup';
	import { sheep } from '$lib/stores/sheep';
	import { paperState } from './paper.store';

	$: $paperState, updatePaper();

	function usePaper(canvas: HTMLCanvasElement) {
		paper.setup(canvas);
		if ($sheep.skeleton) {
			$sheep.skeleton = setupSheep($sheep.skeleton, $paperState);
		}
		paper.view.update();
	}
	function updatePaper() {
		if($sheep?.skeleton && paper.project){
			updateSheep($sheep.skeleton, $paperState);
		}
	}
</script>

<div class="w-full h-full flex flex-col border-red-500 border">
	<canvas class="bg-amber-300 aspect-[2/1.8] max-w-md" use:usePaper />

	<PaperTools />
</div>

<style>
</style>
