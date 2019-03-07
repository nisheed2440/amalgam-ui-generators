const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { CheckerPlugin, TsConfigPathsPlugin } = require('awesome-typescript-loader');
const externals = require('./externals');

module.exports = [
  {
    entry: {
      'AmalgamTestContainer.controller': './src/AmalgamTestContainer.controller.tsx',
    },
    output: {
      filename: '[name].js',
      path: path.resolve(process.cwd(), 'dist'),
      libraryTarget: 'window',
    },
    externals,
    // Add the loader for .ts files.
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'awesome-typescript-loader',
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin([path.resolve(process.cwd(), 'dist')], {
        allowExternal: true,
      }),
      new CheckerPlugin(),
    ],
    // Currently we need to add '.ts' to the resolve.extensions array.
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
  },
  {
    entry: {
      AmalgamTestContainer: './src/AmalgamTestContainer.tsx',
    },
    output: {
      filename: '[name].js',
      path: path.resolve(process.cwd(), 'dist'),
      libraryTarget: 'commonjs2',
    },
    externals,
    // Add the loader for .ts files.
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'awesome-typescript-loader',
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin([path.resolve(process.cwd(), 'dist')], {
        allowExternal: true,
      }),
      new CheckerPlugin(),
    ],
    // Currently we need to add '.ts' to the resolve.extensions array.
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
  },
];
