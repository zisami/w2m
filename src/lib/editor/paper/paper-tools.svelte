<script lang="ts">
	import Wool from '$lib/editor/paper/tools/wool.svelte';
	import MoveSelectedLayer from '$lib/editor/paper/tools/moveSelectedLayer.svelte';
	import MoveSkeleton from '$lib/editor/paper/tools/moveSkeleton.svelte';
</script>

<div id="tools">
	<Wool />
	<MoveSelectedLayer />
	<MoveSkeleton />
</div>
