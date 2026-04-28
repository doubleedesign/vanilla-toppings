import { fireEvent, screen, waitFor } from '@testing-library/dom';
import { TypographersQuotes } from "../src/TypographersQuotes";

describe("Typographer's Quotes", () => {

	beforeEach(() => {
		vi.resetAllMocks();
		document.body.innerHTML = '';
	});

	it('converts a single pair of double quotes', () => {
		const example = document.createElement('div');
		example.setAttribute('data-testid', 'test-wrapper');
		example.innerHTML = `<p>"Hello, World!"</p>`;
		document.body.appendChild(example);

		const instance = new TypographersQuotes({ selectors: ['[data-testid="test-wrapper"]'] });
		instance.apply();

		const result = screen.getByTestId('test-wrapper').innerHTML;
		expect(result).toEqual('<p>“Hello, World!”</p>');
	});

	it('converts a single pair of single quotes', () => {
		const example = document.createElement('div');
		example.setAttribute('data-testid', 'test-wrapper');
		example.innerHTML = `<p>'Hello, World!'</p>`;
		document.body.appendChild(example);

		const instance = new TypographersQuotes({ selectors: ['[data-testid="test-wrapper"]'] });
		instance.apply();

		const result = screen.getByTestId('test-wrapper').innerHTML;
		expect(result).toEqual('<p>‘Hello, World!’</p>');
	});

	it('converts multiple pairs of double quotes in a paragraph', () => {
		const example = document.createElement('div');
		example.setAttribute('data-testid', 'test-wrapper');
		example.innerHTML = `<p>"Hello, World!", she said. "Another quote"</p>`;
		document.body.appendChild(example);

		const instance = new TypographersQuotes({ selectors: ['[data-testid="test-wrapper"]'] });
		instance.apply();

		const result = screen.getByTestId('test-wrapper').innerHTML;
		expect(result).toEqual('<p>“Hello, World!”, she said. “Another quote”</p>');
	});

	it('converts multiple pairs of single quotes in a paragraph', () => {
		const example = document.createElement('div');
		example.setAttribute('data-testid', 'test-wrapper');
		example.innerHTML = `<p>'Hello, World!', she said. 'Another quote'</p>`;
		document.body.appendChild(example);

		const instance = new TypographersQuotes({ selectors: ['[data-testid="test-wrapper"]'] });
		instance.apply();

		const result = screen.getByTestId('test-wrapper').innerHTML;
		expect(result).toEqual('<p>‘Hello, World!’, she said. ‘Another quote’</p>');
	});

	it('converts across multiple elements within the one selector', () => {
		const example = document.createElement('div');
		example.setAttribute('data-testid', 'test-wrapper');
		example.innerHTML = `<p>"Hello, World!"</p><p>'Another quote'</p>`;
		document.body.appendChild(example);

		const instance = new TypographersQuotes({ selectors: ['[data-testid="test-wrapper"]'] });
		instance.apply();

		const result = screen.getByTestId('test-wrapper').innerHTML;
		expect(result).toEqual('<p>“Hello, World!”</p><p>‘Another quote’</p>');
	});

});