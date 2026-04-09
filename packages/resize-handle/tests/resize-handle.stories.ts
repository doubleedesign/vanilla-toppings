import { Meta, StoryObj } from '@storybook/html-vite';
import { ResizeHandlePosition, ResizeHandleProps } from '../src/types';
import './ResizeHandleDemo';
import { withResizeHandle } from './with-resize-handle';
import { userEvent, expect, waitFor } from 'storybook/test';
import { within, fireEvent } from '@storybook/test';
// @ts-expect-error TS2882: Cannot find module or type declarations for side-effect import of ./drag-handle.css
import '../src/resize-handle.css';

const meta: Meta = {
	title: 'Vanilla Toppings/ResizeHandle',
	tags: ['autodocs'],
	args: {
		element: '',
		position: 'right',
		container: '',
		className: '',
		ariaLabel: 'Resize',
		tooltip: 'Resize',
	},
	argTypes: {
		element: {
			control: { disable: true },
			// @ts-expect-error TS2322: Type "HTMLElement" is not assignable to type
			type: { name: 'HTMLElement', required: true },
			description: 'The DOM element to attach the resize handle to.',
		},
		position: {
			control: { type: 'select' },
			// @ts-expect-error TS2322: Type "ResizeHandlePosition" is not assignable to type
			type: { name: 'ResizeHandlePosition', required: true },
			options: ['left', 'right', 'top', 'bottom'],
		},
		container: {
			control: { disable: true },
			// @ts-expect-error TS2322: Type "HTMLElement" is not assignable to type
			type: { name: 'HTMLElement', required: false },
			description: 'The DOM element to constrain the resizing within (defaults to the parent of the element).',
		},
		className: {
			control: { type: 'text' },
			description: 'Optional custom class name/BEM prefix to apply to the elements; should generally match a class name that is already on the element.',
		},
		ariaLabel: {
			control: { type: 'text' },
			description: 'Optionally override the aria-label for the resize handle.',
			table: {
				defaultValue: { summary: 'Resize' }
			}
		},
		tooltip: {
			control: { type: 'text' },
			description: 'Optionally override the title attribute for the resize handle.',
			table: {
				defaultValue: { summary: 'Resize' }
			}
		}
	},
	parameters: {
		docs: {
			subtitle: 'A simple utility to add a resize handle to any element on a given side.',
		},
	}
};
export default meta;

type Story = StoryObj<ResizeHandleProps>;


export const Basic: Story = {
	render: (args: Partial<ResizeHandleProps>) => {
		const example = document.createElement('resize-handle-demo');

		return example;
	},
	decorators: [
		withResizeHandle({}),
		(story, { args }) => {
			const example = story() as HTMLElement;

			// Ensure element is positioned to the opposite side to its handle position, so that the handle will show
			if(args.position === 'left') {
				example.style.justifyContent = 'flex-end';
			}
			if(args.position === 'top') {
				example.style.alignItems = 'flex-end';
			}

			return example;
		}
	],
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const handle = await canvas.findByRole('button', { name: /resize/i });
		await expect(handle).toBeInTheDocument();

		handle.focus();
		await waitFor(() => {
			expect(handle).toBeVisible();
		});
	}
};

export const Centered: Story = {
	tags: ['!autodocs'],
	decorators: [
		withResizeHandle({})
	],
	render: (args: Partial<ResizeHandleProps>) => {
		const example = document.createElement('resize-handle-demo');
		example.setAttribute('data-example-variant', 'centered');

		return example;
	},
};

export const Contained: Story = {
	tags: ['!autodocs'],
	decorators: [
		withResizeHandle({})
	],
	render: (args: Partial<ResizeHandleProps>) => {
		const example = document.createElement('resize-handle-demo');
		example.setAttribute('data-example-variant', 'contained');

		return example;
	},
};

export const CustomContainer: Story = {
	tags: ['!autodocs'],
	render: (args: Partial<ResizeHandleProps>) => {
		const example = document.createElement('resize-handle-demo');
		example.setAttribute('data-example-variant', 'contained');

		// Create an extra container
		const container = document.createElement('div');
		container.classList.add('vt-resize-handle-demo-custom-container');
		container.style.border = '2px dotted blue';
		container.style.width = '700px';
		container.style.height = '500px';
		container.style.display = 'flex';

		// Align the demo element inside it so that the handle will be on the opposite side
		if(args.position === 'left') {
			container.style.justifyContent = 'flex-end';
		}
		if(args.position === 'top') {
			container.style.alignItems = 'flex-end';
		}

		// Move the demo element inside the new container
		setTimeout(() => {
			const demoElement = example.querySelector('[data-testid="vt-demo-element"]') as HTMLElement;
			container.appendChild(demoElement);
			example.appendChild(container);
		}, 50);

		return example;
	},
	decorators: [
		withResizeHandle({ container: document.querySelector('.vt-resize-handle-demo-custom-container') as HTMLElement })
	],
};

export const CustomClassNameAndStyling: Story = {
	tags: ['!autodocs'],
	args: {
		className: 'my-resizable-thing',
	},
	render: (args: Partial<ResizeHandleProps>) => {
		const example = document.createElement('resize-handle-demo');
		example.classList.add('my-resizable-thing');

		// Hack in the CSS here so that it shows in the HTML addon tab
		const style = document.createElement('style');
		style.textContent = `
			.my-resizable-thing { 
				--vt-resize-handle-color: darkviolet;
			}
			.my-resizable-thing__drag-handle {
				/* You could further override the handle styles here */
			}
			.my-resizable-thing__drag-handle__icon {
				/* You could further override the icon styles here */
			}
		`;
		example.appendChild(style);

		return example;
	},
	decorators: [
		withResizeHandle({
			className: 'my-resizable-thing'
		}),
	],
	parameters: {
		controls: {
			exclude: ['position']
		}
	},
};

export const NoHandleWhenNowhereToGo: Story = {
	tags: ['!autodocs'],
	args: {
		position: 'left',
	},
	decorators: [
		withResizeHandle({})
	],
	parameters: {
		controls: {
			exclude: ['position', 'ariaLabel', 'tooltip']
		},
		html: {
			disable: true,
		},
	},
	render: (args: Partial<ResizeHandleProps>) => {
		const example = document.createElement('resize-handle-demo');
		example.setAttribute('data-example-variant', 'contained');

		return example;
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// Because the various setup code has timeouts, let's just wait for a lil pause to make sure the handle does not get added
		setTimeout(() => {
			expect(canvas.queryByRole('button', { name: /resize/i })).not.toBeInTheDocument();
		}, 200);
	}
};