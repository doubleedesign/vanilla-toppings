import { spyOn } from 'storybook/test';
import { Title, Subtitle, Description, Primary, Controls, Stories } from '@storybook/addon-docs/blocks';
import { Source } from './components/Source';
import { themes } from 'storybook/theming';
import { doubleeTheme } from '@doubleedesign/doublee-site-style';
import { addons } from 'storybook/preview-api';
import events from 'storybook/internal/core-events';
import './preview.css';
import Prism from 'prismjs';
import { withScssSyntaxHighlighting } from "./decorators/with-scss-syntax-highlighting.tsx";

// Log all Storybook preview events to the browser console if running in debug mode
const channel = addons.getChannel();
const isDebugMode = Boolean(import.meta.env.STORYBOOK_DEBUG);
if(isDebugMode) {
	console.debug('[PREVIEW] Ready to log events to console');
	Object.values(events).forEach((event) => {
		channel.on(event, (data) => {
			console.debug(`[PREVIEW] ${event}`, data);
		});
	});
}

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
		controls: {
			matchers: {
				color: /(background|color)$/i,
			}
		},
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