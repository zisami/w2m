<script lang="ts">
	import paper from 'paper';
	import PaperTools from './paper-tools.svelte';
	import { setupSheep, updateSheepV2 } from './setup';
	import { sheep } from '$lib/stores/sheep.state';
	import { paperState } from './paper.store';

	$: $paperState, updatePaper();
	$: $sheep, updatePaper();
	function usePaper(canvas: HTMLCanvasElement) {
		paper.setup(canvas);
		if ($sheep.skeleton) {
			$sheep.skeleton = setupSheep($sheep.skeleton, $paperState);
		}
		$sheep?.bodyParts?.forEach((part) => part?.draw());
		paper.view.update();
	}
	function updatePaper() {
		if ($sheep?.skeleton && paper.project) {
			updateSheepV2($sheep, $paperState);
		}
	}
</script>

<div class="flex flex-col">
	<canvas class=" aspect-[2/1.8] max-w-md" use:usePaper />

	<PaperTools />
</div>

<style>
</style>
