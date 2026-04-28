import { addons } from 'storybook/manager-api';
import { themes } from 'storybook/theming';
import { doubleeTheme } from '@doubleedesign/doublee-site-style';
import './manager.css';

const mergedTheme = {
	...themes.light,
	...doubleeTheme
};

addons.setConfig({
	theme: mergedTheme,
});