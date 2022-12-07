<script>
	import EditorPane from '$lib/editor/editor-pane.svelte';
	import ProductViewer from '$lib/product-viewer/product-viewer.svelte';
	import Logo from '$lib/logo.svelte';
	import PaperEditor from '$lib/editor/paper/paper-editor.svelte';
	import EditorTypeButtons from '$lib/editor/editor-type-buttons.svelte';
	import SheepTo3d from '$lib/sheep/sheep-to-3d.svelte';

</script>

<Logo />

<ProductViewer />
<SheepTo3d/>
<EditorPane>
	<PaperEditor />

	<EditorTypeButtons />
</EditorPane>

<style>
</style>
