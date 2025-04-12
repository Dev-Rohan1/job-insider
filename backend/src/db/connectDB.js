import mongoose from "mongoose";

const connectDB = async () => {
  mongoose
    .connect(`${process.env.MONGODB_CONNECTION_STRING}/insider-job`)
    .then(() => console.log("✅ Database connected successfully"))
    .catch((err) => {
      console.log("❎ Database connection failed");
      console.log(err);
    });
};

export default connectDB;
