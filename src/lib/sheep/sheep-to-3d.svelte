<script>
	import { sheep } from '$lib/stores/sheep.ts';
	let sheepSVG;
	if (typeof window !== 'undefined' && $sheep?.svg) {
		let serializer = new XMLSerializer();
		sheepSVG = serializer?.serializeToString($sheep.svg);
		console.log(sheepSVG, sheepSVG);
	}
</script>

{#if sheepSVG}
	<div id="sheepSVG" class=" ">
		{@html sheepSVG}
	</div>
{/if}
