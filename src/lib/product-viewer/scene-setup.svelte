<script>
	import { OrbitControls, T } from '@threlte/core';
	import { degToRad } from 'three/src/math/MathUtils';
	import { state3D } from '$lib/stores/state3D.js';
</script>

<T.PerspectiveCamera makeDefault position={[8, 3, 8]} fov={30}>
	<OrbitControls

		enableDamping
	/>
</T.PerspectiveCamera>

<T.DirectionalLight castShadow position={[-1, 10, 10]} />

<T.AmbientLight intensity={0.2} />
