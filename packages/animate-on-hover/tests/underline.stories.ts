import { Meta, StoryObj } from '@storybook/html-vite';
import { withRuntimeScss } from './with-runtime-scss';

type StoryArgs = {
	color: string;
	duration: string;
	size: string;
};

const meta: Meta = {
	title: 'Animate on hover/Underline',
	tags: ['autodocs'],
	args: {
		color: 'currentColor',
		duration: '0.3s',
		size: '1px'
	},
	argTypes: {
		color: {
			control: { type: 'color' },
			description: 'Color of the underline',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'currentColor' }
			}
		},
		duration: {
			control: { type: 'text' },
			description: 'Duration of the animation in seconds (e.g., "0.3s")',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: '0.3s' }
			}
		},
		size: {
			control: { type: 'text' },
			description: 'Thickness of the underline (e.g., "1px", "0.25rem")',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: '1px' }
			}
		}
	},
	parameters: {
		docs: {
			subtitle: 'Animated underline on hover/focus using an SCSS mixin.',
			source: {
				type: 'code',
				language: 'scss',
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				transform: (code: string, { args }: any) => {
					const { color, duration, size } = args;

					return `
						.fancy-link {
							@include underline-on-hover(${color}, ${duration}, ${size});
						}
					  `.trim();
				},
			},
		},
	},
	decorators: [
		withRuntimeScss('underline-demo.scss', 'underline-from-center')
	]
};
export default meta;

type Story = StoryObj<StoryArgs>;

export const Basic: Story = {
	render: () => {
		const container = document.createElement('div');
		container.id = 'underline-demo';

		const example = document.createElement('a');
		example.className = 'fancy-link';
		example.href = '#';
		example.textContent = 'Example link';
		container.appendChild(example);

		return container;
	},
};

export const Large: Story = {
	tags: ['!autodocs'],
	args: {
		size: '5px',
		color: 'hotpink'
	},
	render: () => {
		const container = document.createElement('div');
		container.id = 'underline-demo';

		const example = document.createElement('a');
		example.className = 'fancy-link fancy-link--large';
		example.href = '#';
		example.textContent = 'Example linky link';
		const caption = document.createElement('p');
		// eslint-disable-next-line max-len
		caption.textContent = 'This example includes larger, bolder text and a larger default underline to demonstrate how the underline behaves with regard to descenders.';

		container.appendChild(example);
		container.appendChild(caption);

		return container;
	},
	parameters: {
		controls: {
			exclude: ['size', 'color']
		},
	},
};