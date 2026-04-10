import { relative, join } from 'path';

/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
	stories: (async () => {
		// Determine where we are running from
		// Storybook UI usually runs with the CWD at project root
		// Vitest plugin runs with the CWD at project root
		const isVitest = process.env.VITEST === 'true';

		// If Vitest is running, it needs paths relative to the project root
		// If Storybook is running, it needs paths relative to .storybook/
		return isVitest
			? ['**/*.mdx', '**/*.stories.@(js|jsx|mjs|ts|tsx)']
			: ['../**/*.mdx', '../**/*.stories.@(js|jsx|mjs|ts|tsx)'];
	})(),
	addons: [
		'@storybook/addon-docs',
		'@storybook/addon-a11y',
		'@whitespace/storybook-addon-html',
		'@storybook/addon-vitest',
	],
	framework: '@storybook/html-vite',
};

export default config;