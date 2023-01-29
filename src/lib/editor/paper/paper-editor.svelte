<script lang="ts">
	import paper from 'paper';
	import PaperTools from './paper-tools.svelte';
	import { setupAnimal, updateAnimal } from './setup';
	import { animalState } from '$lib/stores/animal.state';
	import { paperState } from './paper.store';

	$: $paperState, updatePaper();
	$: $animalState, updatePaper();
	function usePaper(canvas: HTMLCanvasElement) {
		paper.setup(canvas);
		if ($animalState.animal.skeleton) {
			$animalState.animal.skeleton = setupAnimal($animalState.animal.skeleton, $paperState);
		}
		$animalState.animal?.bodyParts?.forEach((part) => part?.draw());
		paper.view.update();
	}
	function updatePaper() {
		if ($animalState.animal?.skeleton && paper.project) {
			updateAnimal($animalState, $paperState);
		}
	}
</script>

<div class="flex flex-col">
	<canvas class=" aspect-[2/1.8] max-w-md" use:usePaper />

	<PaperTools />
</div>

<style>
</style>
