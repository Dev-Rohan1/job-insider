import companyModel from "../models/company.js";

const companyController = async (req, res) => {
  try {
    const { name } = req.body;

    // Create a new company instance and save it
    const newCompany = new companyModel({ name });
    await newCompany.save();

    // Send the saved company as response
    res.status(201).json({ company: newCompany });
  } catch (error) {
    console.error("Error creating company:", error);
    res
      .status(500)
      .json({ message: "Failed to create company", error: error.message });
  }
};

export default companyController;
