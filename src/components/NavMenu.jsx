import React from "react";
import { NavLink } from "react-router-dom";

const NavMenu = () => {
  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="hidden sm:flex space-x-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:bg-black hover:text-white px-8 py-3 rounded-full hover:shadow-lg ${
                isActive ? "bg-black text-white" : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/photos"
            className={({ isActive }) =>
              `hover:bg-black hover:text-white px-8 py-3 rounded-full hover:shadow-lg ${
                isActive ? "bg-black text-white" : ""
              }`
            }
          >
            Photos
          </NavLink>
          <NavLink
            to="/videos"
            className={({ isActive }) =>
              `hover:bg-black hover:text-white px-8 py-3 rounded-full hover:shadow-lg ${
                isActive ? "bg-black text-white" : ""
              }`
            }
          >
            Videos
          </NavLink>
          <NavLink
            to="/illustrations"
            className={({ isActive }) =>
              `hover:bg-black hover:text-white px-8 py-3 rounded-full hover:shadow-lg ${
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
