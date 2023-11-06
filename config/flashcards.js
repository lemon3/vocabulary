/* global module */

module.exports = {
  flashcards: (buffer) => {
    // copy-webpack-plugin passes a buffer
    const data = JSON.parse(buffer.toString());
    let csv = '';

    data.words.forEach((word) => {
      csv +=
        `"${word.de}","${word.en}` +
        ('' !== word.example ? `\r${word.example}` : '') +
        '"\r';
    });

    return csv;
  },
};
