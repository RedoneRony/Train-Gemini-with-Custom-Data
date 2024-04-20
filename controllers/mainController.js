import asyncHandler from "express-async-handler";
import fs from "fs";

// View Number of Words
const viewNumberOfWords = asyncHandler(async (req, res) => {

  fs.readFile('./controllers/sample.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    try {
      // remove punction from sentences
      const textWithoutPunctuation = data.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

      // Split the string into words based on spaces
      const wordsArray = textWithoutPunctuation.split(" ");

      // Count the number of words
      const numberOfWords = wordsArray.length;

      return res.status(200).json({ result: `Total number of words: ${numberOfWords}` });
    } catch (err) {
      return res.status(404).json({ message: "View number of words Not Found." });
    }
  });

});


// view number of characters
const viewNumberOfCharacters = asyncHandler(async (req, res) => {
  fs.readFile('./controllers/sample.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error reading file" });
    }
    try {
      // Remove punctuation marks using regular expressions
      const textWithoutPunctuation = data.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

      // Count the number of characters
      const numberOfCharacters = textWithoutPunctuation.length;

      return res.status(200).json({ result: `Total number of characters: ${numberOfCharacters}` });
    } catch (err) {
      console.error("Error counting characters:", err);
      return res.status(500).json({ message: "Error counting characters" });
    }
  });
});



export {
  viewNumberOfWords,
  viewNumberOfCharacters
};
