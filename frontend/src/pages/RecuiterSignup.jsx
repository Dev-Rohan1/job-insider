import React, { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Upload, Briefcase, Mail, Lock, X } from "lucide-react";
import { Link } from "react-router-dom";

const RecruiterSignup = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.match("image.*")) {
        alert("Please select an image file (JPEG, PNG)");
        return;
      }

      // Validate file size (e.g., 2MB max)
      if (file.size > 2 * 1024 * 1024) {
        alert("Image size should be less than 2MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <Navbar />
      <section className="flex items-center justify-center min-h-[calc(100vh-140px)]">
        <div className="w-full max-w-md px-4 space-y-8">
          <form className="mt-8 space-y-6 p-8 rounded-xl border border-gray-200 shadow-sm transition-shadow duration-300">
            <div className="text-center">
              <h2 className="text-[25px] font-bold text-gray-700">
                Recruiter Sign Up
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Welcome back! Please sign in to continue
              </p>
            </div>

            {/* Company Logo Upload Section */}
            <div className="flex flex-col items-center space-y-3 ">
              <label
                htmlFor="company-logo"
                className={`relative w-30 h-30 rounded-lg bg-gray-50 border-2 border-dashed ${
                  previewImage ? "border-transparent" : "border-gray-300"
                } flex flex-col items-center justify-center cursor-pointer overflow-hidden group`}
                onClick={triggerFileInput}
              >
                {previewImage ? (
                  <>
                    <img
                      src={previewImage}
                      alt="Company logo preview"
                      className="w-full p-5 h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    >
                      <X className="h-4 w-4 text-gray-600" />
                    </button>
                  </>
                ) : (
                  <div className="text-center p-4 group-hover:bg-gray-100 transition-colors rounded-lg">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <span className="text-sm font-medium text-gray-600">
                      Upload Logo
                    </span>
                    <span className="text-xs text-gray-500 block mt-1">
                      Click to browse
                    </span>
                  </div>
                )}
                <input
                  type="file"
                  id="company-logo"
                  ref={fileInputRef}
                  accept="image/png, image/jpeg, image/jpg"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
              <p className="text-xs text-gray-500 text-center">
                Recommended: Square image, 500x500px, JPG/PNG format (Max 2MB)
              </p>
            </div>

            {/* Form fields */}
            <div className="space-y-5">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Briefcase className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  placeholder="Company Name"
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  placeholder="Email id"
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-gray-700">
                  I agree to the{" "}
                  <a href="#" className="text-blue-600 hover:text-blue-500">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-600 hover:text-blue-500">
                    Privacy Policy
                  </a>
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Create Account
              </button>
              <p className="text-sm text-gray-600 text-center">
                Already have an account?{" "}
                <Link
                  to="/recuiter-login"
                  className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
                >
                  Log In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default RecruiterSignup;
