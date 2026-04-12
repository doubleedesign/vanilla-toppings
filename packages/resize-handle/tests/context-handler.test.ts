import { ContextHandler } from "../src/ContextHandler";
import { ResizeHandlePosition } from "../src/types";
import { mockBoundingClientRect } from "./utils";
import { getOppositeSide } from "../src/utils";

describe('ContextHandler', () => {
	let container: HTMLElement;
	let elements = [] as HTMLElement[];

	beforeEach(() => {
		container = document.createElement('div');
		container.id = 'container';
		container.style.width = '1000px';

		elements = Array.from({ length: 4 }, (_, i) => {
			const element = document.createElement('div');
			element.id = `element${i + 1}`;
			element.style.width = '200px';
			element.style.height = '100px';

			return element;
		});

		container.append(...elements);
	});

	it('returns a single sibling before the element', () => {
		const instance = new ContextHandler({ element: elements[1], container });

		expect(instance.getSiblingsBefore()).toEqual([elements[0]]);
	});

	it('returns multiple siblings before the element', () => {
		const instance = new ContextHandler({ element: elements[2], container });

		expect(instance.getSiblingsBefore()).toEqual([elements[0], elements[1]]);
	});

	it('returns a single sibling after the element', () => {
		const instance = new ContextHandler({ element: elements[2], container });

		expect(instance.getSiblingsAfter()).toEqual([elements[3]]);
	});

	it('returns multiple siblings after the element', () => {
		const instance = new ContextHandler({ element: elements[1], container });

		expect(instance.getSiblingsAfter()).toEqual([elements[2], elements[3]]);
	});

	describe.each([
		ResizeHandlePosition.RIGHT,
		ResizeHandlePosition.LEFT,
		ResizeHandlePosition.TOP,
		ResizeHandlePosition.BOTTOM,
	])('calculates free space on the %s correctly', (side) => {
		let container: HTMLElement;
		let element: HTMLElement;
		let sibling1: HTMLElement;
		let sibling2: HTMLElement;

		container = document.createElement('div');
		container.id = 'container';
		container.style.width = '1000px';

		element = document.createElement('div');
		element.id = 'element';

		sibling1 = document.createElement('div');
		sibling1.id = 'sibling1';

		sibling2 = document.createElement('div');
		sibling2.id = 'sibling2';

		beforeEach(() => {
			mockBoundingClientRect(container, 1000, 1000);
		});

		test('when there are no siblings', () => {
			mockBoundingClientRect(element, 200, 200);
			container.append(element);

			const instance = new ContextHandler({ element, container });

			expect(instance.calculateFreeSpace(side as ResizeHandlePosition)).toEqual(800);
		});

		test('when there are siblings on the handle side', () => {
			mockBoundingClientRect(element, 200, 200, getOppositeSide(side));
			mockBoundingClientRect(sibling1, 300, 300, undefined, 200);
			mockBoundingClientRect(sibling2, 300, 300, undefined, 500);

			if (side === ResizeHandlePosition.RIGHT || side === ResizeHandlePosition.BOTTOM) {
				container.append(element, sibling1, sibling2);
			}
			else {
				container.append(sibling1, sibling2, element);
			}

			const instance = new ContextHandler({ element, container });

			expect(instance.calculateFreeSpace(side as ResizeHandlePosition)).toEqual(200);
		});

		test('when there are siblings on both sides', () => {
			mockBoundingClientRect(element, 200, 200, undefined, 300);
			mockBoundingClientRect(sibling1, 300, 300, undefined, 0);
			mockBoundingClientRect(sibling2, 300, 300, undefined, 500);

			container.append(sibling1, element, sibling2);

			const instance = new ContextHandler({ element, container });

			expect(instance.calculateFreeSpace(side as ResizeHandlePosition)).toEqual(500);
		});
	});
});