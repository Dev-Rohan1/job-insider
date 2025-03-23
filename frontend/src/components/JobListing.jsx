import { ChevronLeft, ChevronRight, X } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";

import {
  JobCategories,
  JobCategoriesEmojis,
  JobLocations,
  JobLocationsEmojis,
} from "../assets/assets";
import { AppContext } from "../contexts/AppContext";
import JobList from "./JobList";

const JobListing = () => {
  const { searchFilter, setSearchFilter, isSearched, setIsSearched, jobs } =
    useContext(AppContext);

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [filterJobs, setFilterJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleCategoryChange = (category) => {
    setSelectedCategory((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category],
    );
  };

  const handleLocationChange = (location) => {
    setSelectedLocation((prev) =>
      prev.includes(location)
        ? prev.filter((item) => item !== location)
        : [...prev, location],
    );
  };

  useEffect(() => {
    if (!jobs || jobs.length === 0) return;

    const categorySearch = (job) =>
      selectedCategory.length === 0 || selectedCategory.includes(job.category);

    const locationSearch = (job) =>
      selectedLocation.length === 0 || selectedLocation.includes(job.location);

    const titleSearch = (job) =>
      !searchFilter.title ||
      job.title.toLowerCase().includes(searchFilter.title.toLowerCase());

    const searchLocation = (job) =>
      !searchFilter.location ||
      job.location.toLowerCase().includes(searchFilter.location.toLowerCase());

    const newFilteredJobs = jobs
      .slice()
      .reverse()
      .filter(
        (job) =>
          categorySearch(job) &&
          locationSearch(job) &&
          titleSearch(job) &&
          searchLocation(job),
      );

    setFilterJobs(newFilteredJobs);
    setCurrentPage(1);
    setLoading(false);
  }, [selectedCategory, selectedLocation, searchFilter, jobs]);

  const totalPages = Math.ceil(filterJobs.length / jobsPerPage);

  const handleRemoveFilter = (key) => {
    setSearchFilter((prev) => {
      const updatedFilter = { ...prev, [key]: "" };
      if (!updatedFilter.title && !updatedFilter.location) {
        setIsSearched(false);
      } else {
        setIsSearched(true);
      }
      return updatedFilter;
    });
  };

  if (loading) {
    return <p className="mt-16 text-lg">Loading jobs... ⏳</p>;
  }

  return (
    <section className="mt-16">
      <div className="flex w-full flex-col justify-between gap-10 lg:flex-row">
        <div className="w-full md:w-[25%]">
          {isSearched && (
            <div className="mb-7">
              <h2 className="mb-3 text-xl font-semibold">Current Search</h2>
              <div className="flex flex-wrap items-center gap-3">
                {searchFilter.title && (
                  <span className="flex items-center gap-1 rounded border border-blue-300 bg-blue-50 px-3 py-1 text-gray-800">
                    <p>{searchFilter.title}</p>
                    <X
                      onClick={() => handleRemoveFilter("title")}
                      className="cursor-pointer"
                      size={18}
                      aria-label="Remove title filter"
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
                      aria-label="Remove location filter"
                    />
                  </span>
                )}
              </div>
            </div>
          )}

          <div>
            <h2 className="mb-3 text-xl font-semibold">Search by Categories</h2>
            <div>
              {JobCategories.map((category, index) => (
                <span key={index}>
                  <label className="mb-2 flex items-center gap-2">
                    <input
                      type="checkbox"
                      onChange={() => handleCategoryChange(category)}
                      checked={selectedCategory.includes(category)}
                      aria-label={`Filter by ${category}`}
                    />
                    <span>{category}</span>
                    {JobCategoriesEmojis[index] && (
                      <span>{JobCategoriesEmojis[index]}</span>
                    )}
                  </label>
                </span>
              ))}
            </div>
          </div>

          <div className="mt-7">
            <h2 className="mb-3 text-xl font-semibold">Search by Location</h2>
            <div>
              {JobLocations.map((location, index) => (
                <span key={index} className="mb-2">
                  <label className="mb-2 flex items-center gap-2">
                    <input
                      type="checkbox"
                      onChange={() => handleLocationChange(location)}
                      checked={selectedLocation.includes(location)}
                      aria-label={`Filter by ${location}`}
                    />
                    <span className="flex items-center gap-2">
                      {location}
                      {JobLocationsEmojis[index] && (
                        <span>{JobLocationsEmojis[index]}</span>
                      )}
                    </span>
                  </label>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full">
          <h1 className="mb-2 text-2xl font-semibold text-gray-800 md:text-3xl">
            Latest jobs
          </h1>
          <p>Get your desired job from top companies</p>
          {filterJobs.length === 0 ? (
            <p className="mt-4 text-lg text-red-600">
              🔍 No jobs match your filters. Try adjusting your search criteria!
              🥲
            </p>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filterJobs
                .slice(
                  (currentPage - 1) * jobsPerPage,
                  currentPage * jobsPerPage,
                )
                .map((job, index) => (
                  <JobList key={index} job={job} />
                ))}
            </div>
          )}

          {filterJobs.length > 0 && (
            <div className="mt-8 mb-10 flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                className={`cursor-pointer ${
                  currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
                }`}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                <ChevronLeft />
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded border border-gray-300 text-lg outline-none ${
                    index + 1 === currentPage ? "bg-blue-100 text-blue-500" : ""
                  }`}
                  aria-label={`Page ${index + 1}`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage(Math.min(currentPage + 1, totalPages))
                }
                className={`cursor-pointer ${
                  currentPage === totalPages
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
                disabled={currentPage === totalPages}
                aria-label="Next page"
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
