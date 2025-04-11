import { ChevronLeft, ChevronRight, X } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { JobCategories, JobLocations } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import JobList from "./JobList";
import Loader from "./Loader";

const JobListing = () => {
  const { isSearched, setIsSearched, searchFilter, setSearchFilter, jobs } =
    useContext(AppContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  // Update filteredJobs whenever the searchFilter or selected filters change
  useEffect(() => {
    if (jobs) {
      let filtered = jobs;

      // Apply title filter
      if (searchFilter.title) {
        filtered = filtered.filter((job) =>
          job.title.toLowerCase().includes(searchFilter.title.toLowerCase())
        );
      }

      // Apply location filter (from searchFilter)
      if (searchFilter.location) {
        filtered = filtered.filter((job) =>
          job.location
            .toLowerCase()
            .includes(searchFilter.location.toLowerCase())
        );
      }

      // Apply category filter
      if (selectedCategory.length > 0) {
        filtered = filtered.filter((job) =>
          selectedCategory.includes(job.category)
        );
      }

      // Apply location filter (from selectedLocation)
      if (selectedLocation.length > 0) {
        filtered = filtered.filter((job) =>
          selectedLocation.includes(job.location)
        );
      }

      // Set filtered jobs
      setFilteredJobs(filtered);

      // Reset to page 1 when filters change
      setCurrentPage(1);
    }
  }, [searchFilter, selectedCategory, selectedLocation, jobs]);

  const clearTitle = () => {
    setSearchFilter((prev) => ({ ...prev, title: "" }));
  };

  const clearLocation = () => {
    setSearchFilter((prev) => ({ ...prev, location: "" }));
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const handleLocationChange = (location) => {
    setSelectedLocation((prev) =>
      prev.includes(location)
        ? prev.filter((item) => item !== location)
        : [...prev, location]
    );
  };

  const showFilterHandler = () => {
    setShowFilter(!showFilter);
  };

  return (
    <section className="mt-16 mb-20">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-[25%]">
          {isSearched &&
            (searchFilter.title !== "" || searchFilter.location !== "") && (
              <div className="mb-5">
                <h3 className="text-xl font-medium">Current Search</h3>
                <div className="flex items-center gap-3 flex-wrap mt-4">
                  {searchFilter.title !== "" && (
                    <span className="flex items-center gap-1.5 border border-blue-300 bg-blue-50 rounded px-2 py-1">
                      {searchFilter.title}
                      <X
                        onClick={clearTitle}
                        size={18}
                        className="cursor-pointer"
                      />
                    </span>
                  )}
                  {searchFilter.location !== "" && (
                    <span className="flex items-center gap-1.5 border border-red-300 bg-red-50 rounded px-2 py-1">
                      {searchFilter.location}
                      <X
                        size={18}
                        onClick={clearLocation}
                        className="cursor-pointer"
                      />
                    </span>
                  )}
                </div>
              </div>
            )}
          <button
            onClick={showFilterHandler}
            className="border mb-5 md:hidden cursor-pointer border-gray-300 rounded px-8 py-1.5"
          >
            {showFilter ? "Close" : "Search by filters"}
          </button>
          <div className="hidden md:block">
            <div>
              <h3 className="text-xl font-medium">Search by Categories</h3>
              <ul className="mt-4">
                {JobCategories.map((category, index) => (
                  <label key={index}>
                    <li className="mb-2 cursor-pointer flex items-center gap-1">
                      <input
                        type="checkbox"
                        checked={selectedCategory.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                      />
                      {category}
                    </li>
                  </label>
                ))}
              </ul>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-medium">Search by Location</h3>
              <ul className="mt-4">
                {JobLocations.map((location, index) => (
                  <label key={index}>
                    <li className="mb-2 cursor-pointer flex items-center gap-1">
                      <input
                        type="checkbox"
                        checked={selectedLocation.includes(location)}
                        onChange={() => handleLocationChange(location)}
                      />
                      {location}
                    </li>
                  </label>
                ))}
              </ul>
            </div>
          </div>
          {showFilter && (
            <div className="md:hidden">
              <div>
                <h3 className="text-xl font-medium">Search by Categories</h3>
                <ul className="mt-4">
                  {JobCategories.map((category, index) => (
                    <label key={index}>
                      <li className="mb-2 cursor-pointer flex items-center gap-1">
                        <input
                          type="checkbox"
                          checked={selectedCategory.includes(category)}
                          onChange={() => handleCategoryChange(category)}
                        />
                        {category}
                      </li>
                    </label>
                  ))}
                </ul>
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-medium">Search by Location</h3>
                <ul className="mt-4">
                  {JobLocations.map((location, index) => (
                    <label key={index}>
                      <li className="mb-2 cursor-pointer flex items-center gap-1">
                        <input
                          type="checkbox"
                          checked={selectedLocation.includes(location)}
                          onChange={() => handleLocationChange(location)}
                        />
                        {location}
                      </li>
                    </label>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* job list */}
        {filteredJobs.length > 0 ? (
          <div className="w-full">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-2">
              Latest Jobs
            </h1>
            <p className="mb-8 text-gray-700">
              Get your desired job from top companies
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredJobs
                .slice()
                .reverse()
                .slice((currentPage - 1) * 6, currentPage * 6)
                .map((job, index) => (
                  <JobList job={job} key={index} />
                ))}
            </div>

            {filteredJobs.length > 0 && (
              <div className="flex items-center justify-center mt-10 gap-4">
                {/* Previous Button */}
                <ChevronLeft
                  className={`cursor-pointer ${
                    currentPage === 1 ? "text-gray-300 cursor-not-allowed" : ""
                  }`}
                  onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                />

                {/* Pagination Buttons */}
                <div className="flex items-center gap-2">
                  {Array.from({
                    length: Math.ceil(filteredJobs.length / 6),
                  }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`w-10 h-10 rounded cursor-pointer border ${
                        currentPage === index + 1
                          ? "bg-blue-50 border-blue-300 text-blue-600"
                          : "border-gray-300 text-gray-700"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                {/* Next Button */}
                <ChevronRight
                  className={`cursor-pointer ${
                    currentPage === Math.ceil(filteredJobs.length / 6)
                      ? "text-gray-300 cursor-not-allowed"
                      : ""
                  }`}
                  onClick={() =>
                    setCurrentPage(
                      Math.min(
                        currentPage + 1,
                        Math.ceil(filteredJobs.length / 6)
                      )
                    )
                  }
                />
              </div>
            )}
          </div>
        ) : (
          <div className="h-full w-full mt-20  flex items-center justify-center">
            <Loader />
          </div>
        )}
      </div>
    </section>
  );
};

export default JobListing;
