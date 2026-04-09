import { ResizeHandle } from '../src/ResizeHandle';
import type { ResizeHandlePosition, ResizeHandleProps } from '../src/types';
import { PartialStoryFn, StoryContext } from 'storybook/internal/csf';

/**
 * Decorator to initialise the resize handle once the demo page has rendered.
 * @param param0
 * @param param0.container
 */
export const withResizeHandle = ({ container, className }: Partial<ResizeHandleProps>) => {
	return (Story: PartialStoryFn, context: StoryContext) => {
		const example = Story() as HTMLElement;

		// We need to wait briefly for the demo component to render its content before we can attach the ResizeHandle.
		// Doing it in the play function only works on first render, not when args change.
		// Doing it in a decorator ensures it re-renders as expected when story args change.
		// The explicit wait is needed to ensure it doesn't run before the demo element is available on the DOM.
		setTimeout(() => {
			const element = example.querySelector('[data-testid="vt-demo-element"]') as HTMLElement;
			new ResizeHandle({
				...context.args,
				position: context.args.position as ResizeHandlePosition,
				element: element,
				container: (container instanceof HTMLElement) ? container : undefined,
			});
		}, 100);

		return example;
	};
};