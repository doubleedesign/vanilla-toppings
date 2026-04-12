import { Basic } from './resize-handle.stories';
import { fireEvent, screen, waitFor } from '@testing-library/dom';
import { mockBoundingClientRect, RenderStory } from './utils';
import { ResizeHandle } from '../src/ResizeHandle';
import { ResizeHandlePosition, ResizeHandleProps } from "../src/types";
import { ContextHandler } from "../src/ContextHandler";
import { getOppositeSide } from "../src/utils";

const canResizeSpy = vi.spyOn(ResizeHandle.prototype, 'canResize');
const updateWidthSpy = vi.spyOn(ResizeHandle.prototype, 'updateElementWidth');
const updateHeightSpy = vi.spyOn(ResizeHandle.prototype, 'updateElementHeight');

async function setupBasicComponent(args?: Partial<ResizeHandleProps>, waitForHandle = true) {
	const example = document.createElement('resize-handle-demo');
	document.body.appendChild(example);

	const element = screen.getByTestId('vt-demo-element');
	const container = example;

	const instance = new ResizeHandle({ element: element as HTMLElement, position: args?.position ?? ResizeHandlePosition.RIGHT });

	if(waitForHandle) {
		const handle = await waitFor(() => {
			const element = screen.queryByRole('button', { name: /resize/i });
			expect(element).toBeInTheDocument();

			return element;
		});

		return { element, container, instance, handle };
	}

	return { element, container, instance, handle: null };
}

describe('ResizeHandle', () => {

	beforeEach(() => {
		vi.resetAllMocks();
		document.body.innerHTML = '';
	});

	it('should attempt to add the resize handle when initialised', async () => {
		const addHandleSpy = vi.spyOn(ResizeHandle.prototype, 'maybeAddResizeHandle');

		await setupBasicComponent({}, false);

		expect(addHandleSpy).toHaveBeenCalled();
	});

	it('should add the default class name to the element', async () => {
		canResizeSpy.mockReturnValue(true);

		await setupBasicComponent({}, false);

		await waitFor(() => {
			const element = screen.getByTestId('vt-demo-element');
			expect(element).toHaveClass('vt-resizable');
		});
	});

	it('should not add the default class name to the element if it cannot be resized', async () => {
		canResizeSpy.mockReturnValue(false);

		await setupBasicComponent({}, false);

		await waitFor(() => {
			const element = screen.getByTestId('vt-demo-element');
			expect(element).not.toHaveClass('vt-resizable');
		});
	});

	/**
	 * onDragEnd handles the movement of the handle along the X or Y axis, where the top left corner of the container is 0,0.
	 * If the handle is dragged to the left or up, the difference in position will be a negative value
	 * (e.g., element edge was at 200 and the handle is dragged to the left 100px, its position would now be 100px on the X axis).
	 * If the handle is dragged to the right or down, the difference in position will be a positive value.
	 */
	describe('onDragEnd', () => {
		it.each(
			[ResizeHandlePosition.LEFT, ResizeHandlePosition.RIGHT]
		)('calls updateElementWidth with a negative value if the handle on the %s is dragged to the left', async (position) => {
			canResizeSpy.mockReturnValue(true);
			const { element, instance } = await setupBasicComponent({ position });

			mockBoundingClientRect(element, 200, 200);

			// Simulate dragging the handle 100px to the left by calling the instance's matching methods with explicit values
			// (due to limitations on JDOM/happy-dom with fireEvent, even with explicit values)
			instance.onDragStart({ clientX: 200, clientY: 0, preventDefault: () => {} } as unknown as DragEvent);
			instance.onContainerDragOver({ clientX: 100, clientY: 0, preventDefault: () => {} } as unknown as DragEvent);
			instance.onDragEnd();

			expect(updateWidthSpy).toHaveBeenCalledOnce();
			expect(updateWidthSpy).toHaveBeenCalledWith(-100);
		});

		it.each(
			[ResizeHandlePosition.LEFT, ResizeHandlePosition.RIGHT]
		)('calls updateElementWidth with a positive value if the handle on the %s is dragged to the right', async (position) => {
			canResizeSpy.mockReturnValue(true);
			const { element, instance } = await setupBasicComponent({ position });

			mockBoundingClientRect(element, 200, 200);

			instance.onDragStart({ clientX: 200, clientY: 0, preventDefault: () => {} } as unknown as DragEvent);
			instance.onContainerDragOver({ clientX: 300, clientY: 0, preventDefault: () => {}
			} as unknown as DragEvent);
			instance.onDragEnd();

			expect(updateWidthSpy).toHaveBeenCalledOnce();
			expect(updateWidthSpy).toHaveBeenCalledWith(100);
		});


		it.each(
			[ResizeHandlePosition.TOP, ResizeHandlePosition.BOTTOM]
		)('calls updateElementHeight with a negative value if the handle on the %s is dragged up', async (position) => {
			canResizeSpy.mockReturnValue(true);
			const { element, instance } = await setupBasicComponent({ position });

			mockBoundingClientRect(element, 200, 200);

			// Simulate dragging the handle 100px to the left by calling the instance's matching methods with explicit values
			// (due to limitations on JDOM/happy-dom with fireEvent, even with explicit values)
			instance.onDragStart({ clientX: 0, clientY: 200, preventDefault: () => {} } as unknown as DragEvent);
			instance.onContainerDragOver({ clientX: 0, clientY: 100, preventDefault: () => {} } as unknown as DragEvent);
			instance.onDragEnd();

			expect(updateHeightSpy).toHaveBeenCalledOnce();
			expect(updateHeightSpy).toHaveBeenCalledWith(-100);
		});

		it.each(
			[ResizeHandlePosition.TOP, ResizeHandlePosition.BOTTOM]
		)('calls updateElementWidth with a positive value if the handle on the %s is dragged down', async (position) => {
			canResizeSpy.mockReturnValue(true);
			const { element, instance } = await setupBasicComponent({ position: position });

			mockBoundingClientRect(element, 200, 200);

			instance.onDragStart({ clientX:0, clientY: 200, preventDefault: () => {} } as unknown as DragEvent);
			instance.onContainerDragOver({ clientX: 0, clientY: 300, preventDefault: () => {} } as unknown as DragEvent);
			instance.onDragEnd();

			expect(updateHeightSpy).toHaveBeenCalledOnce();
			expect(updateHeightSpy).toHaveBeenCalledWith(100);
		});
	});

	describe('decreasing element size', () => {
		const element = document.createElement('div');
		element.setAttribute('data-testid', 'vt-demo-element');

		it.each([ResizeHandlePosition.LEFT, ResizeHandlePosition.RIGHT])('applies the width change correctly when resizing from the %s', (position) => {
			mockBoundingClientRect(element, 200, 200, getOppositeSide(position));
			const instance = new ResizeHandle({ element, position });

			// Negative diff = moved to the left/up, Positive diff = moved to the right/down
			instance.updateElementWidth(position === ResizeHandlePosition.RIGHT ? -100 : 100);

			expect(element.style.width).toEqual('100px');
		});

		it.each([ResizeHandlePosition.TOP, ResizeHandlePosition.BOTTOM])('applies the height change correctly when resizing from the %s', (position) => {
			mockBoundingClientRect(element, 200, 200, getOppositeSide(position));
			const instance = new ResizeHandle({ element, position });

			// Negative diff = moved to the left/up, Positive diff = moved to the right/down
			instance.updateElementHeight(position === ResizeHandlePosition.BOTTOM ? -100 : 100);

			expect(element.style.height).toEqual('100px');
		});
	});

	describe('increasing element size', () => {
		const element = document.createElement('div');
		element.setAttribute('data-testid', 'vt-demo-element');

		it.each([ResizeHandlePosition.LEFT, ResizeHandlePosition.RIGHT])('applies the width change correctly when resizing from the %s', (position) => {
			mockBoundingClientRect(element, 200, 200, getOppositeSide(position));
			const instance = new ResizeHandle({ element, position });

			instance.updateElementWidth(position === ResizeHandlePosition.RIGHT ? 100 : -100);

			expect(element.style.width).toEqual('300px');
		});

		it.each([ResizeHandlePosition.TOP, ResizeHandlePosition.BOTTOM])('applies the height change correctly when resizing from the %s', (position) => {
			mockBoundingClientRect(element, 200, 200, getOppositeSide(position));
			const instance = new ResizeHandle({ element, position });

			instance.updateElementHeight(position === ResizeHandlePosition.BOTTOM ? 100 : -100);

			expect(element.style.height).toEqual('300px');
		});

	});

	describe('canResize', () => {

		it('returns false if there is no free space', () => {
			const spaceSpy = vi.spyOn(ContextHandler.prototype, 'calculateFreeSpace').mockReturnValue(0);

			const example = document.createElement('resize-handle-demo');
			document.body.appendChild(example);

			const element = screen.getByTestId('vt-demo-element');

			const instance = new ResizeHandle({ element: element as HTMLElement, position: ResizeHandlePosition.RIGHT });

			expect(instance.canResize()).toEqual(false);

			spaceSpy.mockRestore();
		});

		it('returns true if there is free space', () => {
			const spaceSpy = vi.spyOn(ContextHandler.prototype, 'calculateFreeSpace').mockReturnValue(100);

			const example = document.createElement('resize-handle-demo');
			document.body.appendChild(example);

			const element = screen.getByTestId('vt-demo-element');

			const instance = new ResizeHandle({ element: element as HTMLElement, position: ResizeHandlePosition.RIGHT });

			expect(instance.canResize()).toEqual(true);

			spaceSpy.mockRestore();
		});
	});

	describe('basic DOM rendering', () => {
		it('can render a story for a unit test', async () => {
			RenderStory(Basic, { position: ResizeHandlePosition.RIGHT });

			expect(screen.getByTestId('vt-demo-element')).toBeVisible();
		});

		it('adds the resize handle if canResize returns true', async () => {
			canResizeSpy.mockReturnValue(true);
			RenderStory(Basic, { position: ResizeHandlePosition.RIGHT });

			await waitFor(() => {
				const handle = screen.queryByRole('button', { name: /resize/i });
				expect(handle).toBeInTheDocument();
			});
		});

		it('does not add the resize handle if canResize returns false', async () => {
			canResizeSpy.mockReturnValue(false);
			RenderStory(Basic, { position: ResizeHandlePosition.RIGHT });

			await waitFor(() => {
				const handle = screen.queryByRole('button', { name: /resize/i });
				expect(handle).toBeNull();
			});
		});

		it('renders but does not visually display the handle by default', async () => {
			canResizeSpy.mockReturnValue(true);
			RenderStory(Basic, { position: ResizeHandlePosition.RIGHT });

			await waitFor(() => {
				const handle = screen.queryByRole('button', { name: /resize/i });
				expect(handle).toBeInTheDocument();
				expect(handle).not.toBeVisible();
			});
		});

		it('visually displays the handle on focus', () => {
			canResizeSpy.mockReturnValue(true);
			RenderStory(Basic, { position: ResizeHandlePosition.RIGHT });

			waitFor(() => {
				const handle = screen.queryByRole('button', { name: /resize/i });
				expect(handle).toBeInTheDocument();
				handle?.focus();
				expect(handle).toBeVisible();
			});
		});

		it('visually displays the handle on hover', () => {
			canResizeSpy.mockReturnValue(true);
			RenderStory(Basic, { position: ResizeHandlePosition.RIGHT });

			waitFor(() => {
				const handle = screen.queryByRole('button', { name: /resize/i });
				expect(handle).toBeInTheDocument();
				handle?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
				expect(handle).toBeVisible();
			});
		});

		it('has the expected default accessible name', async () => {
			canResizeSpy.mockReturnValue(true);
			RenderStory(Basic, { position: ResizeHandlePosition.RIGHT });

			await waitFor(() => {
				const handle = screen.queryByRole('button');
				expect(handle).toBeInTheDocument();
				expect(handle).toHaveAccessibleName('Resize');
			});
		});

		it('applies a custom accessible name if provided', async () => {
			canResizeSpy.mockReturnValue(true);
			RenderStory(Basic, { position: ResizeHandlePosition.RIGHT, ariaLabel: 'Custom resize label' });

			await waitFor(() => {
				const handle = screen.queryByRole('button');
				expect(handle).toBeInTheDocument();
				expect(handle).toHaveAccessibleName('Custom resize label');
			});
		});
	});
});