import React from "react";
import { Search, MapPin } from "lucide-react";

const Hero = () => {
  return (
    <section className="rounded-md bg-gradient-to-r from-blue-800 to-blue-950 px-6 py-15">
      <div className="text-center">
        <h1 className="mb-5 text-2xl font-semibold text-white md:text-3xl lg:text-4xl">
          Over 10,000+ jobs to apply
        </h1>
        <p className="m-auto max-w-xl font-light text-white md:font-normal">
          Your Next Big Career Move Starts Right Here - Explore the Best Job
          Opportunities and Take the First Step Toward Your Future!
        </p>
        <div className="m-auto mt-5 max-w-xl rounded bg-white">
          <div className="flex flex-col items-center justify-between gap-2 p-3 md:flex-row">
            <div className="flex w-full flex-col items-center gap-2 md:flex-row">
              <div className="flex w-full items-center gap-2 rounded border border-gray-300 p-2">
                <Search className="text-gray-700" />
                <input
                  className="w-full border-none text-sm outline-none"
                  type="text"
                  placeholder="Search Jobs"
                  aria-label="Search for jobs"
                />
              </div>
              <div className="flex w-full items-center gap-2 rounded border border-gray-300 p-2">
                <MapPin className="text-gray-700" />
                <input
                  className="w-full border-none text-sm outline-none"
                  type="text"
                  placeholder="Search location"
                  aria-label="Search for location"
                />
              </div>
            </div>
            <div className="flex w-full cursor-pointer items-center justify-center rounded bg-blue-500 px-3 py-2 text-center text-white transition-colors hover:bg-blue-600 md:w-auto">
              <button type="button" className="block">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
