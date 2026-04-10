/**
 * Web component to render examples for the ResizeHandle component in Storybook in a DRY fashion.
 * Should not be included when compiling the package for use in other projects.
 */
class ResizeHandleDemo extends HTMLElement {
	connectedCallback() {
		// Pass classes down to the demo element to more accurately mimic the expected usage
		const classes = this.classList.value.split(' ').filter(cls => cls !== '');
		this.classList.remove(...classes);

		const template = document.createElement('template');
		/* eslint-disable max-len */
		template.innerHTML = `
			<div data-testid="vt-demo-element" class="${classes}">
				<p>Just to be clear, comedy with the plates will not be well-received. I'm a gym member. I try to go four times a week, but I've missed the last twelve hundred times. I'm not great at the advice. Can I interest you in a sarcastic comment? They don’t know that we know they know we know. Okay, well, who identified this restaurant\'s tone as "pretentious-comma-garlicky"?</p>
			</div>
		`;
		/* eslint-enable max-len */
		const clone = template.content.cloneNode(true) as DocumentFragment;
		this.appendChild(clone);
	}
}

// Check if the component is already defined before doing so, to avoid errors in Storybook's hot module replacement environment
if(!customElements.get('resize-handle-demo')) {
	customElements.define('resize-handle-demo', ResizeHandleDemo);
}

const styles = `
	resize-handle-demo {
		display: flex;
		min-height: 400px;
		box-sizing: border-box;
	}

	resize-handle-demo[data-example-variant="centered"] {
		justify-content: center;
		align-items: center;
	}

	resize-handle-demo[data-example-variant="contained"] {
		border: 2px dotted #333;
		width: 900px;
		min-height: 600px;
		max-height: 600px;
		margin: 0 auto;
	}

	[data-testid="vt-demo-element"] {
		background-color: #eee;
		width: 30%;
		min-width: 400px;
		height: 300px;
		box-sizing: border-box;
		padding: 1rem;
	}
`;

const styleSheet = new CSSStyleSheet();
styleSheet.replaceSync(styles);
document.adoptedStyleSheets.push(styleSheet);

