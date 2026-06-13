import { Meta, StoryObj } from '@storybook/html-vite';
import { withRuntimeScss } from './with-runtime-scss';

type StoryArgs = {
	color: string;
	duration: string;
};

const meta: Meta = {
	title: 'Animate on hover/Fill from left',
	tags: ['autodocs'],
	args: {
		color: 'purple',
		duration: '0.3s'
	},
	argTypes: {
		color: {
			control: { type: 'color' },
			description: 'Background colour of the fill',
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
	},
	parameters: {
		docs: {
			subtitle: 'Animated background fill on hover using an SCSS mixin.',
			source: {
				type: 'code',
				language: 'scss',
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				transform: (code: string, { args }: any) => {
					const { color, duration } = args;

					return `
						.fancy-link {
							@include fill-from-left(${color}, ${duration});
						}
					  `.trim();
				},
			},
		},
	},
	decorators: [
		withRuntimeScss('fill-demo.scss', 'fill-from-left')
	]
};
export default meta;

type Story = StoryObj<StoryArgs>;

export const Basic: Story = {
	render: () => {
		const container = document.createElement('div');
		container.id = 'fill-from-left-demo';

		const example = document.createElement('a');
		example.className = 'fancy-link-fill';
		example.href = '#';
		example.textContent = 'Example link';
		container.appendChild(example);

		return container;
	},
};