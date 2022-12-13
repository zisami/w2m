<script>
	import MeshInteractive from './mesh-interactive.svelte';
	export let index = 0;
	export let shapes;
</script>

{#if Array.isArray(shapes)}
	{#each shapes as shape, index}
		<svelte:self shapes={shape} index={index}/>
	{/each}
{:else}
	<MeshInteractive shape={shapes} index={index}/>
{/if}
