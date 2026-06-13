export type TypographersQuotesParams = {
	selectors: string[];
	root?: Document | Element;
};

export class TypographersQuotes {
	private selectors: string[];
	private root: Document | Element;

	constructor({ selectors, root = document }: TypographersQuotesParams) {
		this.selectors = selectors;
		this.root = root;
	}

	apply(): void {
		this.selectors.forEach(selector => {
			const elements = this.root.querySelectorAll(selector);
			elements.forEach(element => {
				this.processChildren(element);
			});
		});
	}

	processChildren(element: Element): void {
		element.childNodes.forEach(child => {
			if (child.nodeType === Node.TEXT_NODE) {
				child.textContent = this.replaceQuotes(child.textContent || '');
			}
			else if (child.nodeType === Node.ELEMENT_NODE && !['CODE', 'PRE', 'SCRIPT', 'STYLE'].includes((child as Element).tagName)) {
				this.processChildren(child as Element);
			}
		});
	}

	private replaceQuotes(text: string): string {
		return text
			// Replace double quote pairs with typographic quote pairs
			.replaceAll(/"([^"]*)"/g, '“$1”')
			// Replace single quote pairs with typographic quote pairs
			.replaceAll(/'([^']*)'/g, '‘$1’')
			// Replace standalone single quotes that are not preceded by a space (likely to be apostrophes)
			.replaceAll(/(\S)'/g, '$1’')
			// Fix left single quotes that are not the first character
			// AND are not preceded by a space (likely to be apostrophes, so should be right quotes)
			.replaceAll(/([^ ])‘/g, '$1’')
			// Any remaining standalone single quotes should probably be right quotes, e.g., contractions at the start of the word
			.replaceAll(/'/g, '’');
	}
}