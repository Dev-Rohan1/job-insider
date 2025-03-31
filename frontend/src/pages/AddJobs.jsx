import React, { useContext, useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { JobCategories, JobLocations } from "../assets/assets";
import { AppContext } from "../contexts/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const AddJobs = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const { backendUrl, companyToken } = useContext(AppContext);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Programming");
  const [location, setLocation] = useState("Bangladesh");
  const [level, setLevel] = useState("Junior Level");
  const [salary, setSalary] = useState("");

  const addJobHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${backendUrl}/company/post-job`,
        {
          title,
          category,
          location,
          level,
          salary,
          description: quillRef.current.root.innerHTML,
        },
        {
          headers: {
            token: companyToken,
          },
        },
      );

      if (data.success) {
        toast.success(data.message);
        setTitle("");
        setCategory("Programming");
        setLocation("Bangladesh");
        setLevel("Junior Level");
        quillRef.current.root.innerHTML = "";
        setSalary("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
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
      <form onSubmit={addJobHandler} className="space-y-6">
        <div className="space-y-1">
          <label htmlFor="jobTitle" className="block font-medium">
            Job Title
          </label>
          <input
            id="jobTitle"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
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
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="w-full rounded border border-gray-300 p-2"
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
              onChange={(e) => setLocation(e.target.value)}
              value={location}
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
              onChange={(e) => setLevel(e.target.value)}
              value={level}
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
            required
            id="salary"
            type="number"
            placeholder="Salary"
            onChange={(e) => setSalary(e.target.value)}
            value={salary || ""}
            className="w-full rounded border border-gray-300 p-2"
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
