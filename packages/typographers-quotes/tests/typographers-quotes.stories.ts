import { Meta, StoryObj } from '@storybook/html-vite';
import { TypographersQuotes, TypographersQuotesParams } from "../src/TypographersQuotes";

const meta: Meta = {
	title: "Typographer’s Quotes",
	tags: ['autodocs'],
	args: {
		selectors: ['.quotes-example'],
		root: document,
	},
	argTypes: {
		selectors: {
			description: 'An array of CSS selectors to identify which elements the plugin should process.',
			control: { disable: true },
			table: {
				type: { summary: 'string[]' },
				defaultValue: { summary: '[]' },
			}
		},
		root: {
			description: 'The root element or document to search within.',
			control: { disable: true },
			table: {
				type: { summary: 'Document | Element' },
				defaultValue: { summary: 'document' },
			}
		}
	},
	parameters: {
		docs: {
			subtitle: 'A simple plugin to replace straight quotation marks and apostrophes with proper ‘curly’ characters.',
			description: {
				// eslint-disable-next-line max-len
				component: 'Replaces quote characters within the given elements and their children upon rendering in the browser, except for quotes in preformatted or code elements. Intended for rendering content in scenarios where you do not control the source, or it is simply more convenient to allow typing straight quotes such as writing in Markdown files that are then rendered by a static site generator or other system.',
			},
			source: {
				type: 'code',
				language: 'javascript',
				code: `
					import { TypographersQuotes } from '@doubleedesign/clientside-typographers-quotes';
					
					const instance = new TypographersQuotes(['.quotes-example']);
					instance.apply();
				`,
			},
		},
	}
};
export default meta;

type Story = StoryObj<TypographersQuotesParams>;


export const Basic: Story = {
	render: (args: TypographersQuotesParams) => {
		const example = document.createElement('div');
		example.className = 'quotes-example';
		const content = `<p>You don't have a TV? What's all your furniture pointed at? 
			Should I use my invisibility to fight crime or for evil? "Come on, Ross, you're a paleontologist. Dig a little deeper."</p>
			<code>const messers = "messees";</code>
			<p>What was I thinking at dinner? "Do you want soup or salad?" Both! Always order both!</p>
			<p>'Where do you want to go to lunch?' 'Mama's Little Bakery, Chicago, Illinois.'</p>
		`;

		example.innerHTML = content;

		return example;
	},
	play: ({ args }) => {
		const instance = new TypographersQuotes(args);
		instance.apply();
	},
	parameters: {
		docs: {
			story: {
				autoplay: true
			}
		}
	},
};
