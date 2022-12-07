import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import seqPreprocessor from 'svelte-sequential-preprocessor';
import { preprocessThrelte } from '@threlte/preprocess';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	},
	preprocess: seqPreprocessor([
		preprocess({
			postcss: true
		}),
		preprocessThrelte({
			extensions: {
				'three/examples/jsm/controls/OrbitControls.js': [OrbitControls],
				'three/examples/jsm/controls/TransformControls.js': [TransformControls]
			}
		})
	])
};

export default config;
