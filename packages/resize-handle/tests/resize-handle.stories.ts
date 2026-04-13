import { Meta, StoryObj } from '@storybook/html-vite';
import { ResizeHandlePosition, ResizeHandleProps } from '../src/types';
import './ResizeHandleDemo';
import { withResizeHandle } from './with-resize-handle';
import { withElementDemoPositioning } from "./with-element-demo-positioning";
import { expect, waitFor } from 'storybook/test';
import { within } from '@storybook/test';
// @ts-expect-error TS2882: Cannot find module or type declarations for side-effect import of ./drag-handle.css
import '../src/resize-handle.css';
import { withSiblings } from "./with-siblings";

const meta: Meta = {
	title: 'ResizeHandle',
	tags: ['autodocs'],
	args: {
		position: ResizeHandlePosition.RIGHT,
		className: '',
		ariaLabel: 'Resize',
		tooltip: 'Resize',
	},
	argTypes: {
		position: {
			control: { type: 'select' },
			// @ts-expect-error TS2322: Type "ResizeHandlePosition" is not assignable to type
			type: { name: 'ResizeHandlePosition', required: true },
			options: [ResizeHandlePosition.RIGHT, ResizeHandlePosition.LEFT, ResizeHandlePosition.TOP, ResizeHandlePosition.BOTTOM],
			description: 'Which side of the element the resize handle should be attached to.',
		},
		element: {
			control: { disable: true },
			// @ts-expect-error TS2322: Type "HTMLElement" is not assignable to type
			type: { name: 'HTMLElement', required: true },
			description: 'The DOM element to attach the resize handle to.',
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
			source: {
				type: 'code',
				language: 'javascript',
				code: `
					import { ResizeHandle } from '@doubleedesign/vanilla-resize-handle';
					// Note: You will also need to import the CSS via a platform-appropriate method
					
					const element = document.querySelector('#my-element');
					new ResizeHandle({ element: element, position: '${ResizeHandlePosition.RIGHT}' });
				`,
			},
		},
	}
};
export default meta;

export type ResizeHandleStoryProps = Omit<ResizeHandleProps, 'element'>;
type Story = StoryObj<ResizeHandleStoryProps>;


export const Basic: Story = {
	render: () => {
		const example = document.createElement('resize-handle-demo');
		example.setAttribute('data-example-variant', 'contained');

		return example;
	},
	decorators: [
		withResizeHandle({}),
		withElementDemoPositioning({})
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
	render: () => {
		const example = document.createElement('resize-handle-demo');
		example.setAttribute('data-example-variant', 'centered');

		return example;
	},
};

export const Offset: Story = {
	tags: ['!autodocs'],
	decorators: [
		withResizeHandle({})
	],
	render: () => {
		const example = document.createElement('resize-handle-demo');
		example.setAttribute('data-example-variant', 'centered');

		setTimeout(() => {
			const element = example.querySelector('[data-testid="vt-demo-element"]') as HTMLElement;
			element.style.transform = 'translate(50px, 50px)';
		}, 50);

		return example;
	},
};

export const WithSiblings: Story = {
	tags: ['!autodocs'],
	decorators: [
		withSiblings({}),
		withResizeHandle({}),
		withElementDemoPositioning({})
	],
	render: () => {
		const example = document.createElement('resize-handle-demo');
		example.setAttribute('data-example-variant', 'contained');

		return example;
	},
};

export const WithMinSize: Story = {
	tags: ['!autodocs'],
	decorators: [
		withResizeHandle({ className: 'my-resizable-thing' }),
		(story, { args }) => {
			const example = story() as HTMLElement;

			// Ensure element is positioned to the opposite side to its handle position, so that the handle will show
			if(args.position === ResizeHandlePosition.LEFT) {
				example.style.justifyContent = 'flex-end';
			}
			if(args.position === ResizeHandlePosition.TOP) {
				example.style.alignItems = 'flex-end';
			}

			return example;
		},
		withElementDemoPositioning({})
	],
	render: () => {
		const example = document.createElement('resize-handle-demo');
		example.classList.add('my-resizable-thing');

		// Hack in the CSS here so that it shows in the HTML addon tab
		const style = document.createElement('style');
		style.textContent = `
			.my-resizable-thing { 
				min-width: 200px;
				min-height: 200px;
			}
		`;
		example.appendChild(style);

		return example;
	},
};

export const CustomHandleStyling: Story = {
	tags: ['!autodocs'],
	args: {
		className: 'my-resizable-thing',
	},
	render: () => {
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
		withResizeHandle({ className: 'my-resizable-thing' }),
	],
	parameters: {
		controls: {
			exclude: ['position']
		}
	},
};

export const NowhereToGoAtEdge: Story = {
	tags: ['!autodocs'],
	args: {
		position: ResizeHandlePosition.LEFT,
	},
	decorators: [
		withElementDemoPositioning({ alignTo: 'handleSide' }),
		withResizeHandle({}),
	],
	parameters: {
		controls: {
			exclude: ['ariaLabel', 'tooltip']
		},
		html: {
			disable: true,
		},
	},
	render: () => {
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

export const NowhereToGoBecauseSiblings: Story = {
	tags: ['!autodocs'],
	args: {
		position: ResizeHandlePosition.RIGHT,
	},
	decorators: [
		withSiblings({ expandSiblings: true }),
		withResizeHandle({}),
		withElementDemoPositioning({}),
	],
	parameters: {
		controls: {
			exclude: ['position', 'ariaLabel', 'tooltip']
		},
		html: {
			disable: true,
		},
	},
	render: () => {
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
	},
};