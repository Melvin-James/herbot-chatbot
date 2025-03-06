const mongoose = require("mongoose");
const Chat = require("./models/chatModel");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB Connected"))
.catch((error) => console.error("❌ MongoDB Connection Error:", error));

const chats = [
    { question: "What is Women's Day?", answer: "International Women's Day is a global celebration of women's achievements and a call for gender equality." },
    { question: "When is Women's Day celebrated?", answer: "Women's Day is celebrated on March 8 every year." },
    { question: "Why do we celebrate Women's Day?", answer: "To recognize women's achievements and raise awareness about gender equality." },
    { question: "What is the history of Women's Day?", answer: "Women's Day was first celebrated in 1911 and was proposed by Clara Zetkin at the 1910 International Socialist Women's Congress." },
    { question: "What color represents Women's Day?", answer: "Purple is the official color representing Women's Day, symbolizing justice and dignity." },
    { question: "What is the 2024 Women's Day theme?", answer: "The theme for International Women's Day 2024 is 'Invest in Women: Accelerate Progress'." },
    { question: "Who started Women's Day?", answer: "Clara Zetkin proposed the idea in 1910, and the first Women's Day was celebrated in 1911." },
    { question: "How can we support Women's Day?", answer: "You can support Women's Day by promoting gender equality, supporting women-led businesses, and advocating for women's rights." },
    { question: "What are some Women's Day activities?", answer: "Common activities include rallies, educational events, social media campaigns, and honoring women's achievements." },
];

const seedDB = async () => {
    await Chat.deleteMany({});  // Clear old data
    await Chat.insertMany(chats);
    console.log("✅ Database Seeded Successfully");
    mongoose.connection.close();
};

seedDB();
