<script>
	import { OrbitControls, T } from '@threlte/core';
	import { degToRad } from 'three/src/math/MathUtils';
	import { state3D } from '$lib/stores/state3D.js';
</script>

<T.PerspectiveCamera makeDefault position={[8, 3, 8]} fov={30}>
	<OrbitControls
		minPolarAngle={degToRad(50)}
		maxPolarAngle={degToRad(80)}
		minAzimuthAngle={degToRad(-30)}
		maxAzimuthAngle={degToRad(90)}
		enableZoom={true}
		maxDistance={150}
		target={$state3D.model.position}
		enableDamping
	/>
</T.PerspectiveCamera>

<T.DirectionalLight castShadow position={[-1, 10, 10]} />

<T.AmbientLight intensity={0.2} />
