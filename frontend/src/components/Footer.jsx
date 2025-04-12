import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-t-gray-300 bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <img src={assets.logo} alt="Company Logo" className="h-8 w-auto" />
            <span className="text-gray-400 hidden sm:block">|</span>
            <p className="text-gray-600 text-sm sm:text-base text-center md:text-left">
              Copyright © ❤️‍🔥Rohan❤️‍🔥 2025 | All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="hover:opacity-75 transition-opacity">
              <img
                src={assets.facebook_icon}
                alt="Facebook"
                className="h-8 w-8"
              />
            </a>
            <a href="#" className="hover:opacity-75 transition-opacity">
              <img
                src={assets.twitter_icon}
                alt="Twitter"
                className="h-8 w-8"
              />
            </a>
            <a href="#" className="hover:opacity-75 transition-opacity">
              <img
                src={assets.instagram_icon}
                alt="Instagram"
                className="h-8 w-8"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
