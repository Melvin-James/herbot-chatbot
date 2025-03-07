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
    { question: "Who was the first woman to win a Nobel Prize?", answer: "Marie Curie was the first woman to win a Nobel Prize in 1903 for Physics." },
    { question: "Who was the first female Prime Minister in the world?", answer: "Sirimavo Bandaranaike of Sri Lanka became the world’s first female Prime Minister in 1960." },
    { question: "Who was the first woman to go to space?", answer: "Valentina Tereshkova from the Soviet Union became the first woman in space in 1963." },
    { question: "Who was the first female President in the world?", answer: "Vigdís Finnbogadóttir of Iceland was the first woman elected as a head of state in 1980." },
    { question: "What are some challenges women still face today?", answer: "Women still face challenges like gender pay gaps, lack of education, workplace discrimination, gender-based violence, and underrepresentation in leadership." },
    { question: "What is the gender pay gap?", answer: "The gender pay gap refers to the difference in earnings between men and women. Women, on average, earn 20% less than men worldwide." },
    { question: "How can we support gender equality?", answer: "You can support gender equality by educating yourself, advocating for women’s rights, supporting women-led businesses, and challenging gender stereotypes." },
    { question: "Can you share an inspiring Women's Day quote?", answer: '"There is no limit to what we, as women, can accomplish." — Michelle Obama' },
    { question: "Another Women's Day quote, please!", answer: '"We realize the importance of our voices only when we are silenced." — Malala Yousafzai' }
];

const seedDB = async () => {
    await Chat.deleteMany({});  // Clear old data
    await Chat.insertMany(chats);
    console.log("✅ Database Seeded Successfully");
    mongoose.connection.close();
};

seedDB();
