import React from "react";

const Header = ({ imageSrc, title, description, onSearch }) => {
  return (
    <div className="relative">
      <img
        src={imageSrc}
        alt="Header"
        className="w-full h-[60vh] object-cover object-bottom"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div>
          <h1 className="text-white text-center text-2xl font-medium sm:text-4xl md:text-6xl py-4 px-6 w-full md:w-[70vw] sm:w-[80vw] mx-auto">
            {title}
          </h1>
          <p className="text-stone-300 px-10 w-full sm:w-[60vw] md:w-[40vw] text-xs sm:text-sm text-center mx-auto">
            {description}
          </p>
          <div className="flex relative justify-center items-center mt-4 p-4">
            <div className="flex items-center">
              <button className="absolute">
                <i className="ri-search-line text-2xl font-semibold ml-4 text-stone-300"></i>
              </button>
              <input
                type="search"
                placeholder="Search for stock photos..."
                className="w-full sm:w-[50vw] px-14 py-3 sm:py-4 rounded-full text-base"
                onChange={(e) => onSearch(e.target.value)} // Call onSearch on input change
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
