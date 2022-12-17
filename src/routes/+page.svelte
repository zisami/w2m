<script lang="ts">
	import { onMount } from 'svelte';
	import EditorPane from '$lib/editor/editor-pane.svelte';
	import Logo from '$lib/ui/logo/logo.svelte';
	import EditorTypeButtons from '$lib/editor/editor-type-buttons.svelte';
	import SheepTo3d from '$lib/sheep/sheep-to-3d.svelte';
	let world3d, paperEditor;
	onMount(async () => {
		world3d =(await import('$lib/product-viewer/product-viewer.svelte')).default
		paperEditor =(await import('$lib/editor/paper/paper-editor.svelte')).default
	});
</script>

<Logo />
{#if world3d}
	<svelte:component this={world3d} />
{/if}
<EditorPane>
	{#if paperEditor}
		<svelte:component this={paperEditor} />
	{/if}

	<EditorTypeButtons />
</EditorPane>

<style>
</style>
