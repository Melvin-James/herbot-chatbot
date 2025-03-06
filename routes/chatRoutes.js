const express = require("express");
const Chat = require("../models/chatModel");
const stringSimilarity = require("string-similarity");

const router = express.Router();

router.post("/", async (req, res) => {
    const userMessage = req.body.message;
    console.log("🔍 User Message:", userMessage);

    try {
        // ✅ Step 1: Retrieve all questions from MongoDB
        const allQuestions = await Chat.find();
        const questionList = allQuestions.map(q => q.question);

        // ✅ Step 2: Find the best matching question
        const bestMatch = stringSimilarity.findBestMatch(userMessage, questionList);
        const bestQuestion = bestMatch.bestMatch.target;
        console.log("🔍 Best Matched Question:", bestQuestion);

        // ✅ Step 3: Get the answer from MongoDB
        const response = await Chat.findOne({ question: bestQuestion });

        if (response) {
            res.json({ reply: response.answer });  // ✅ Return matched answer
        } else {
            res.json({ reply: "I couldn't find an answer, but I'm learning!" });
        }
    } catch (error) {
        console.error("❌ Error:", error);
        res.status(500).json({ error: "Error processing request" });
    }
});

module.exports = router;
