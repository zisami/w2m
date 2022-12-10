import { writable } from 'svelte/store';
import { degToRad } from 'three/src/math/MathUtils';

export const state3D = writable({
	model: {
		position: [-0.75, 2, 0],
		rotation: [0, degToRad(-150), 0],
		scale: -0.01,
		depth: 25
	},
	camera: {
		position: [8, 3, 8],
		fov: 30
	},
	dirLights: [
		{
			position: [-1, 10, 10],
			castShadow: true
		}
	],
	ambLight: {
		intensity: 0.25
	},
	OrbitControls: {
		minPolarAngle: degToRad(50),
		maxPolarAngle: degToRad(80),
		minAzimuthAngle: degToRad(-30),
		maxAzimuthAngle: degToRad(90),
		enableZoom: true,
		maxDistance: 150
	},
	world: {
		floor: {
			args: [10, 72],
			rotation: {
				x: degToRad(-90)
			},
			color: 'darkgreen'
		},
		sky: {
			args: [10, 36, 18],
			rotation: {
				z: degToRad(-90)
			},
			color: '#87ceeb'
		}
	}
});
