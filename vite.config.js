import { sveltekit } from '@sveltejs/kit/vite';
import { threeMinifier } from '@yushijinhun/three-minifier-rollup';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [{ ...threeMinifier(), enforce: 'pre' }, sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	ssr: {
		noExternal: ['three', 'troika-three-text']
	}
};

export default config;
