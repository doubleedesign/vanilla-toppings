import { ResizeHandlePosition, ResizeHandleProps } from './types';

export class ResizeHandle {
	private element: HTMLElement;
	private container?: HTMLElement;
	private classes: string[];
	private readonly ariaLabel: string;
	private readonly tooltip: string;
	private readonly position: ResizeHandlePosition;
	private handlePosition: { x: number; y: number } = { x: 0, y: 0 };

	constructor({ element, container, position, className, ariaLabel, tooltip }: ResizeHandleProps) {
		this.element = element;
		this.container = (container instanceof HTMLElement) ? container : (element.parentElement ?? document.body);
		this.classes = ['vt-resizable', className].filter(cls => cls !== undefined);
		this.ariaLabel = ariaLabel ?? 'Resize';
		this.tooltip = tooltip ?? ariaLabel ?? 'Resize';
		this.position = position;
		this.handlePosition = { x: 0, y: 0 };

		this.maybeAddClasses();
		this.maybeAddResizeHandle();
	}

	maybeAddClasses() {
		if(!this.canResize()) {
			return;
		}

		this.element.classList.add('vt-resizable');
		this.element.classList.add(`vt-resizable--${this.position}`);
	}

	maybeAddResizeHandle() {
		if(!this.canResize()) {
			console.warn('ResizeHandle: Cannot add resize handle because the element is already at the edge of the container in the direction of resizing.');

			return;
		}

		const dragHandle = document.createElement('button');
		dragHandle.className = this.classes.map(cls => `${cls}__drag-handle`).join(' ');
		dragHandle.ariaLabel = this.ariaLabel;
		dragHandle.title = this.tooltip;
		dragHandle.draggable = true;

		const iconClasses = this.classes.map(cls => `${cls}__drag-handle__icon`).join(' ');

		/* eslint-disable max-len */
		if(this.position === 'top' || this.position === 'bottom') {
			dragHandle.innerHTML = `<span class="${iconClasses}">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-expand" viewBox="0 0 16 16">
				  <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10"/>
				</svg>
			</span>`;
		}
		else {
			dragHandle.innerHTML = `<span class="${iconClasses}">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-expand-vertical" viewBox="0 0 16 16">
			  		<path d="M8 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8"/>
				</svg>
			</span>`;
		}
		/* eslint-enable max-len */

		if(this.position === 'top' || this.position === 'left') {
			this.element.insertBefore(dragHandle, this.element.firstChild);
		}
		else {
			this.element.appendChild(dragHandle);
		}

		dragHandle.addEventListener('dragstart', this.onDragStart.bind(this));
		dragHandle.addEventListener('dragend', this.onDragEnd.bind(this));
	}

	canResize() {
		switch(this.position) {
			case ResizeHandlePosition.RIGHT:
				return this.canGoRight();
			case ResizeHandlePosition.LEFT:
				return this.canGoLeft();
			case ResizeHandlePosition.BOTTOM:
				return this.canGoDown();
			case ResizeHandlePosition.TOP:
				return this.canGoUp();
		}
	}

	canGoLeft() {
		const diff = Math.ceil(this.element.getBoundingClientRect().left) - Math.floor(this.container!.getBoundingClientRect().left);

		return diff > 32; // more space than the width of the handle
	}

	canGoRight() {
		const diff = Math.floor(this.container!.getBoundingClientRect().right) - Math.ceil(this.element.getBoundingClientRect().right);

		return diff > 32; // more space than the width of the handle
	}

	canGoUp() {
		const diff = Math.ceil(this.element.getBoundingClientRect().top) - Math.floor(this.container!.getBoundingClientRect().top);

		return diff > 32; // more space than the height of the handle
	}

	canGoDown() {
		const diff = Math.floor(this.container!.getBoundingClientRect().bottom) - Math.ceil(this.element.getBoundingClientRect().bottom);

		return diff > 32; // more space than the height of the handle
	}

	onContainerDragOver(event: DragEvent) {
		event.preventDefault(); // Prevent the cursor being the "not allowed" one while dragging
	}

	onDragStart(event: DragEvent) {
		this?.container?.addEventListener('dragover', this.onContainerDragOver.bind(this));

		// Save the handle position when the drag starts so we can use it to calculate the position change
		this.handlePosition = this.getHandlePosition(event);
	}

	onDragEnd(event: DragEvent) {
		this?.container?.removeEventListener('dragover', this.onContainerDragOver.bind(this));

		const oldHandlePosition = this.handlePosition;
		const newHandlePosition = this.getHandlePosition(event);

		// TODO: This needs to account for the element not being on the furthest edge of its container, e.g., centered example
		// switch(this.position) {
		// 	case 'right':
		// 		this.element.style.setProperty('width', `${event.pageX - this.element.getBoundingClientRect().left}px`, 'important');
		// 		break;
		// 	case 'left':
		// 		this.element.style.setProperty('width', `${this.element.getBoundingClientRect().right - event.pageX}px`, 'important');
		// 		break;
		// 	case 'bottom':
		// 		this.element.style.setProperty('height', `${event.pageY - this.element.getBoundingClientRect().top}px`, 'important');
		// 		break;
		// 	case 'top':
		// 		this.element.style.setProperty('height', `${this.element.getBoundingClientRect().bottom - event.pageY}px`, 'important');
		// 		break;
		// }
	}

	getHandlePosition(event: DragEvent) {
		console.log(this.container!.getBoundingClientRect());
		console.log(event);
		//  TODO: Get the X and Y coordinates of the drop position relative to the container, where the top-left corner of the container is (0, 0)
		const offsetX = 1;
		const offsetY = 1;

		return {
			x: offsetX,
			y: offsetY,
		};
	}

	// TODO: Keyboard interaction
}