import type { PartialStoryFn, StoryContext } from 'storybook/internal/csf';
import { compileString, type Importer } from 'sass';
// @ts-expect-error TS2307: Cannot find module ../hover.scss?raw or its corresponding type declarations.
import hoverSource from '../src/hover.scss?raw';

// @ts-expect-error TS2339: Property glob does not exist on type ImportMeta
const scssModules = import.meta.glob('../tests/assets/*.scss', {
	query: '?raw',
	import: 'default',
});

export const withRuntimeScss = (scssFile: string, mixin: string) => {
	return (Story: PartialStoryFn, context: StoryContext) => {
		const loader = new RuntimeScssLoader(scssFile, mixin);
		loader.compile(context.args).then((css) => {
			const style = document.createElement('style');
			style.textContent = css;
			document.head.appendChild(style);
		});

		return Story();
	};
};

class RuntimeScssLoader {
	private scssFile: string;
	private readonly mixin: string;
	private importer?: Importer;

	constructor(scssFile: string, mixin: string) {
		this.scssFile = scssFile;
		this.mixin = mixin;
		this.setupImporter();
	}

	async getRawScss(): Promise<string> {
		const key = Object.keys(scssModules).find((path) =>
			path.endsWith(`/${this.scssFile}`)
		);

		if (!key) {
			throw new Error(`SCSS file not found: ${this.scssFile}`);
		}

		return (await scssModules[key]()) as string;
	}

	setupImporter() {
		this.importer = {
			canonicalize(url, context) {
				return new URL(`memory:${url}`);
			},
			load(canonicalUrl) {
				if (canonicalUrl.pathname === 'hover') {
					return {
						contents: hoverSource,
						syntax: 'scss',
					};
				}

				return null;
			},
		};
	}

	async compile(args: Record<string, string>) {
		const rawScss = await this.getRawScss();

		const transformed = rawScss.replace(
			`@include ${this.mixin}()`,
			`@include ${this.mixin}(${Object.values(args).join(', ')})`
		);

		const result = compileString(transformed, { syntax: 'scss', importer: this.importer });

		return result.css;
	}
}