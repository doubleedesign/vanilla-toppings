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

	it('ignores a standalone double quote character', () => {
		const example = document.createElement('div');
		example.setAttribute('data-testid', 'test-wrapper');
		example.innerHTML = `<p>She said, Hello."</p>`;
		document.body.appendChild(example);

		const instance = new TypographersQuotes({ selectors: ['[data-testid="test-wrapper"]'] });
		instance.apply();

		const result = screen.getByTestId('test-wrapper').innerHTML;
		expect(result).toEqual('<p>She said, Hello."</p>');
	});

	it('converts an apostrophe within a word', () => {
		const example = document.createElement('div');
		example.setAttribute('data-testid', 'test-wrapper');
		example.innerHTML = `<p>It's a test.</p>`;
		document.body.appendChild(example);

		const instance = new TypographersQuotes({ selectors: ['[data-testid="test-wrapper"]'] });
		instance.apply();

		const result = screen.getByTestId('test-wrapper').innerHTML;
		expect(result).toEqual('<p>It’s a test.</p>');
	});

	it('converts multiple apostrophes in a sentence', () => {
		const example = document.createElement('div');
		example.setAttribute('data-testid', 'test-wrapper');
		example.innerHTML = `<p>You don't have a TV? What's all your furniture pointed at?</p>`;
		document.body.appendChild(example);

		const instance = new TypographersQuotes({ selectors: ['[data-testid="test-wrapper"]'] });
		instance.apply();

		const result = screen.getByTestId('test-wrapper').innerHTML;
		expect(result).toEqual('<p>You don’t have a TV? What’s all your furniture pointed at?</p>');
	});

	it('converts multiple apostrophes in a sentence wrapped in double quotes', () => {
		const example = document.createElement('div');
		example.setAttribute('data-testid', 'test-wrapper');
		example.innerHTML = `<p>"You don't have a TV? What's all your furniture pointed at?"</p>`;
		document.body.appendChild(example);

		const instance = new TypographersQuotes({ selectors: ['[data-testid="test-wrapper"]'] });
		instance.apply();

		const result = screen.getByTestId('test-wrapper').innerHTML;
		expect(result).toEqual('<p>“You don’t have a TV? What’s all your furniture pointed at?”</p>');
	});

	it('converts an apostrophe after an S at the end of a word', () => {
		const example = document.createElement('div');
		example.setAttribute('data-testid', 'test-wrapper');
		example.innerHTML = `<p>James' book.</p>`;
		document.body.appendChild(example);

		const instance = new TypographersQuotes({ selectors: ['[data-testid="test-wrapper"]'] });
		instance.apply();

		const result = screen.getByTestId('test-wrapper').innerHTML;
		expect(result).toEqual('<p>James’ book.</p>');
	});

	it('converts a single quote at the beginning of a word', () => {
		const example = document.createElement('div');
		example.setAttribute('data-testid', 'test-wrapper');
		example.innerHTML = `<p>&nbsp;'Tis the season.</p>`;
		document.body.appendChild(example);

		const instance = new TypographersQuotes({ selectors: ['[data-testid="test-wrapper"]'] });
		instance.apply();

		const result = screen.getByTestId('test-wrapper').innerHTML;
		expect(result).toEqual('<p>&nbsp;’Tis the season.</p>');
	});

	it('converts a single quote at the beginning of a word that is the first character in the element', () => {
		const example = document.createElement('div');
		example.setAttribute('data-testid', 'test-wrapper');
		example.innerHTML = `<p>'Tis the season.</p>`;
		document.body.appendChild(example);

		const instance = new TypographersQuotes({ selectors: ['[data-testid="test-wrapper"]'] });
		instance.apply();

		const result = screen.getByTestId('test-wrapper').innerHTML;
		expect(result).toEqual('<p>’Tis the season.</p>');
	});

	it('ignores double quotes if they are within a <code> element', () => {
		const example = document.createElement('div');
		example.setAttribute('data-testid', 'test-wrapper');
		example.innerHTML = `<p>Here is some code: <code>"const x = 10;"</code></p>`;
		document.body.appendChild(example);

		const instance = new TypographersQuotes({ selectors: ['[data-testid="test-wrapper"]'] });
		instance.apply();

		const result = screen.getByTestId('test-wrapper').innerHTML;
		expect(result).toEqual('<p>Here is some code: <code>"const x = 10;"</code></p>');
	});

	it('ignores single quotes if they are within a <code> element', () => {
		const example = document.createElement('div');
		example.setAttribute('data-testid', 'test-wrapper');
		example.innerHTML = `<p>Here is some code: <code>const message = 'Hello';</code></p>`;
		document.body.appendChild(example);

		const instance = new TypographersQuotes({ selectors: ['[data-testid="test-wrapper"]'] });
		instance.apply();

		const result = screen.getByTestId('test-wrapper').innerHTML;
		expect(result).toEqual('<p>Here is some code: <code>const message = \'Hello\';</code></p>');
	});

	it('ignores double quotes if they are within a <pre> element', () => {
		const example = document.createElement('div');
		example.setAttribute('data-testid', 'test-wrapper');
		example.innerHTML = `<p>Here is some code:</p><pre>"const x = 10;"</pre>`;
		document.body.appendChild(example);

		const instance = new TypographersQuotes({ selectors: ['[data-testid="test-wrapper"]'] });
		instance.apply();

		const result = screen.getByTestId('test-wrapper').innerHTML;
		expect(result).toEqual('<p>Here is some code:</p><pre>"const x = 10;"</pre>');
	});

	it('ignores single quotes if they are within a <pre> element', () => {
		const example = document.createElement('div');
		example.setAttribute('data-testid', 'test-wrapper');
		example.innerHTML = `<p>Here is some code:</p><pre>const message = 'Hello';</pre>`;
		document.body.appendChild(example);

		const instance = new TypographersQuotes({ selectors: ['[data-testid="test-wrapper"]'] });
		instance.apply();

		const result = screen.getByTestId('test-wrapper').innerHTML;
		expect(result).toEqual('<p>Here is some code:</p><pre>const message = \'Hello\';</pre>');
	});  
});