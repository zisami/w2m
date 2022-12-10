<script>
	import { T } from '@threlte/core';
	import { state3D } from '$lib/product-viewer/state3D.js';
</script>

<!-- Floor -->
<T.Mesh receiveShadow rotation.x={$state3D.world.floor.rotation.x}>
	<T.CircleGeometry args={$state3D.world.floor.args} />
	<T.MeshStandardMaterial color={$state3D.world.floor.color} side={2} />
</T.Mesh>

<!-- Sky -->
<T.Mesh receiveShadow rotation.z={$state3D.world.sky.rotation.z}>
	<T.SphereGeometry args={$state3D.world.sky.args} />
	<T.MeshStandardMaterial color={$state3D.world.sky.color} side={1} />
</T.Mesh>
