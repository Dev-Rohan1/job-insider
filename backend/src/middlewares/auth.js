import jwt from "jsonwebtoken";
import Company from "../models/Company.js";

const protectCompany = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.json({ success: false, message: "Not authorized, Login again" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.company = await Company.findById(decodedToken.id).select("-password");

    next();
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export default protectCompany;
