import express from "express";

import {
  viewNumberOfWords,
  viewNumberOfCharacters
} from "../controllers/mainController.js";


const router = express.Router();

// routes
router
  .route("/get-word-counts")
  .get(viewNumberOfWords);

router
  .route("/get-character-counts")
  .get(viewNumberOfCharacters);

export default router;
