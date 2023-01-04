<script lang="ts">
	import paper from 'paper';
	import PaperTools from './paper-tools.svelte';
	import { setupSheep, renderSkeleton, renderSkeletonVectors } from './setup';
	import { sheep } from '$lib/stores/sheep';
	import { paperState } from './paper.store';

	$: $paperState, updatePaper();

	function usePaper(canvas: HTMLCanvasElement) {
		paper.setup(canvas);
		$sheep.skeleton = setupSheep($sheep.skeletonConfig, $paperState);
		paper.view.update();
	}
	function updatePaper() {
		if($sheep?.skeleton){
			renderSkeleton($sheep.skeleton);
			renderSkeletonVectors($sheep.skeleton, $paperState);
		}
	}
</script>

<div class="w-full h-full flex flex-col border-red-500 border">
	<canvas class="bg-amber-300 aspect-[2/1.8] max-w-md" use:usePaper />

	<PaperTools />
</div>

<style>
</style>
