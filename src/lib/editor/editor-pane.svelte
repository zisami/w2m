<script lang="ts">
	import { fly } from 'svelte/transition';
	import { stateUi } from '$lib/stores/stateUi';
	import MdClose from 'svelte-icons/md/MdClose.svelte';
	import PaperValueDisplay from './paper/paperValueDisplay.svelte';

	function toggleEditorPane() {
		$stateUi.showEditorPane = !$stateUi.showEditorPane;
	}
</script>

{#if $stateUi.showEditorPane}
	<PaperValueDisplay />
	<div
		class="container absolute px-4 bottom-0 h-1/2 grid left-1/2 transform -translate-x-1/2 "
		transition:fly={{ y: 200, duration: 800 }}
	>
		<div class=" bg-slate-100 rounded-t-2xl p-4 pb-0 bottom-0 relative">
			<div
				class="rounded-full bg-green-700 absolute text-gray-200 center p-1 text-xs w-8 h-8 grid place-content-center font-bold -right-3 -mt-8 border-2 border-green-100 hover:cursor-pointer"
				on:click={toggleEditorPane}
				on:keydown={toggleEditorPane}
			>
				<MdClose />
			</div>
			<slot />
		</div>
	</div>
{/if}

<style>
</style>
