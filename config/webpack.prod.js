/* global require, module */
const CopyPlugin = require('copy-webpack-plugin');

const { wordim } = require('./wordim');
const { plainFlashCards } = require('./plainFlashCards');
const { toCSV } = require('./toCSV');

const units = [
  'more1-unit01',
  'more1-unit02',
  'more1-unit03',
  'more1-unit04',
  'more1-unit05',
  'more1-unit06',
  'more1-unit07',
  'more1-unit08',
  'more1-unit09',
  'more1-unit10',
];

const versions = [
  {
    name: 'wordim',
    extension: 'wordim',
    transform: (content, file) => wordim(content),
  },
  {
    name: 'csv-file-example',
    extension: 'csv',
    transform: (content, file) => toCSV(content, true),
  },
  {
    name: 'plain-flashcards',
    extension: 'json',
    transform: (content, file) => plainFlashCards(content, file),
  },
  {
    name: 'csv-file',
    extension: 'csv',
    transform: (content, file) => toCSV(content),
  },
  {
    name: 'text-file',
    extension: 'txt',
    transform: (content, file) => toCSV(content),
  },
];

const patterns = [];
units.forEach((file) => {
  versions.forEach((version) => {
    patterns.push({
      from: './src/' + file + '.json',
      to: './' + version.name + '/' + file + '.' + version.extension,
      transform: (content) => version.transform(content, file)
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
