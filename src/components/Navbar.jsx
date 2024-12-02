import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import useNavigate and useLocation
import "remixicon/fonts/remixicon.css";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation(); // Get the current location
  const navigate = useNavigate(); // Initialize useNavigate

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Determine text color based on the current page
  const textColor = location.pathname === "/" ? "text-white" : "text-black";
  const photosTextColor =
    location.pathname === "/photos" ? "text-white" : "text-black";

  // Function to handle upload button click
  const handleUploadClick = () => {
    navigate("/upload"); // Navigate to the upload page
  };

  // Determine background color of the upload button based on the current location
  const uploadButtonBgColor =
    location.pathname === "/upload" ? "bg-black" : "bg-white";
  const uploadButtonTextColor =
    location.pathname === "/upload" ? "text-white" : "text-black";

  return (
    <div className="absolute z-20 flex justify-between items-center px-10 py-4 w-full">
      <div className="flex items-end gap-10">
        <Link to="/">
          <h1
            className={`text-2xl font-semibold ${textColor} ${photosTextColor}`}
          >
            HeavenStock
          </h1>
        </Link>
        <div className="relative hidden md:flex">
          <button
            onClick={toggleDropdown}
            className={`text-lg font-medium ${textColor} ${photosTextColor}`}
          >
            Explore
          </button>
          {dropdownOpen && (
            <div className="absolute w-60 mt-8 bg-white border rounded-xl shadow-xl">
              <Link
                to="/explore/category1"
                className="block px-4 py-3 rounded-t-xl text-black hover:bg-black hover:text-white"
              >
                Category 1
              </Link>
              <Link
                to="/explore/category2"
                className="block px-4 py-3 text-black hover:bg-black hover:text-white"
              >
                Category 2
              </Link>
              <Link
                to="/explore/category3"
                className="block px-4 py-3 rounded-b-xl text-black hover:bg-black hover:text-white"
              >
                Category 3
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-end gap-4">
        <button
          onClick={handleUploadClick} // Use onClick to navigate
          className={`${uploadButtonBgColor} ${uploadButtonTextColor} px-6 py-2 rounded-full shadow-lg hidden md:block`}
        >
          Upload
        </button>
        <button className="bg-black text-white px-6 py-2 rounded-full shadow-lg hidden md:block">
          Login
        </button>
        {/* Hamburger Menu Icon */}
        <button onClick={toggleMenu} className="md:hidden text-white">
          <i className="ri-menu-3-line text-2xl"></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 right-0 w-full bg-white shadow-lg md:hidden">
          <Link
            to="/"
            className="block px-4 py-3 text-black hover:bg-black hover:text-white"
          >
            Home
          </Link>
          <Link
            to="/explore/category1"
            className="block px-4 py-3 text-black hover:bg-black hover :text-white"
          >
            Category 1
          </Link>
          <Link
            to="/explore/category2"
            className="block px-4 py-3 text-black hover:bg-black hover:text-white"
          >
            Category 2
          </Link>
          <Link
            to="/explore/category3"
            className="block px-4 py-3 text-black hover:bg-black hover:text-white"
          >
            Category 3
          </Link>
          <div className="flex flex-col hi gap-2 p-4">
            <button
              onClick={handleUploadClick} // Use onClick to navigate
              className={`${uploadButtonBgColor} ${uploadButtonTextColor} px-6 py-2 rounded-full shadow-lg`}
            >
              Upload
            </button>
            <button className="bg-black text-white px-6 py-2 rounded-full shadow-lg">
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
