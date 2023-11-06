/* global module */

const makeid = (length) => {
  let result = '';
  const characters = 'abcdef0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

module.exports = {
  wordim: (buffer) => {
    // copy-webpack-plugin passes a buffer
    const data = JSON.parse(buffer.toString());
    let wordIm = {
      groups: [
        {
          id: makeid(24),
          name: data.name,
          date: new Date().toISOString(),
          words: [],
        },
      ],
    };

    // change values here
    const date = new Date().toISOString();
    const groupId = makeid(24);

    data.words.forEach((word) => {
      const newWord = {
        id: makeid(24),
        date,
        word: {
          word: word.de,
          language: 'de',
        },
        translation: {
          word: word.en,
          language: 'en',
        },
        hint: word.example,
        groupId: groupId,
      };
      wordIm.groups[0].words.push(newWord);
    });

    // pretty print to JSON with two spaces
    const jsonData = JSON.stringify(wordIm, null, 2);
    return jsonData;
  },
};
