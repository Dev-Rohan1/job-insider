import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("your_connection_string_here");
    console.log("✅ Database connection successful");
  } catch (error) {
    console.error("❎ Database connection failed");
  }
};

export default connectDB;
