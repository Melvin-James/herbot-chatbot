require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

if (!uri) {
    console.error("❌ ERROR: MONGO_URI is not defined. Check your .env file.");
    process.exit(1);
}

const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            tls: true, // Ensure secure connection
            tlsAllowInvalidCertificates: false, // Don't allow invalid certs
            serverSelectionTimeoutMS: 5000, // Reduce wait time
            connectTimeoutMS: 10000, // Increase connection timeout
        });

        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
