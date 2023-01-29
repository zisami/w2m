<script lang="ts">
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	import { Canvas, T, useLoader } from '@threlte/core';
	import { degToRad } from 'three/src/math/MathUtils';
	import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
	import { Float } from '@threlte/extras';

	import ShapesLooper from './shapes-looper.svelte';
	import WorldSetup from './world-setup.svelte';
	import SceneSetup from './scene-setup.svelte';

	import { state3D } from '$lib/product-viewer/state3D';
	import { animalState } from '$lib/stores/animal.state';
	import { svg } from '$lib/stores/svg.state';
	import svgFilePath from '$lib/assets/img/sheep.svg';

	import type { SVGResult } from 'three/examples/jsm/loaders/SVGLoader.js';
	import type { Shape } from 'three';

	const loader = useLoader(SVGLoader, () => new SVGLoader());
	let serializer;
	if (typeof window !== 'undefined') {
		serializer = new XMLSerializer();
	}
	let shapesFromPaths: SVGResult[] | Shape[] | Shape[][];
	$: $svg, svgToShapes();
	$: $animalState, svgToShapes();
	onMount(() => {
		loader.load(svgFilePath, (svg) => {
			$animalState.colors = svg.paths.map((path) => path.color);
			$animalState.colors = svg.paths.map((path) => path.color);
			shapesFromPaths = svg.paths.map((path) => SVGLoader.createShapes(path));
		});
	});

	function svgToShapes() {
		const svgStore = get(svg);
		if (svgStore.svg) {
			const svg = svgStore.svg.outerHTML;
			shapesFromPaths = [loader.parse(svg)?.paths?.map((path) => path?.toShapes(true))];
			if (svg?.scaleingFactor) {
				$state3D.model.scale = $state3D.model.baseScale * svg.scaleingFactor;
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
