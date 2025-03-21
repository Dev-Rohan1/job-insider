import { X, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useContext, useState } from "react";

import { JobCategories, JobLocations } from "../assets/assets";
import { AppContext } from "../contexts/AppContext";
import JobList from "./JobList";

const JobListing = () => {
  const { searchFilter, setSearchFilter, isSearched, setIsSearched, jobs } =
    useContext(AppContext);

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const handleRemoveFilter = (key) => {
    setSearchFilter((prev) => {
      const updatedFilter = { ...prev, [key]: "" };
      if (!updatedFilter.title && !updatedFilter.location) {
        setIsSearched(false);
      }
      return updatedFilter;
    });
  };

  return (
    <section className="mt-16">
      <div className="flex w-full flex-col justify-between gap-10 lg:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-[25%]">
          {isSearched && (
            <div className="mb-7">
              <h2 className="mb-3 text-xl font-semibold lg:text-2xl">
                Current Search
              </h2>
              <div className="flex flex-wrap items-center gap-3">
                {searchFilter.title && (
                  <span className="flex items-center gap-1 rounded border border-blue-300 bg-blue-50 px-3 py-1 text-gray-800">
                    <p>{searchFilter.title}</p>
                    <X
                      onClick={() => handleRemoveFilter("title")}
                      className="cursor-pointer"
                      size={18}
                    />
                  </span>
                )}
                {searchFilter.location && (
                  <span className="flex items-center gap-1 rounded border border-red-300 bg-red-50 px-3 py-1 text-gray-800">
                    <p>{searchFilter.location}</p>
                    <X
                      onClick={() => handleRemoveFilter("location")}
                      className="cursor-pointer"
                      size={18}
                    />
                  </span>
                )}
              </div>
            </div>
          )}

          <div>
            <h2 className="mb-3 text-xl font-semibold lg:text-2xl">
              Search by Categories
            </h2>
            <ul>
              {JobCategories.map((category, index) => (
                <li key={index} className="mb-2">
                  <label className="flex items-center gap-1">
                    <input type="checkbox" />
                    {category}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-7">
            <h2 className="mb-3 text-xl font-semibold lg:text-2xl">
              Search by Location
            </h2>
            <ul>
              {JobLocations.map((location, index) => (
                <li key={index} className="mb-2">
                  <label className="flex items-center gap-1">
                    <input type="checkbox" />
                    {location}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Job List */}
        <div className="w-full">
          <h1 className="mb-2 text-2xl font-semibold text-gray-800 md:text-3xl">
            Latest jobs
          </h1>
          <p>Get your desired job from top companies</p>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {jobs
              .slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage)
              .map((job, index) => (
                <JobList key={index} job={job} />
              ))}
          </div>

          {/* Pagination */}
          {jobs.length > 0 && (
            <div className="mt-8 mb-10 flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                className="cursor-pointer"
              >
                <ChevronLeft />
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <div className="flex flex-wrap">
                  {" "}
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded border border-gray-300 text-lg outline-none ${
                      index + 1 === currentPage
                        ? "bg-blue-100 text-blue-500"
                        : ""
                    }`}
                  >
                    {index + 1}
                  </button>
                </div>
              ))}
              <button
                onClick={() =>
                  setCurrentPage(Math.min(currentPage + 1, totalPages))
                }
                className="cursor-pointer"
              >
                <ChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobListing;
