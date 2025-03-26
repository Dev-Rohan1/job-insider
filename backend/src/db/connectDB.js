import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionString = process.env.DATABASE_CONNECTION_STRING;

    if (!connectionString) {
      throw new Error("Database connection string is not provided");
    }

    await mongoose.connect(`${connectionString}`);

    console.log("✅ Database connection successful");
  } catch (error) {
    console.error("❎ Database connection failed", error);
    process.exit(1);
  }
};

export default connectDB;
