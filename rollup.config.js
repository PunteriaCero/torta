import styles from 'rollup-plugin-styles';
const autoprefixer = require('autoprefixer');
import babel from '@rollup/plugin-babel';
import sourcemaps from 'rollup-plugin-sourcemaps'; // Add this import

// the entry point for the library
const input = 'src/index.js';

//
var MODE = [
  {
    fomart: 'cjs',
  },
  {
    fomart: 'esm',
  },
  {
    fomart: 'umd',
  },
];

var config = [];

MODE.map((m) => {
  var conf = {
    input: input,
    output: {
      // then name of your package
      name: 'react-awesome-buttons',
      file: `dist/index.${m.fomart}.js`,
      format: m.fomart,
      exports: 'auto',
    },
    // this externelizes react to prevent rollup from compiling it
    external: [
      'react',
      'react-dom',
      'redux',
      'react-redux',
      '@reduxjs/toolkit',
      /@babel\/runtime/,
    ],
    plugins: [
      // these are babel comfigurations
      babel({
        exclude: 'node_modules/**',
        plugins: ['@babel/transform-runtime'],
        babelHelpers: 'runtime',
      }),
      // this adds sourcemaps
      sourcemaps(),
      // this adds support for styles
      styles({
        postcss: {
          plugins: [autoprefixer()],
        },
      }),
    ],
  };
  config.push(conf);
});

export default [...config];
