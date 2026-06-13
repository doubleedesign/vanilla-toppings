import type { PartialStoryFn, StoryContext } from 'storybook/internal/csf';
import { addons } from 'storybook/preview-api';
import Prism from 'prismjs';
import 'prismjs/components/prism-scss';

export const withScssSyntaxHighlighting = (Story: PartialStoryFn, context: StoryContext) => {
	const channel = addons.getChannel();

	const highlightScss = () => {
		setTimeout(() => {
			const codeBlocks = document.querySelectorAll('div.language-scss');
			codeBlocks.forEach((block) => {
				Prism.highlightElement(block);
			});
		}, 50);
	};

	channel.on('storyRendered', highlightScss);
	channel.on('storyArgsUpdated', highlightScss);

	return Story();
};