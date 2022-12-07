<script>
	import { sheep } from '$lib/stores/sheep.js';
   let sheepSVG;
	if (typeof window !== 'undefined' && $sheep?.svg) {
      let serializer = new XMLSerializer();
      sheepSVG = serializer?.serializeToString($sheep.svg)
	}
</script>

{#if sheepSVG}
<div id="sheepSVG">

	{@html sheepSVG}
</div>
{/if}
