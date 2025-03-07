const express = require("express");
const Chat = require("../models/chatModel");
const stringSimilarity = require("string-similarity");

const router = express.Router();

router.post("/", async (req, res) => {
    const userMessage = req.body.message;
    console.log("🔍 User Message:", userMessage);

    // Ensure userMessage is valid
    if (!userMessage || typeof userMessage !== "string") {
        return res.status(400).json({ error: "Invalid input message" });
    }

    try {
        // ✅ Step 1: Retrieve all questions from MongoDB
        const allQuestions = await Chat.find({}, "question answer"); // Fetch only needed fields
        const questionList = allQuestions.map(q => q.question);

        // Check if we have questions in the database
        if (!questionList.length) {
            return res.json({ reply: "I don't have any questions stored yet." });
        }

        // ✅ Step 2: Find the best matching question
        const bestMatch = stringSimilarity.findBestMatch(userMessage, questionList);
        const bestQuestion = bestMatch.bestMatch.target;
        console.log("🔍 Best Matched Question:", bestQuestion);

        // ✅ Step 3: Get the answer from MongoDB
        const response = allQuestions.find(chat => chat.question === bestQuestion);

        if (response) {
            res.json({ reply: response.answer }); // ✅ Return matched answer
        } else {
            res.json({ reply: "I couldn't find an answer, but I'm learning!" });
        }
    } catch (error) {
        console.error("❌ Error:", error);
        res.status(500).json({ error: "Error processing request" });
    }
});

module.exports = router;
