const mongoose = require("mongoose");
const key = require("./dev");

const connectDB = async () => {
  try {
    await mongoose.connect(key.MONGO_URI, {});
    console.log("MongoDB connected");
    connectTimeoutMS: 10000;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
