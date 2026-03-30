import { defineConfig } from '@rslib/core';

export default defineConfig({
  tools: {
    rspack: {
      resolve: {
        alias: {
          'supports-color': new URL(
            './src/mocks/supports-color.js',
            import.meta.url,
          ).pathname,
        },
      },
    },
  },
  lib: [
    {
      source: { entry: { index: './src/index.ts' } },
      bundle: true,
      format: 'cjs',
      output: {
        distPath: { root: './dist' },
        filename: { js: 'index.js' },
      },
    },
  ],
  output: {
    target: 'node',
  },
});
