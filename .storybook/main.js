/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
	'stories': [
		'../**/*.mdx',
		'../**/*.stories.@(js|jsx|mjs|ts|tsx)'
	],
	'addons': [
		'@storybook/addon-docs',
		'@storybook/addon-a11y',
		'@whitespace/storybook-addon-html',
		'@storybook/addon-vitest',
	],
	'framework': '@storybook/html-vite'
};
export default config;