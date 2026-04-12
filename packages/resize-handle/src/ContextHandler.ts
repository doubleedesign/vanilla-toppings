import { ResizeHandlePosition } from "./types";

export class ContextHandler {
	private element: HTMLElement;
	private container: HTMLElement = document.body;

	constructor({ element, container }: { element: HTMLElement, container?: HTMLElement }) {
		this.element = element;
		this.container = (container instanceof HTMLElement) ? container : (element.parentElement ?? document.body);
	}

	getSiblingsBefore(): Element[] {
		const nodes = Array.from(this.container?.children ?? []);

		const elementIndex = nodes.indexOf(this.element);
		if (elementIndex === -1) return [];

		return Array.from(nodes).slice(0, elementIndex);
	}

	getSiblingsAfter(): Element[] {
		const nodes = Array.from(this.container?.children ?? []);

		const elementIndex = nodes.indexOf(this.element);
		if (elementIndex === -1) return [];

		return Array.from(nodes).slice(elementIndex + 1);
	}

	calculateFreeSpace(side: ResizeHandlePosition): number {
		const containerRect = this.container.getBoundingClientRect();
		const elementRect = this.element.getBoundingClientRect();

		const calculatingVertical = side === ResizeHandlePosition.TOP || side === ResizeHandlePosition.BOTTOM;

		const siblings = (side === ResizeHandlePosition.LEFT || side === ResizeHandlePosition.TOP)
			? this.getSiblingsBefore()
			: this.getSiblingsAfter();

		const siblingsSize = siblings.reduce((total, sibling) => {
			const siblingRect = sibling.getBoundingClientRect();

			return total + (calculatingVertical ? siblingRect.height : siblingRect.width);
		}, 0);

		// If we want the space on the left or top, we just need to compare the element's position to the container edge
		// and subtract the size of any siblings in the way
		if (side === ResizeHandlePosition.LEFT || side === ResizeHandlePosition.TOP) {
			return (elementRect[calculatingVertical ? 'top' : 'left'] - containerRect[calculatingVertical ? 'top' : 'left']) - siblingsSize;
		}

		// If we want the space on the right or bottom, we need to also subtract the distance from the element to the container edge
		const distanceToContainerEdge = calculatingVertical
			? containerRect.bottom - elementRect.bottom
			: containerRect.right - elementRect.right;

		return distanceToContainerEdge - siblingsSize;
	}
}