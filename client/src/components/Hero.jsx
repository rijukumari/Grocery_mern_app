import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";

function Hero() {
  return (
    <div className="relative">
      {/* Background Images */}
      <img
        src={assets.main_banner_bg}
        alt=""
        className="hidden md:block w-full"
      />
      <img
        src={assets.main_banner_bg_sm}
        alt=""
        className="block md:hidden w-full"
      />

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-18 lg:pl-24 px-4 text-center md:text-left">
        <h1 className="text-3xl px-6  md:text-4xl font-bold max-w-[280px] md:max-w-[350px] leading-tight md:leading-snug lg:leading-tight">
          Freshness You Trust, Saving You will Love!
        </h1>

        {/* Buttons in a flex row */}
        <div className=" ml-7 flex flex-row items-center mt-6 gap-4">
          <Link
            to="/products"
            className="flex items-center gap-2 px-7 py-3 rounded text-white bg-purple-950 transition hover:bg-purple-900 whitespace-nowrap"
          >
            Shop Now
            <GoArrowRight className="transition group-hover:translate-x-1" />
          </Link>

          <Link
            to="/seller"
            className="flex items-center gap-2 px-7 py-3 rounded text-white bg-purple-950 transition hover:bg-purple-900 whitespace-nowrap"
          >
            Explore Now
            <GoArrowRight className="transition group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
