/// <reference types="vitest/globals" />
import '@testing-library/jest-dom/vitest';
// @ts-expect-error TS2882: Cannot find module or type declarations for side-effect import of ./src/resize-handle.css
import './src/resize-handle.css';