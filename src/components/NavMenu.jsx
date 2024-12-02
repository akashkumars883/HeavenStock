import React from "react";
import { NavLink } from "react-router-dom";

const NavMenu = () => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-center items-center">
        <div className="flex flex-wrap justify-center mb-4 sm:mb-0">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:bg-black hover:text-white px-4 py-2 sm:px-8 sm:py-3 rounded-full hover:shadow-lg ${
                isActive ? "bg-black text-white" : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/photos"
            className={({ isActive }) =>
              `hover:bg-black hover:text-white px-4 py-2 sm:px-8 sm:py-3 rounded-full hover:shadow-lg ${
                isActive ? "bg-black text-white" : ""
              }`
            }
          >
            Photos
          </NavLink>
          <NavLink
            to="/videos"
            className={({ isActive }) =>
              `hover:bg-black hover:text-white px-4 py-2 sm:px-8 sm:py-3 rounded-full hover:shadow-lg ${
                isActive ? "bg-black text-white" : ""
              }`
            }
          >
            Videos
          </NavLink>
          <NavLink
            to="/illustrations"
            className={({ isActive }) =>
              `hover:bg-black hover:text-white px-4 py-2 sm:px-8 sm:py-3 rounded-full hover:shadow-lg ${
                isActive ? "bg-black text-white" : ""
              }`
            }
          >
            Illustrations
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavMenu;