import React from "react";
import { assets } from "../assets/assets";

const Download = () => {
  return (
    <section className="bg-blue-50 rounded-xl p-6 md:px-8 md:py-10 lg:p-12">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10 max-w-5xl mx-auto">
        <div className="flex-1 text-center lg:text-left max-w-full lg:max-w-[50%]">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-3 lg:mb-4">
            Download Our App for Better Experience
          </h1>
          <p className="text-gray-600 mb-5 md:mb-6 text-sm md:text-base lg:text-lg">
            Enjoy exclusive features and seamless ordering with our mobile app.
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 md:gap-4">
            <a
              href="#"
              className="inline-block transition-transform hover:scale-[1.02] active:scale-95"
              aria-label="Download on Google Play"
            >
              <img
                src={assets.play_store}
                alt="Get it on Google Play"
                className="h-[40px] min-h-[40px] md:h-[44px] lg:h-[48px] w-auto object-contain"
                loading="lazy"
              />
            </a>
            <a
              href="#"
              className="inline-block transition-transform hover:scale-[1.02] active:scale-95"
              aria-label="Download on App Store"
            >
              <img
                src={assets.app_store}
                alt="Download on the App Store"
                className="h-[40px] min-h-[40px] md:h-[44px] lg:h-[48px] w-auto object-contain"
                loading="lazy"
              />
            </a>
          </div>
        </div>
        <div className="flex-1 flex justify-center w-full max-w-[280px] md:max-w-[320px] lg:max-w-[380px]">
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
