import { addons } from 'storybook/manager-api';
import { themes } from 'storybook/theming';
import { doubleeTheme } from '@doubleedesign/doublee-site-style';
import './manager.css';
import events from 'storybook/internal/core-events';

// Log all Storybook preview events to the browser console if running in debug mode
const channel = addons.getChannel();
const isDebugMode = process.env.STORYBOOK_DEBUG?.trim() === '1' || process.env.STORYBOOK_DEBUG?.trim()?.toLowerCase() === 'true';

if(isDebugMode) {
	console.debug('[MANAGER] Ready to log events to console');
	Object.values(events).forEach((event) => {
		channel.on(event, (data) => {
			console.debug(`[MANAGER] ${event}`, data);
		});
	});
}

const mergedTheme = {
	...themes.light,
	...doubleeTheme
};

addons.setConfig({
	theme: mergedTheme,
});