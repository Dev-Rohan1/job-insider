import React from "react";
import { Search, MapPin } from "lucide-react";

const Hero = () => {
  return (
    <section className="px-4">
      <div className="bg-gradient-to-r from-blue-800 to-blue-950 rounded-lg text-center py-12 md:py-16 px-4 md:px-8">
        <h1 className="text-white text-2xl font-medium mb-5 md:text-3xl md:font-semibold lg:text-4xl lg:font-bold">
          Over 10,000+ jobs to apply
        </h1>
        <p className="text-white max-w-xl mx-auto text-[15px] md:text-base mb-6 md:mb-8">
          Your Next Big Career Move Starts Right Here - Explore the Best Job
          Opportunities and Take the First Step Toward Your Future!
        </p>
        <div className="bg-white mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-md p-2 sm:p-4 max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
            <div className="border border-gray-300 rounded-md flex items-center gap-2 h-[45px] px-3 w-full sm:w-auto">
              <Search className="text-gray-700 flex-shrink-0" />
              <input
                className="w-full border-none outline-none bg-transparent"
                type="text"
                placeholder="Search Jobs"
              />
            </div>
            <div className="border border-gray-300 rounded-md flex items-center gap-2 h-[45px] px-3 w-full sm:w-auto">
              <MapPin className="text-gray-700 flex-shrink-0" />
              <input
                className="w-full border-none outline-none bg-transparent"
                type="text"
                placeholder="Search Location"
              />
            </div>
          </div>
          <button className="bg-blue-800 cursor-pointer hover:bg-blue-700 transition-colors h-[44px] text-white py-2 px-6 rounded-md w-full sm:w-auto">
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
