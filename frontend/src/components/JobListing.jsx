import { ChevronLeft, ChevronRight, X } from "lucide-react";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { JobCategories, JobLocations } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import JobList from "./JobList";
import Loader from "./Loader";

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter, jobs, loading } =
    useContext(AppContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);

  // Memoize filtered jobs to prevent unnecessary recalculations
  const filteredJobs = useMemo(() => {
    if (!jobs) return [];

    return jobs
      .filter((job) => {
        // Title filter
        const titleMatch = searchFilter.title
          ? job.title.toLowerCase().includes(searchFilter.title.toLowerCase())
          : true;

        // Location filter (from search input)
        const locationMatch = searchFilter.location
          ? job.location
              .toLowerCase()
              .includes(searchFilter.location.toLowerCase())
          : true;

        // Category filter
        const categoryMatch =
          selectedCategory.length > 0
            ? selectedCategory.includes(job.category)
            : true;

        // Location filter (from checkboxes)
        const locationCheckboxMatch =
          selectedLocation.length > 0
            ? selectedLocation.includes(job.location)
            : true;

        return (
          titleMatch && locationMatch && categoryMatch && locationCheckboxMatch
        );
      })
      .reverse(); // Reverse to show newest first
  }, [jobs, searchFilter, selectedCategory, selectedLocation]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredJobs]);

  const clearTitle = () => {
    setSearchFilter((prev) => ({ ...prev, title: "" }));
  };

  const clearLocation = () => {
    setSearchFilter((prev) => ({ ...prev, location: "" }));
  };

  const clearAllFilters = () => {
    setSearchFilter({ title: "", location: "" });
    setSelectedCategory([]);
    setSelectedLocation([]);
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

  const toggleFilter = () => setShowFilter(!showFilter);

  // Calculate pagination
  const jobsPerPage = 6;
  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / jobsPerPage));
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  // Render filter section (DRY principle)
  const renderFilters = () => (
    <>
      <div>
        <h3 className="text-xl font-medium">Search by Categories</h3>
        <ul className="mt-4">
          {JobCategories.map((category) => (
            <label key={category} className="block mb-2">
              <li className="cursor-pointer flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={selectedCategory.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="mr-2"
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
          {JobLocations.map((location) => (
            <label key={location} className="block mb-2">
              <li className="cursor-pointer flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={selectedLocation.includes(location)}
                  onChange={() => handleLocationChange(location)}
                  className="mr-2"
                />
                {location}
              </li>
            </label>
          ))}
        </ul>
      </div>
    </>
  );

  return (
    <section className="mt-16 mb-20">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Section */}
        <div className="w-full lg:w-[25%]">
          {isSearched &&
            (searchFilter.title ||
              searchFilter.location ||
              selectedCategory.length > 0 ||
              selectedLocation.length > 0) && (
              <div className="mb-5">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-medium">Current Filters</h3>
                  {(searchFilter.title ||
                    searchFilter.location ||
                    selectedCategory.length > 0 ||
                    selectedLocation.length > 0) && (
                    <button
                      onClick={clearAllFilters}
                      className="text-blue-600 text-sm"
                    >
                      Clear all
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-3 flex-wrap mt-4">
                  {searchFilter.title && (
                    <span className="flex items-center gap-1.5 border border-blue-300 bg-blue-50 rounded px-2 py-1">
                      {searchFilter.title}
                      <X
                        onClick={clearTitle}
                        size={18}
                        className="cursor-pointer"
                      />
                    </span>
                  )}
                  {searchFilter.location && (
                    <span className="flex items-center gap-1.5 border border-red-300 bg-red-50 rounded px-2 py-1">
                      {searchFilter.location}
                      <X
                        onClick={clearLocation}
                        size={18}
                        className="cursor-pointer"
                      />
                    </span>
                  )}
                  {selectedCategory.map((category) => (
                    <span
                      key={category}
                      className="flex items-center gap-1.5 border border-green-300 bg-green-50 rounded px-2 py-1"
                    >
                      {category}
                      <X
                        onClick={() => handleCategoryChange(category)}
                        size={18}
                        className="cursor-pointer"
                      />
                    </span>
                  ))}
                  {selectedLocation.map((location) => (
                    <span
                      key={location}
                      className="flex items-center gap-1.5 border border-purple-300 bg-purple-50 rounded px-2 py-1"
                    >
                      {location}
                      <X
                        onClick={() => handleLocationChange(location)}
                        size={18}
                        className="cursor-pointer"
                      />
                    </span>
                  ))}
                </div>
              </div>
            )}

          <button
            onClick={toggleFilter}
            className="border mb-5 md:hidden cursor-pointer border-gray-300 rounded px-8 py-1.5"
          >
            {showFilter ? "Close" : "Search by filters"}
          </button>

          {/* Desktop Filters */}
          <div className="hidden md:block">{renderFilters()}</div>

          {/* Mobile Filters */}
          {showFilter && <div className="md:hidden">{renderFilters()}</div>}
        </div>

        {/* Job List Section */}
        <div className="w-full">
          {loading ? (
            <div className="h-full w-full mt-20 flex items-center justify-center">
              <Loader />
            </div>
          ) : (
            <>
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-2">
                {filteredJobs.length === 0 ? "No Jobs Found" : "Latest Jobs"}
              </h1>
              <p className="mb-8 text-gray-700">
                {filteredJobs.length === 0
                  ? "Oops! No jobs match your search right now. 🔍"
                  : "Get your desired job from top companies"}
              </p>

              {filteredJobs.length > 0 && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {paginatedJobs.map((job) => (
                      <JobList job={job} key={job.id} />
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="flex items-center justify-center mt-10 gap-4">
                      <ChevronLeft
                        className={`cursor-pointer ${
                          currentPage === 1
                            ? "text-gray-300 cursor-not-allowed"
                            : ""
                        }`}
                        onClick={() =>
                          setCurrentPage(Math.max(currentPage - 1, 1))
                        }
                      />
                      <div className="flex items-center gap-2">
                        {Array.from({ length: totalPages }).map((_, index) => (
                          <button
                            key={index + 1}
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
                      <ChevronRight
                        className={`cursor-pointer ${
                          currentPage === totalPages
                            ? "text-gray-300 cursor-not-allowed"
                            : ""
                        }`}
                        onClick={() =>
                          setCurrentPage(Math.min(currentPage + 1, totalPages))
                        }
                      />
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobListing;
