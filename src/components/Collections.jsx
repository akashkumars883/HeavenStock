import React from "react";
import { NavLink } from "react-router-dom";
import NavMenu from "./NavMenu";

const Collections = () => {
  // Array of image sources
  const images = [
    "src/assets/cat-6463284_1920.jpg",
    "src/assets/butterfly-7954767_1280.jpg",
    "src/assets/food-715542_1280.jpg",
    "src/assets/woman-1335487_1280.jpg",
  ];
  // Array of category names
  const categories = ["Animals", "Nature", "Food", "Beauty"];
  // Array of category links
  const categoryLinks = ["/animals", "/nature", "/food", "/travel", "/beauty"];

  return (
    <div className="py-6 px-4 sm:py-12 sm:px-8">
      <NavMenu />
      <div className="sm:mt-10">
        <h1 className="text-xl sm:text-2xl">Explore our curated collections</h1>
        <p className="text-stone-500">
          Instant Access to Thousands of High-Quality Images
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mt-6">
        {images.map((src, index) => (
          <NavLink
            to={categoryLinks[index]}
            key={index}
            className="relative w-full h-52"
          >
            <img
              src={src}
              alt={`Image ${index + 1}`}
              className="w-full h-full object-cover rounded-3xl"
            />
            <div className="absolute inset-0 bg-black opacity-30 hover:opacity-50 rounded-3xl"></div>
            <div className="absolute inset-0 flex justify-center items-center text-white text-3xl font-semibold">
              {categories[index]}
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Collections;
