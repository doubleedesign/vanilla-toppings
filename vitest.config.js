import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';

const dirname = path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
	test: {
		projects: [
			{
				test: {
					name: 'unit',
					include: ['**/*.test.ts'],
					// at the time of writing, happy-dom supports document.adoptedStyleSheets (used in the demo web component) whereas jsdom does not
					environment: 'happy-dom',
					// Note: Some packages need their own vitest setup, so should be run from their working directory so it gets picked up
					setupFiles: ['./vitest.setup.ts'],
					globals: true,
					css: true,
				},
			},
			{
				extends: true,
				plugins: [
					// The plugin will run tests for the stories defined in your Storybook config
					// See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
					storybookTest({ configDir: path.join(dirname, '.storybook') }),
				],
				test: {
					name: 'storybook',
					include: ['**/*.stories.ts'],
					browser: {
						enabled: true,
						headless: true,
						provider: playwright({}),
						instances: [{ browser: 'chromium' }],
					},
				},
			},
		],
		coverage: {
			exclude: [
				'**/*.stories.ts',
				'**/tests/**',
			],
		},
	},
});