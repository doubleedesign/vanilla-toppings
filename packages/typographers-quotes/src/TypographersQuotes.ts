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
				element.innerHTML = this.replaceQuotes(element.innerHTML);
			});
		});
	}

	private replaceQuotes(text: string): string {
		return text
			// Replace double quotes with typographic quotes
			.replaceAll(/"([^"]*)"/g, '“$1”')
			// Replace single quotes with typographic quotes
			.replaceAll(/'([^']*)'/g, '‘$1’');
	}
}