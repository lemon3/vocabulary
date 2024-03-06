/* global require, module */
const CopyPlugin = require('copy-webpack-plugin');
const AdmZip = require('adm-zip');
const fs = require('fs');

const { wordim } = require('./wordim');
const { amazingFlashCards } = require('./amazingFlashCards');
const { flashCards } = require('./flashCards');
const { simpleAnki } = require('./simpleAnki');

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
    name: 'amazing-flash-cards',
    extension: 'csv',
    transform: (content, file) => amazingFlashCards(content),
  },
  {
    name: 'plain-flashcards',
    extension: 'zip',
    transform: (content, file) => {
      const json = flashCards(content);
      const zip = new AdmZip();
      zip.addFile(`${file}.json`, Buffer.from(json, 'utf8'));
      return zip.toBuffer();
    },
  },
  {
    name: 'simple-anki',
    extension: 'csv',
    transform: (content, file) => simpleAnki(content),
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
