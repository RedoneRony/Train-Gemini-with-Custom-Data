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


// count number of sentences

const viewNumberOfSentences = asyncHandler(async (req, res) => {
  fs.readFile('./controllers/sample.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error reading file" });
    }
    try {
      // Count the number of sentences
      const numberOfSentences = (data.match(/[.!?]+/g) || []).length;

      return res.status(200).json({ result: `Total number of sentences: ${numberOfSentences}` });
    } catch (err) {
      console.error("Error counting sentences:", err);
      return res.status(500).json({ message: "Error counting sentences" });
    }
  });
});

// count number of paragraphs

const viewNumberOfParagraphs = asyncHandler(async (req, res) => {
  fs.readFile('./controllers/sample.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error reading file" });
    }
    try {
      // Count the number of paragraphs
      const numberOfParagraphs = (data.split(/\n\s*\n/g) || []).length;

      return res.status(200).json({ result: `Total number of paragraphs: ${numberOfParagraphs}` });
    } catch (err) {
      console.error("Error counting paragraphs:", err);
      return res.status(500).json({ message: "Error counting paragraphs" });
    }
  });
});

// return longest words in the paragraphs
const viewLongestWordsInParagraphs = asyncHandler(async (req, res) => {
  fs.readFile('./controllers/sample.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error reading file" });
    }
    try {
      // Split the text into paragraphs
      const paragraphs = data.split(/\n\s*\n/g);

      // Initialize an array to store the longest words in each paragraph
      const longestWordsInParagraphs = [];

      // Iterate through each paragraph
      for (const paragraph of paragraphs) {
        // Split the paragraph into words
        const words = paragraph.split(/\s+/);

        // Find the longest word in the paragraph
        let longestWord = "";
        for (const word of words) {
          if (word.length > longestWord.length) {
            longestWord = word;
          }
        }

        // Add the longest word to the array
        longestWordsInParagraphs.push(longestWord);
      }

      return res.status(200).json({ result: longestWordsInParagraphs });
    } catch (err) {
      console.error("Error finding longest words in paragraphs:", err);
      return res.status(500).json({ message: "Error finding longest words in paragraphs" });
    }
  });
});



export {
  viewNumberOfWords,
  viewNumberOfCharacters,
  viewNumberOfSentences,
  viewNumberOfParagraphs,
  viewLongestWordsInParagraphs
};
