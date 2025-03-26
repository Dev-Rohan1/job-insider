import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      `${process.env.DATABASE_CONNECTION_SATRING}/job-insider`
    );
    console.log("✅ Database connection successful");
  } catch (error) {
    console.error("❎ Database connection failed");
  }
};

export default connectDB;
