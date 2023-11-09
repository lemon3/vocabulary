/* global require, module */
const CopyPlugin = require('copy-webpack-plugin');
const { wordim } = require('./wordim');
const { amazingFlashCards } = require('./amazingFlashCards');

const units = ['more1-unit01', 'more1-unit02', 'more1-unit03'];

const versions = [
  {
    name: 'wordim',
    extension: 'wordim',
    transform: (content) => wordim(content),
  },
  {
    name: 'amazing-flash-cards',
    extension: 'csv',
    transform: (content) => amazingFlashCards(content),
  },
];

const patterns = [];
units.forEach((file) => {
  versions.forEach((version) => {
    patterns.push({
      from: './src/' + file + '.json',
      to: './' + version.name + '/' + file + '.' + version.extension,
      transform: version.transform,
    });
  });
});

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  output: {
    clean: true,
  },
  plugins: [new CopyPlugin({ patterns })],
};
