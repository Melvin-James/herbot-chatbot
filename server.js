const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const chatRoutes = require("./routes/chatRoutes");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // Serve static files (CSS, JS)

// Set EJS as the view engine
app.set("view engine", "ejs");

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB Connected"))
.catch((error) => console.error("❌ MongoDB Connection Error:", error));

// Home Route - Render Chatbot UI
app.get("/", (req, res) => {
    res.render("index"); // Render the chatbot UI
});

// Chatbot API Route
app.use("/chat", chatRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
