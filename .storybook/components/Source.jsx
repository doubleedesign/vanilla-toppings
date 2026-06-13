import { useState, useContext } from 'react';
import { addons } from 'storybook/preview-api';
import { Source as StorybookSource, useSourceProps, DocsContext, SourceContext } from '@storybook/addon-docs/blocks';
import { SourceType } from "storybook/internal/docs-tools";

/**
 * This component is a wrapper around Storybook's Source block that listens for story arg updates
 * to ensure that if a custom transformer is provided, the source code is updated when story args change.
 */
export function Source(props) {
	const channel = addons.getChannel();
	const docsContext = useContext(DocsContext);
	const sourceContext = useContext(SourceContext);
	const context = docsContext.getStoryContext(docsContext.storyById());
	const sourceParameters = (context?.parameters.docs?.source || {});
	const sourceProps = useSourceProps(props, docsContext, sourceContext);
	const transformer = sourceParameters.transform;
	const [code, setCode] = useState(sourceProps?.code || '');
	const [renderKey, setRenderKey] = useState(0);

	if(!transformer) {
		return <StorybookSource {...props} />;
	}

	channel.on('storyArgsUpdated', (context) => {
		const newCode = transformer(code, context);
		if(newCode !== code) {
			setCode(newCode);
			// Force re-render so Prism highlighting is applied to the new code, rather than keeping the initial code
			setRenderKey(prevKey => prevKey + 1);
		}
	});

	return (
		<StorybookSource key={renderKey} {...props} type={SourceType.DYNAMIC} code={code} />
	);
}