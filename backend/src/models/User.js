import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  resume: { type: String, required: true },
  image: { type: String, required: true },
});

const User = mongoose.model("user", userSchema);

export default User;
