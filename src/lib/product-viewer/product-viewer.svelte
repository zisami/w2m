<script lang="ts">
	import { onMount } from 'svelte';

	import { Canvas, T, useLoader } from '@threlte/core';
	import { degToRad } from 'three/src/math/MathUtils';
	import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
	import { Float } from '@threlte/extras';

	import ShapesLooper from './shapes-looper.svelte';
	import WorldSetup from './world-setup.svelte';
	import SceneSetup from './scene-setup.svelte';

	import { state3D } from '$lib/product-viewer/state3D';
	import { sheep } from '$lib/stores/sheep';
	import svgFilePath from '$lib/assets/img/sheep.svg';

	import type { SVGResult } from 'three/examples/jsm/loaders/SVGLoader.js';
	//import type { Shape } from 'three';

	onMount(() => {
		loader.load(svgFilePath, (svg) => {
			$sheep.colors = svg.paths.map((path) => path.color);
			shapesFromPaths = svg.paths.map((path) => SVGLoader.createShapes(path));
		});
	});
	const loader = useLoader(SVGLoader, () => new SVGLoader());
	let serializer;
	if (typeof window !== 'undefined') {
		serializer = new XMLSerializer();
	}
	let shapesFromPaths: SVGResult[] | Shape[] | Shape[][];
	$: $sheep, svgToShapes();

	function svgToShapes() {
		if ($sheep.svg) {
			const svg = $sheep.svg.outerHTML;
			shapesFromPaths = [loader.parse(svg)?.paths?.map((path) => path?.toShapes(true))];
			if ($sheep?.scaleingFactor) {
				//console.log('scale to fit', $sheep.scaleingFactor);
				$state3D.model.scale = $state3D.model.baseScale * $sheep.scaleingFactor;
			}
		}
	}
</script>

{#if shapesFromPaths}
	<Canvas>
		<SceneSetup />

		<Float speed={1}>
			<!-- sheep -->
			<T.Group scale={$state3D.model.scale} position={[-1, 2, 0]} rotation={[0, degToRad(-150), 0]}>
				<ShapesLooper shapes={shapesFromPaths} />
			</T.Group>
		</Float>

		<WorldSetup />
	</Canvas>
{:else}
	<div class="container grid place-content-center h-screen w-screen bg-orange-300 ">
		<img src={svgFilePath} alt="comic-sheep" class="w-8" />
		getting a sheep for you...
	</div>
{/if}
