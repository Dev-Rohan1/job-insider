import { MapPin, Search } from "lucide-react";
import React, { useContext, useRef } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../contexts/AppContext";

const Hero = () => {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);

  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();

    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });

    setIsSearched(true);
  };

  return (
    <>
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
            <form
              onSubmit={handleSearch}
              className="flex flex-col items-center justify-between gap-2 p-3 md:flex-row"
            >
              <div className="flex w-full flex-col items-center gap-2 md:flex-row">
                <div className="flex w-full items-center gap-2 rounded border border-gray-300 p-2">
                  <Search className="text-gray-700" />
                  <input
                    className="w-full border-none outline-none"
                    type="text"
                    placeholder="Search Jobs"
                    ref={titleRef}
                  />
                </div>
                <div className="flex w-full items-center gap-2 rounded border border-gray-300 p-2">
                  <MapPin className="text-gray-700" />
                  <input
                    className="w-full border-none outline-none"
                    type="text"
                    placeholder="Search location"
                    ref={locationRef}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="flex w-full cursor-pointer items-center justify-center rounded bg-blue-500 px-6 py-[8px] text-center text-white transition-colors hover:bg-blue-600 md:w-auto"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </section>
      <div className="mt-6 rounded-md border border-gray-300">
        <div className="flex flex-wrap items-center justify-around gap-y-8 p-5">
          <img className="max-h-10" src={assets.microsoft_logo} alt="" />
          <img className="max-h-10" src={assets.walmart_logo} alt="" />
          <img className="max-h-10" src={assets.accenture_logo} alt="" />
          <img className="max-h-8" src={assets.samsung_logo} alt="" />
          <img className="max-h-7" src={assets.amazon_logo} alt="" />
          <img className="max-h-7" src={assets.adobe_logo} alt="" />
        </div>
      </div>
    </>
  );
};

export default Hero;
