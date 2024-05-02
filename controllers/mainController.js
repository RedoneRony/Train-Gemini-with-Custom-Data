import asyncHandler from "express-async-handler";
import { promises as fs } from 'fs'; // Import fs module with promises support
import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const txtPath = `./documents/documents.text`;


// Async function to process document and generate summary
async function getDocumentSummary(data) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  // Construct final prompt
  const prompt = `Generate summary based on this data ${data}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}

// View Number of Words
const trainAndResponseDataByGemini = asyncHandler(async (req, res) => {

  const query = req.body.query;

  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  try {
    let docSummary = ''; // Initialize document summary

    const data = await fs.readFile(txtPath, 'utf8');

    // Process the document if provided
    if (data) {
      // docSummary = await getDocumentSummary(data); // Get document summary
      docSummary = data;
    }

    // Construct final prompt
    let prompt;
    let text;
    let result;
    let response;
    const notFoundString = "does not";
    prompt = query + (docSummary ? ` Based on the document: ${docSummary}` : '');
    result = await model.generateContent(prompt);
    response = await result.response;
    text = response.text();

    if (text.includes(notFoundString)) {
      console.log("text");
      prompt = query;
      result = await model.generateContent(prompt);
      response = await result.response;
      text = response.text();
    }

    res.status(500).json({ result: text });
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    res.status(500).send('Failed to summarize the text');
  }

});



export {
  trainAndResponseDataByGemini,
};
