import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  resume: { type: String, default: "" },
  image: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

export default User;
