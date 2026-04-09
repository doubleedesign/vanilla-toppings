import { spyOn } from 'storybook/test';
import './preview.css';
import { Title, Subtitle, Description, Primary, Controls, Stories } from '@storybook/addon-docs/blocks';

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
			page: () => (
				<>
					<Title />
					<Subtitle />
					<Description />
					<Primary />
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