import React, { useEffect, useRef } from "react";
import quill from "quill";

const AddJob = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  return (
    <section>
      <div>
        {/* Job Title */}
        <div className="mb-6">
          <label className="block text-gray-800 text-lg font-semibold mb-3 pb-1 border-b border-gray-200">
            Job Title
          </label>
          <input
            type="text"
            placeholder="Enter job title"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Job Description */}
        <div className="mb-6">
          <label className="block text-gray-800 text-lg font-semibold mb-3 pb-1 border-b border-gray-200">
            Job Description
          </label>
          <div ref={editorRef}></div>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Job Category */}
          <div>
            <label className="block text-gray-800 text-lg font-semibold mb-3 pb-1 border-b border-gray-200">
              Job Category
            </label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">Select category</option>
              <option value="">Programming</option>
              <option value="">Data Science</option>
              <option value="">Designing</option>
              <option value="">Networking</option>
              <option value="">Management</option>
              <option value="">Marketing</option>
              <option value="">Cybersecurity</option>
            </select>
          </div>

          {/* Job Location */}
          <div>
            <label className="block text-gray-800 text-lg font-semibold mb-3 pb-1 border-b border-gray-200">
              Job Location
            </label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">Select location</option>
              <option value="">Dhaka</option>
              <option value="">Rangpur</option>
              <option value="">Barishal</option>
              <option value="">Khulna</option>
              <option value="">Mymensingh</option>
              <option value="">Rajshahi</option>
              <option value="">Sylhet</option>
            </select>
          </div>

          {/* Job Level */}
          <div>
            <label className="block text-gray-800 text-lg font-semibold mb-3 pb-1 border-b border-gray-200">
              Job Level
            </label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">Select level</option>
              <option value="">Beginner</option>
              <option value="">Intermediate</option>
              <option value="">Senior</option>
            </select>
          </div>

          {/* Salary */}
          <div>
            <label className="block text-gray-800 text-lg font-semibold mb-3 pb-1 border-b border-gray-200">
              Salary
            </label>
            <input
              type="text"
              placeholder="Enter salary range"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors shadow-md">
          Add Job
        </button>
      </div>
    </section>
  );
};

export default AddJob;
