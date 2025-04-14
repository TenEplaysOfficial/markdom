import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import json from '@rollup/plugin-json';
import packageJson from './package.json';

export default [
  {
    input: 'lib/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: false,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: false,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      terser(),
      postcss(),
    ],
  },
  {
    input: 'lib/cli.ts',
    output: {
      file: 'dist/cli.js',
      format: 'cjs',
    },
    onwarn(warning, warn) {
      if (warning.code === 'THIS_IS_UNDEFINED') return;
      warn(warning);
    },
    plugins: [
      resolve(),
      commonjs(),
      json(),
      terser(),
      typescript({ tsconfig: './tsconfig.json' }),
    ],
  },
  {
    input: 'lib/index.ts',
    output: [{ file: packageJson.types }],
    plugins: [dts.default()],
    external: (id) => id.endsWith('.css'),
  },
];
