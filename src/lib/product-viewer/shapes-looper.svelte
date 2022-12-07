<script>
    import MeshInteractive from './mesh-interactive.svelte';

    export let shapes
</script>
{#if Array.isArray(shapes) }
    {#each shapes as shape}
		<svelte:self shapes={shape}/>
	{/each}
{:else }
    <MeshInteractive shape={shapes} />
{/if}