import type { HtmlRenderer, StoryObj } from '@storybook/html-vite';
import type { DecoratorFunction, StoryContext } from 'storybook/internal/csf';
import type { ResizeHandleStoryProps } from './resize-handle.stories';
import { loadManagerOrAddonsFile } from "storybook/internal/common";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MockedContext = Partial<StoryContext<HtmlRenderer, ResizeHandleStoryProps>> & any;
type ResizeHandleDecorator = DecoratorFunction<HtmlRenderer, ResizeHandleStoryProps>;

/**
 * Utility function to render a Storybook story in a unit test environment,
 * including applying any decorators and returning the resulting HTML element.
 *
 * Note: This intentionally does not run the play() function
 * because that can contain Storybook/Playwright test assertions, which we do not want polluting unit tests.
 *
 * @param story
 * @param args
 */
export function RenderStory(story: StoryObj<ResizeHandleStoryProps>, args: ResizeHandleStoryProps) {
	if(!story.render) return;

	let finalRender = story.render;

	const root = document.createElement('div');
	root.id = 'vitest-root'; // as opposed to 'storybook-root'

	const context: MockedContext = {
		args: args,
		canvasElement: root,
	};


	if (story.decorators && story.decorators.length > 0) {
		// Use reduceRight to have the decorators wrap the story in the standard Storybook order (outer to inner)
		finalRender = (story.decorators as ResizeHandleDecorator[]).reduceRight((prevRender: typeof finalRender, decorator: ResizeHandleDecorator) => {
			return (args: ResizeHandleStoryProps, context: MockedContext) => {
				return decorator(() => prevRender(args, context), context);
			};
		}, finalRender);
	}

	const html = finalRender(args, context);

	if (typeof html === 'string') {
		root.insertAdjacentHTML('beforeend', html);
	}
	else {
		root.appendChild(html);
	}

	document.body.appendChild(root);
}

/**
 * Utility function to mock getBoundingClientRect() of an element with specified values in unit tests
 * (neither JSDOM nor Happy-DOM actually calculate layout, so we get all 0 by default)
 * @param element
 * @param width - width of the element
 * @param height - height of the element
 * @param alignment  - which edge of the element should be flush with its container
 * @param offset - how much extra space to add between the container edge and the element on the side it is aligned to
 */
export function mockBoundingClientRect(element: HTMLElement, width: number, height: number, alignment?: string, offset?: number) {
	const mockedViewportWidth = window.innerWidth || document.documentElement.clientWidth;
	const mockedViewportHeight = window.innerHeight || document.documentElement.clientHeight;

	const mockedValue = {
		width: width,
		height: height,
		top: alignment === 'top' ? 0 : mockedViewportHeight - height,
		left: alignment === 'left' ? 0 : mockedViewportWidth - width,
		bottom: alignment === 'bottom' ? mockedViewportHeight : height,
		right: alignment === 'right' ? mockedViewportWidth : width,
		x: alignment === 'left' ? 0 : mockedViewportWidth - width, // same as left
		y: alignment === 'top' ? 0 : mockedViewportHeight - height, // same as top
	};

	if(alignment) {
		// @ts-expect-error TS7053: Element implicitly has an any type because expression of type string can't be used to index type
		mockedValue[alignment] += offset ?? 0;
	}

	vi.spyOn(element, 'getBoundingClientRect').mockReturnValue(mockedValue as DOMRect);
}