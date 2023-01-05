<script lang="ts">
	import { onMount } from 'svelte';
	import EditorPane from '$lib/editor/editor-pane.svelte';
	import Logo from '$lib/ui/logo/logo.svelte';
	import EditorTypeButtons from '$lib/editor/editor-type-buttons.svelte';
	import PaperEditor from '$lib/editor/paper/paper-editor.svelte';
	import ProductViewer from '$lib/product-viewer/product-viewer.svelte';

</script>

<Logo />
<ProductViewer />

<EditorPane>
	<PaperEditor />

	<EditorTypeButtons />
</EditorPane>
