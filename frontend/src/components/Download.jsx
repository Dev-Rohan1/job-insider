import React from "react";
import { assets } from "../assets/assets";

const Download = () => {
  return (
    <section className="bg-blue-50 rounded-xl p-6 md:px-6 md:py-8">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 max-w-5xl mx-auto">
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-3">
            Download Our App for Better Experience
          </h1>
          <p className="text-gray-600 mb-5 text-sm md:text-base">
            Enjoy exclusive features and seamless ordering with our mobile app.
          </p>
          <div className="flex justify-center lg:justify-start gap-3">
            <img
              src={assets.play_store}
              alt="Get it on Google Play"
              className="h-9 md:h-10 cursor-pointer hover:opacity-90 transition-opacity"
              loading="lazy"
            />
            <img
              src={assets.app_store}
              alt="Download on the App Store"
              className="h-9 md:h-10 cursor-pointer hover:opacity-90 transition-opacity"
              loading="lazy"
            />
          </div>
        </div>
        <div className="flex-1 flex justify-center w-full max-w-[280px] md:max-w-[320px] lg:max-w-[360px]">
          <img
            src={assets.app_main_img}
            alt="App preview"
            className="w-full h-auto object-contain"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default Download;
