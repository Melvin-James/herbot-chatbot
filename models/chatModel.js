const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    question: { type: String, required: true, unique: true },
    answer: { type: String, required: true },
});

const Chat = mongoose.model("chat", chatSchema);

module.exports = Chat;

