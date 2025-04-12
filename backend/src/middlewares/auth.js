import jwt from "jsonwebtoken";
import Company from "../models/Company.js";

const protectedCompany = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized, please login again",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const company = await Company.findById(decoded.id).select("-password");

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    req.company = company;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      success: false,
      message: "Unauthorized, please login again",
    });
  }
};

export default protectedCompany;
