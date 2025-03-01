/* global module */

module.exports = {
  toTXT: (buffer) => {
    const data = JSON.parse(buffer.toString());
    let csv = '';
    const fun = (word) => {
      // replace all ';' as it is uses for the separator
      const de = word.de.replaceAll(';', ',');
      const en = word.en.replaceAll(';', ',');
      csv +=
        `${de};${en}`+'\r\n';
    };

    data.words.forEach(fun);

    return csv;
  },
};
