type TypographersQuotesParams = {
	selectors: string[];
};

export class TypographersQuotes {
	private selectors: string[];

	constructor({ selectors }: TypographersQuotesParams) {
		this.selectors = selectors;
	}

	apply(): void {
		this.selectors.forEach(selector => {
			const elements = document.querySelectorAll(selector);
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
			// Replace standalone single quotes (likely to be apostrophes at this point) with typographic single quote
			.replaceAll(/'/g, '’');
	}
}