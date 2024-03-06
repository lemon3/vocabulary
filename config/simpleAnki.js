/* global module */

module.exports = {
  simpleAnki: (buffer) => {
    // copy-webpack-plugin passes a buffer
    const data = JSON.parse(buffer.toString());
    let csv = '';

    data.words.forEach((word) => {
      csv +=
        `"${word.de}";"${word.en}"`+'\r';
    });

    return csv;
  },
};
