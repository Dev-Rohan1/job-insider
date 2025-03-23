import React from "react";
import { assets } from "../assets/assets";

const Download = () => {
  return (
    <section className="mt-16 mb-10 rounded-lg bg-blue-50 p-8 lg:p-12">
      <div className="flex flex-col items-center lg:flex-row lg:items-center lg:justify-between">
        <div className="mb-8 text-center lg:mb-0 lg:text-left">
          <h1 className="mb-6 text-3xl leading-tight font-semibold lg:text-4xl lg:leading-snug lg:font-bold">
            Download Mobile App
            <br className="hidden lg:block" /> For Better Experience
          </h1>
          <div className="flex justify-center space-x-4 lg:justify-start">
            <img
              src={assets.play_store}
              alt="Play Store"
              className="w-40 lg:w-48"
            />
            <img
              src={assets.app_store}
              alt="App Store"
              className="w-40 lg:w-48"
            />
          </div>
        </div>
        <div className="lg:flex lg:justify-end">
          <img
            className="w-full max-w-md lg:max-w-lg lg:scale-110"
            src={assets.app_main_img}
            alt="App Preview"
          />
        </div>
      </div>
    </section>
  );
};

export default Download;
