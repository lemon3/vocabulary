/* global module */
module.exports = {
  flashCards: (buffer) => {
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
        backText: word.en,
        completed: false,
      };
      fc.cards.push(newWord);
    });

    // pretty print to JSON with two spaces
    const jsonData = JSON.stringify(fc, null, 2);
    return jsonData;
  },
};
