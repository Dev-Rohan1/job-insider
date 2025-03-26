import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      `${process.env.DATABASE_CONNECTION_STRING}insider-job`
    );

    console.log("✅ Database connection successful");
  } catch (error) {
    console.error("❎ Database connection failed", error);
    process.exit(1);
  }
};

export default connectDB;
