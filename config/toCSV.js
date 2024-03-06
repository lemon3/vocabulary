/* global module */

module.exports = {
  toCSV: (buffer, withExample = false) => {
    // copy-webpack-plugin passes a buffer
    const data = JSON.parse(buffer.toString());
    let csv = '';
    let fun;

    if (withExample) {
      fun = (word) => {
        csv +=
          `"${word.de}","${word.en}` +
          ('' !== word.example ? `\r\n\r\n- ${word.example}` : '') +
          '"\r\n';
      };
    } else {
      fun = (word) => {
        csv +=
          `"${word.de}";"${word.en}"`+'\r';
      };
    }

    data.words.forEach(fun);

    return csv;
  },
};
