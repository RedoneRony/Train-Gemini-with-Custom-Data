import express from "express";

import {
  trainAndResponseDataByGemini,
} from "../controllers/mainController.js";


const router = express.Router();

// routes
router
  .route("/get-gemini-data")
  .post(trainAndResponseDataByGemini);


export default router;
