import express from "express";

import {
  viewNumberOfWords,
  viewNumberOfCharacters,
  viewNumberOfSentences,
  viewNumberOfParagraphs,
  viewLongestWordsInParagraphs
} from "../controllers/mainController.js";


const router = express.Router();

// routes
router
  .route("/get-word-counts")
  .get(viewNumberOfWords);

router
  .route("/get-character-counts")
  .get(viewNumberOfCharacters);

router
  .route("/get-sentence-counts")
  .get(viewNumberOfSentences);

router
  .route("/get-paragraph-counts")
  .get(viewNumberOfParagraphs);

router
  .route("/get-longest-word-in-paragraph-counts")
  .get(viewLongestWordsInParagraphs);
export default router;
