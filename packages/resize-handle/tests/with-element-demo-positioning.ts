import { ResizeHandlePosition } from '../src/types';
import type { PartialStoryFn, StoryContext } from 'storybook/internal/csf';

/**
 * Decorator to position the element on the opposite side of its container to the handle position
 * for the purposes of testing and demonstrating each handle position.
 */
export const withElementDemoPositioning = ( { alignTo = 'containerEdge' }) => {
	return (Story: PartialStoryFn, context: StoryContext) => {
		const example = Story() as HTMLElement;

		if(alignTo === 'handleSide') {
			// Align element to the handle side of the container, to test when it shouldn't appear because of lack of space
			if (context.args.position === ResizeHandlePosition.LEFT) {
				example.style.justifyContent = 'flex-start';
			}
			if (context.args.position === ResizeHandlePosition.TOP) {
				example.style.flexDirection = 'column';
				example.style.justifyContent = 'flex-start';
			}
			if (context.args.position === ResizeHandlePosition.BOTTOM) {
				example.style.flexDirection = 'column';
				example.style.justifyContent = 'flex-end';
			}
			if (context.args.position === ResizeHandlePosition.RIGHT) {
				example.style.justifyContent = 'flex-end';
			}
		}
		else {
			// Ensure element is positioned to the opposite side to its handle position, so that the handle will show
			if (context.args.position === ResizeHandlePosition.LEFT) {
				example.style.justifyContent = 'flex-end';
			}
			if (context.args.position === ResizeHandlePosition.TOP) {
				example.style.flexDirection = 'column';
				example.style.justifyContent = 'flex-end';
			}
			if (context.args.position === ResizeHandlePosition.BOTTOM) {
				example.style.flexDirection = 'column';
			}
		}

		return example;
	};
};