/* global module */
const AdmZip = require('adm-zip');

module.exports = {
  plainFlashCards: (buffer, file) => {
    // copy-webpack-plugin passes a buffer
    const data = JSON.parse(buffer.toString());
    let fc = {
      cards: [],
      isSpacedRepetition: true,
      isTranslationEnabled: true,
      isTutorial: false,
      name: data.name,
    };

    // change values here
    data.words.forEach((word) => {
      const newWord = {
        level: 0,
        frontText: word.de,
        // backText: word.en,
        backText: word.en +
          ('' !== word.example ? `\r\n\r\n- ${word.example}` : ''),
        completed: false,
      };
      fc.cards.push(newWord);
    });

    // pretty print to JSON with two spaces
    const jsonData = JSON.stringify(fc, null, 2);

    return jsonData;

    // create zip
    const zip = new AdmZip();
    zip.addFile(`${file}.json`, Buffer.from(jsonData, 'utf8'));
    return zip.toBuffer();
  },
};
