import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-gray-300 py-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to={"/"}>
            <img
              className="w-[130px] md:w-auto"
              src={assets.logo}
              alt="Company Logo"
            />
          </Link>
          <span className="hidden h-[25px] w-[1px] bg-gray-400 lg:inline-block"></span>
          <p className="hidden items-center gap-1 text-gray-600 lg:flex">
            Copyright ❤️‍🔥 Rohan 💖 <span className="text-gray-400">|</span> All
            rights reserved 🔒✨
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="w-[30px] md:w-auto"
              src={assets.facebook_icon}
              alt="Facebook Icon"
            />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="w-[30px] md:w-auto"
              src={assets.twitter_icon}
              alt="Twitter Icon"
            />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="w-[30px] md:w-auto"
              src={assets.instagram_icon}
              alt="Instagram Icon"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
