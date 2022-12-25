<script>
	import { OrbitControls, T } from '@threlte/core';
	import { state3D } from '$lib/product-viewer/state3D';

</script>

<T.PerspectiveCamera makeDefault position={$state3D.camera.position} fov={$state3D.camera.fov}>
	<OrbitControls
		minPolarAngle={$state3D.OrbitControls.minPolarAngle}
		maxPolarAngle={$state3D.OrbitControls.maxPolarAngle}
		minAzimuthAngle={$state3D.OrbitControls.minAzimuthAngle}
		maxAzimuthAngle={$state3D.OrbitControls.maxAzimuthAngle}
		enableZoom={$state3D.OrbitControls.enableZoom}
		maxDistance={$state3D.OrbitControls.maxDistance}
		target={$state3D.model.position}
		enableDamping={$state3D.OrbitControls.enableZoom}
	/>
</T.PerspectiveCamera>

<T.DirectionalLight
	castShadow={$state3D.dirLights[0].castShadow}
	position={$state3D.dirLights[0].position}
/>

<T.AmbientLight intensity={0.2} />