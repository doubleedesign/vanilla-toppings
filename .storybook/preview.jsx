import { spyOn } from 'storybook/test';
import { Title, Subtitle, Description, Primary, Controls, Stories } from '@storybook/addon-docs/blocks';
import { Source } from './components/Source';
import { themes } from 'storybook/theming';
import { doubleeTheme } from '@doubleedesign/doublee-site-style';
import './preview.css';
import Prism from 'prismjs';
import { withScssSyntaxHighlighting } from "./decorators/with-scss-syntax-highlighting.tsx";

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
	decorators: [
		withScssSyntaxHighlighting
	],
};

export default preview;