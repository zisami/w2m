<script lang="ts">
	import MeshInteractive from './mesh-interactive.svelte';
	import type { Shape } from 'three';
	export let shapes: Shape | Shape[];
</script>

{#if Array.isArray(shapes)}
	{#each shapes as shape}
		<svelte:self shapes={shape} />
	{/each}
{:else}
	<MeshInteractive shape={shapes}/>
{/if}
