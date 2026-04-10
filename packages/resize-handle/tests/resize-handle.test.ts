import { Basic } from './resize-handle.stories';
import { screen, waitFor } from '@testing-library/dom';
import { mockBoundingClientRect, RenderStory } from './utils';
import { ResizeHandle } from '../src/ResizeHandle';
import { ResizeHandlePosition } from "../src/types";

const canResizeSpy = vi.spyOn(ResizeHandle.prototype, 'canResize');

describe('ResizeHandle', () => {

	beforeEach(() => {
		vi.resetAllMocks();
		document.body.innerHTML = '';
	});

	it('should attempt to add the resize handle when initialised', async () => {
		const addHandleSpy = vi.spyOn(ResizeHandle.prototype, 'maybeAddResizeHandle');

		const example = document.createElement('resize-handle-demo');
		document.body.appendChild(example);

		const element = screen.getByTestId('vt-demo-element');
		const container = example;

		new ResizeHandle({ element: element as HTMLElement, container: container, position: ResizeHandlePosition.RIGHT });

		expect(addHandleSpy).toHaveBeenCalled();
	});

	it('should add the default class name to the element', async () => {
		canResizeSpy.mockReturnValue(true);
		const example = document.createElement('resize-handle-demo');
		document.body.appendChild(example);

		const element = screen.getByTestId('vt-demo-element');
		const container = example;

		new ResizeHandle({ element: element as HTMLElement, container: container, position: ResizeHandlePosition.RIGHT });

		await waitFor(() => {
			const element = screen.getByTestId('vt-demo-element');
			screen.debug();
			expect(element).toHaveClass('vt-resizable');
		});
	});

	it('should not add the default class name to the element if it cannot be resized', async () => {
		canResizeSpy.mockReturnValue(false);
		const example = document.createElement('resize-handle-demo');
		document.body.appendChild(example);

		const element = screen.getByTestId('vt-demo-element');
		const container = example;

		new ResizeHandle({ element: element as HTMLElement, container: container, position: ResizeHandlePosition.RIGHT });

		await waitFor(() => {
			const element = screen.getByTestId('vt-demo-element');
			expect(element).not.toHaveClass('vt-resizable');
		});
	});

	describe('element on the left of the container + handle position right', () => {
		test("getHandlePosition should return an X value equal to the element's width when there is no space on the left", async () => {
			canResizeSpy.mockReturnValue(true);

			const example = document.createElement('resize-handle-demo');
			document.body.appendChild(example);

			const element = screen.getByTestId('vt-demo-element');
			const container = example;

			mockBoundingClientRect(container, 600, 400);
			mockBoundingClientRect(element, 200, 100, 'left');

			const instance = new ResizeHandle({
				element: element as HTMLElement,
				container: container,
				position: ResizeHandlePosition.RIGHT
			});

			// TODO
			expect(instance.getHandlePosition({})).toEqual(expect.objectContaining({ x: 200 }));
		});

		test("getHandlePosition should return an X value equal to the element's width PLUS the space on the left side", async () => {
			canResizeSpy.mockReturnValue(true);

			const example = document.createElement('resize-handle-demo');
			document.body.appendChild(example);

			const element = screen.getByTestId('vt-demo-element');
			const container = example;

			mockBoundingClientRect(container, 600, 400);
			mockBoundingClientRect(element, 200, 100, 'left', 50);

			const instance = new ResizeHandle({
				element: element as HTMLElement,
				container: container,
				position: ResizeHandlePosition.RIGHT
			});

			// TODO
			expect(instance.getHandlePosition({})).toEqual(expect.objectContaining({ x: 250 }));
		});
	});

	describe('element is on the right of the container + handle position is left', () => {
		// eslint-disable-next-line max-len
		test("getHandlePosition should return an X value equal to the space between the left container edge and the element when there is no space on the right", async () => {
			canResizeSpy.mockReturnValue(true);

			const example = document.createElement('resize-handle-demo');
			document.body.appendChild(example);

			const element = screen.getByTestId('vt-demo-element');
			const container = example;

			mockBoundingClientRect(container, 1000, 500);
			mockBoundingClientRect(element, 200, 100, 'right');

			const instance = new ResizeHandle({
				element: element as HTMLElement,
				container: container,
				position: ResizeHandlePosition.RIGHT
			});

			// TODO
			expect(instance.getHandlePosition({})).toEqual(expect.objectContaining({ x: 800 }));
		});

		test("getHandlePosition should return an X value equal to the element's width MINUS the space on the right side", async () => {
			canResizeSpy.mockReturnValue(true);

			const example = document.createElement('resize-handle-demo');
			document.body.appendChild(example);

			const element = screen.getByTestId('vt-demo-element');
			const container = example;

			mockBoundingClientRect(container, 600, 400);
			mockBoundingClientRect(element, 200, 100, 'right', 50);

			const instance = new ResizeHandle({
				element: element as HTMLElement,
				container: container,
				position: ResizeHandlePosition.LEFT
			});

			// TODO
			expect(instance.getHandlePosition({})).toEqual(expect.objectContaining({ x: 150 }));
		});
	});

	describe("element is at the top of the container + handle position is bottom", () => {
		test("getHandlePosition should return a Y value equal to the element's height when there is no space above", async () => {
			canResizeSpy.mockReturnValue(true);

			const example = document.createElement('resize-handle-demo');
			document.body.appendChild(example);

			const element = screen.getByTestId('vt-demo-element');
			const container = example;

			mockBoundingClientRect(container, 600, 400);
			mockBoundingClientRect(element, 200, 100, 'top');

			const instance = new ResizeHandle({ element: element as HTMLElement, container: container, position: ResizeHandlePosition.BOTTOM });

			// TODO
			expect(instance.getHandlePosition({})).toEqual(expect.objectContaining({ y: 100 }));
		});

		test("getHandlePosition should return a Y value equal to the element's height PLUS the space above", async () => {
			canResizeSpy.mockReturnValue(true);

			const example = document.createElement('resize-handle-demo');
			document.body.appendChild(example);

			const element = screen.getByTestId('vt-demo-element');
			const container = example;

			mockBoundingClientRect(container, 600, 400);
			mockBoundingClientRect(element, 200, 100, 'top', 50);

			const instance = new ResizeHandle({ element: element as HTMLElement, container: container, position: ResizeHandlePosition.BOTTOM });

			// TODO
			expect(instance.getHandlePosition({})).toEqual(expect.objectContaining({ y: 150 }));
		});
	});

	describe("element is at the bottom of the container + handle position is top", () => {
		test("getHandlePosition should return a Y value equal to the space between the top container edge and the element", async () => {
			canResizeSpy.mockReturnValue(true);

			const example = document.createElement('resize-handle-demo');
			document.body.appendChild(example);

			const element = screen.getByTestId('vt-demo-element');
			const container = example;

			mockBoundingClientRect(container, 600, 400);
			mockBoundingClientRect(element, 200, 100, 'bottom');

			const instance = new ResizeHandle({ element: element as HTMLElement, container: container, position: ResizeHandlePosition.TOP });

			// TODO
			expect(instance.getHandlePosition({})).toEqual(expect.objectContaining({ y: 300 }));
		});

		test("getHandlePosition should return a Y value equal to the element's height MINUS the space below", async () => {
			canResizeSpy.mockReturnValue(true);

			const example = document.createElement('resize-handle-demo');
			document.body.appendChild(example);

			const element = screen.getByTestId('vt-demo-element');
			const container = example;

			mockBoundingClientRect(container, 600, 400);
			mockBoundingClientRect(element, 200, 100, 'bottom', 50);

			const instance = new ResizeHandle({ element: element as HTMLElement, container: container, position: ResizeHandlePosition.TOP });

			// TODO
			expect(instance.getHandlePosition({})).toEqual(expect.objectContaining({ y: 250 }));
		});
	});

	describe('canResize', () => {

		it.each([
			['left', 'left', false],
			['right', 'right', false],
			['top', 'top', false],
			['bottom', 'bottom', false],
			['left', 'right', true],
			['right', 'left', true],
			['top', 'bottom', true],
			['bottom', 'top', true],
		])('if position is %s and element is flush with the %s edge of the container, canResize returns %s', (position, containerSide, expected) => {
			const example = document.createElement('resize-handle-demo');
			document.body.appendChild(example);

			const element = screen.getByTestId('vt-demo-element');
			const container = example;

			// By default, set the element to be inside the container with space on all sides,
			// but if expected = false, override the given side's position to be the same for both elements to simulate them being flush against each other
			if(!expected) {
				mockBoundingClientRect(container, 600, 400);
				mockBoundingClientRect(element, 100, 100, position);
			}
			else {
				mockBoundingClientRect(container, 600, 400);
				switch(position) {
					case 'left':
						mockBoundingClientRect(element, 100, 100, 'right');
						break;
					case 'right':
						mockBoundingClientRect(element, 100, 100, 'left');
						break;
					case 'top':
						mockBoundingClientRect(element, 100, 100, 'bottom');
						break;
					case 'bottom':
						mockBoundingClientRect(element, 100, 100, 'top');
						break;
				}
			}

			const instance = new ResizeHandle({ element: element as HTMLElement, container: container, position: position as ResizeHandlePosition });

			expect(instance.canResize()).toEqual(expected);
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