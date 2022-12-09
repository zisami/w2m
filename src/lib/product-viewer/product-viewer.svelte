<script>
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';

	import { Canvas, T, useLoader } from '@threlte/core';
	import { degToRad } from 'three/src/math/MathUtils';
	import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
	import { Float } from '@threlte/extras';

	import ShapesLooper from './shapes-looper.svelte';
	import WorldSetup from './world-setup.svelte';
	import SceneSetup from './scene-setup.svelte';

	import { state3D } from '$lib/stores/state3D.js';
	import { sheep } from '$lib/stores/sheep.js';
	import svgFilePath from '$lib/assets/img/sheep.svg';

	onMount(() => {
		if (!$state3D?.model) {
			$state3D.model = {};
		}
		if (!$state3D?.model?.position) {
			$state3D.model.position = [-0.75, 2, 0];
		}
		if (!$state3D?.model?.rotation) {
			$state3D.model.rotation = [0, degToRad(-150), 0];
		}
		if (!$state3D?.model?.scale) {
			$state3D.model.scale = spring(0.01);
		}
		loader.load(svgFilePath, (svg) => {
			shapesFromPaths = svg.paths.map((path) => SVGLoader.createShapes(path));
			console.log(shapesFromPaths);
		});
	});
	const loader = useLoader(SVGLoader, () => new SVGLoader());
	let serializer;
	if (typeof window !== 'undefined') {
		serializer = new XMLSerializer();
	}
	let shapesFromPaths;
	$: $sheep, svgToShapes();

	function svgToShapes() {
		if ($sheep.svg) {
			//console.log($sheep.svg);

			const svg = $sheep.svg.outerHTML;
			//console.log(svg);
			shapesFromPaths = [loader.parse(svg)?.paths?.map((path) => path?.toShapes())];
			console.log(shapesFromPaths);
		}
	}
</script>

{#if shapesFromPaths}
	<Canvas>
		<SceneSetup />

		<Float speed={1}>
			<!-- sheep -->
			<T.Group scale={-0.01} position={[-1, 2, 0]} rotation={[0, degToRad(-150), 0]}>
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
