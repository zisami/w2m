import { writable } from 'svelte/store';
import { degToRad } from 'three/src/math/MathUtils';

export interface ThreeState {
	model: {
		position: number[];
		rotation: number[];
		scale: number;
		baseScale: number;
		depth: number;
	};
	camera: {
		position: number[];
		fov: number;
	};
	dirLights: [
		{
			position: number[];
			castShadow: true;
		}
	];
	ambLight: {
		intensity: number;
	};
	OrbitControls: {
		minPolarAngle: number;
		maxPolarAngle: number;
		minAzimuthAngle: number;
		maxAzimuthAngle: number;
		enableZoom: true;
		maxDistance: 150;
	};
	world: {
		floor: {
			args: number[];
			rotation: {
				x: number;
			};
			color: String;
		};
		sky: {
			args: number[];
			rotation: {
				z: number;
			};
			color: string;
		};
	};
}
const initialState: ThreeState = {
	model: {
		position: [-0.75, 2, 0],
		rotation: [0, degToRad(-150), 0],
		scale: -0.01,
		baseScale: -0.01,
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
};

export const state3D = writable<ThreeState>(initialState);
