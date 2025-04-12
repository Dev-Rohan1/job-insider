import mongoose from "mongoose";

const companySchema = mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Company = mongoose.model("Company", companySchema);

export default Company;
