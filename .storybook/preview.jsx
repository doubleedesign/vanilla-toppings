import { spyOn } from 'storybook/test';
import { Title, Subtitle, Description, Primary, Controls, Stories, Source } from '@storybook/addon-docs/blocks';
import { themes } from 'storybook/theming';
import { doubleeTheme } from '@doubleedesign/doublee-site-style';
import './preview.css';

const mergedTheme = {
	...themes.light,
	...doubleeTheme
};

/** @type { import('@storybook/html-vite').Preview } */
const preview = {
	async beforeEach() {
		// Log console warnings to the Actions tab
		spyOn(console, 'warn').mockName('console.warn');
	},
	parameters: {
		html: {
			highlighter: {
				showLineNumbers: true,
				wrapLines: true
			},
		},
		docs: {
			theme: mergedTheme,
			page: () => (
				<>
					<Title />
					<Subtitle />
					<Description />
					<Primary />
					<Source />
					<Controls />
					<Stories includePrimary={false}/>
				</>
			),
			canvas: {
				// Remove the "show code" button
				// https://storybook.js.org/docs/api/doc-blocks/doc-block-canvas#sourcestate
				sourceState: 'none'
			}
		},
	},

};

export default preview;