<script>
	import { T } from '@threlte/core';

	import { degToRad } from 'three/src/math/MathUtils';
</script>

<!-- Floor -->
<T.Mesh receiveShadow rotation.x={degToRad(-90)}>
	<T.CircleGeometry args={[10, 72]} />
	<T.MeshStandardMaterial color="darkgreen" />
</T.Mesh>

<!-- Sky -->
<T.Mesh receiveShadow rotation.z={degToRad(-90)}>
	<T.SphereGeometry args={[10, 36, 18]} />
	<T.MeshStandardMaterial color="#87ceeb" side={1} />
</T.Mesh>
