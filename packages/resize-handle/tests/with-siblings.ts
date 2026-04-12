import { ResizeHandlePosition } from '../src/types';
import type { PartialStoryFn, StoryContext } from 'storybook/internal/csf';

/**
 * Decorator to position the element on the opposite side of its container to the handle position
 * for the purposes of testing and demonstrating each handle position.
 */
export const withSiblings = ( { expandSiblings = false }: { expandSiblings?: boolean }) => {
	return (Story: PartialStoryFn, context: StoryContext) => {
		const example = Story() as HTMLElement;

		const sibling1 = document.createElement('div');
		sibling1.style.backgroundColor = '#f6f6f6';
		sibling1.style.padding = '0.25rem';
		sibling1.textContent = 'Sibling element to test what happens when there are other elements in the container';
		sibling1.style.flexGrow =  '1';
		if(!expandSiblings) {
			sibling1.style.flexGrow = '0';
			sibling1.style.width = '100px';
			sibling1.style.minWidth = '100px';
			sibling1.style.flexBasis = '100px';
		}

		const sibling2 = document.createElement('div');
		sibling2.style.backgroundColor = '#f6f6f6';
		sibling2.style.padding = '0.25rem';
		sibling2.textContent = 'Sibling element to test what happens when there are other elements in the container';
		sibling2.style.flexGrow =  '1';
		if(!expandSiblings) {
			sibling2.style.flexGrow = '0';
			sibling2.style.width = '100px';
			sibling2.style.minWidth = '100px';
			sibling2.style.flexBasis = '100px';
		}

		// Wait until the demo web component renders the element before adding the siblings
		// to ensure they go in the intended positions (before and after the demo element)
		requestAnimationFrame(() => {
			example.insertAdjacentElement('afterbegin', sibling1);
			example.insertAdjacentElement('beforeend', sibling2);
		});

		return example;
	};
};