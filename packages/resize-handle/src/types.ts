export type ResizeHandlePosition = 'top' | 'bottom' | 'left' | 'right';

export type ResizeHandleProps = {
	/** The DOM node to attach the drag handle to */
	element: HTMLElement;
	/** Optionally specify a container element to constrain the resizing within (defaults to the parent of the element) */
	container?: HTMLElement;
	/** Optional custom class name/BEM prefix to apply to the elements.
	  	Should generally match a class name that is already on the element. */
	className?: string;
	/** Optionally override the aria-label for the drag handle */
	ariaLabel?: string;
	/** Optionally override the title attribute for the drag handle (displayed on hover) */
	tooltip?: string;
	/** Position of the drag handle relative to the element */
	position: ResizeHandlePosition;
};