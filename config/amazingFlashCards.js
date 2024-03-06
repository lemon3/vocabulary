/* global module */

module.exports = {
  amazingFlashCards: (buffer) => {
    // copy-webpack-plugin passes a buffer
    const data = JSON.parse(buffer.toString());
    let csv = '';

    data.words.forEach((word) => {
      csv +=
        `"${word.de}","${word.en}` +
        ('' !== word.example ? `\r\n\r\n- ${word.example}` : '') +
        '"\r\n';
    });

    return csv;
  },
};
