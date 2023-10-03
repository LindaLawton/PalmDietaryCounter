const express = require('express');
const router = express.Router();

// Load the palm api key from settings.
const { palmApiKey } = require('../config');

// PALM API
const { TextServiceClient } = require("@google-ai/generativelanguage");
const { GoogleAuth } = require("google-auth-library");

const MODEL_NAME = "models/text-bison-001";

const client = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(palmApiKey),
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Palm respond with a resource');
});

// Define the POST endpoint for receiving text data
router.post("/", (req, res) => {

  const input = req.body.text; // Get the text from the request body

  const promptString = `You are going to help a user track what they eat.  You should ignore items that are not edible.  Please return the results in the following JSon format.   Total is the value for that food_item, amount relates to the amount eaten.  Type is what we are tracking.  
    { 
      "items" : [ {
          "food_item" : "Milk",
          "amount" : { "unit_of_measure" : "cup", "amount: 1 },
          "total": 10
        },
    "total_calories_consumed" : 15,
    "type" : "calories"
    ]}
    You will find the information needed in the following text '${input}'`;
  const stopSequences = [];
  client.generateText({
    // required, which model to use to generate the result
    model: MODEL_NAME,
    // optional, 0.0 always uses the highest-probability result
    temperature: 0.7,
    // optional, how many candidate results to generate
    candidateCount: 1,
    prompt: {
      text: promptString,
    },
  }).then(result => {
    res.json({ message: result });
  }).catch(error => {
    //console.error("Error:", error.message);
    res.json({ message: [ error.message ]});
  });
});

module.exports = router;
