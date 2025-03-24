import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { JobCategories, JobLocations } from "../assets/assets";

const AddJobs = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [jobTitle, setJobTitle] = useState("");
  const [JobCategory, setJobCategory] = useState("Programming");
  const [JobLocation, setJobLocation] = useState("Bangladesh");
  const [JobLevel, setJobLevel] = useState("Senior Level");
  const [salary, setSalary] = useState("");

  const handler = (e) => {
    e.preventDefault();

    if (!quillRef.current || !quillRef.current.root.innerHTML.trim()) {
      alert("Job description cannot be empty");
      return;
    }

    console.log({
      jobTitle,
      JobCategory,
      JobLocation,
      JobLevel,
      salary,
      jobDescription: quillRef.current.root.innerHTML,
    });
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Enter job description...",
      });
    }

    return () => {
      if (quillRef.current) {
        quillRef.current = null;
      }
    };
  }, []);

  return (
    <section className="mx-auto max-w-4xl">
      <form onSubmit={handler} className="space-y-6">
        <div className="space-y-1">
          <label htmlFor="jobTitle" className="block font-medium">
            Job Title
          </label>
          <input
            id="jobTitle"
            onChange={(e) => setJobTitle(e.target.value)}
            value={jobTitle}
            className="w-full rounded border border-gray-300 p-2"
            type="text"
            placeholder="Job Title"
            required
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">Job Description</label>
          <div ref={editorRef} style={{ height: "100px" }}></div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="space-y-1">
            <label htmlFor="jobCategory" className="block font-medium">
              Job Category
            </label>
            <select
              id="jobCategory"
              onChange={(e) => setJobCategory(e.target.value)}
              value={JobCategory}
              className="w-full rounded border border-gray-300 p-2"
              required
            >
              {JobCategories.map((job) => (
                <option value={job} key={job}>
                  {job}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label htmlFor="jobLocation" className="block font-medium">
              Job Location
            </label>
            <select
              id="jobLocation"
              className="w-full rounded border border-gray-300 p-2"
              required
              onChange={(e) => setJobLocation(e.target.value)}
              value={JobLocation}
            >
              {JobLocations.map((location) => (
                <option value={location} key={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label htmlFor="jobLevel" className="block font-medium">
              Job Level
            </label>
            <select
              id="jobLevel"
              className="w-full rounded border border-gray-300 p-2"
              required
              onChange={(e) => setJobLevel(e.target.value)}
              value={JobLevel}
            >
              <option value="Senior Level">Senior Level</option>
              <option value="Intermediate Level">Intermediate Level</option>
              <option value="Junior Level">Junior Level</option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="salary" className="block font-medium">
            Salary
          </label>
          <input
            id="salary"
            type="number"
            placeholder="Salary"
            onChange={(e) => setSalary(e.target.value)}
            value={salary}
            className="w-full rounded border border-gray-300 p-2"
            required
            min="0"
          />
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer rounded-md bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-500 md:w-auto"
        >
          Add Job
        </button>
      </form>
    </section>
  );
};

export default AddJobs;
