import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills'

const config: UserConfig = {
	server: {
		host: 'local.ondroid.org',
		port: 8080
	},
	plugins: [sveltekit(), nodePolyfills({
		globals: {
			Buffer: true, // can also be 'build', 'dev', or false
			global: true,
			process: true,
		  },
	})],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
};

export default config;
