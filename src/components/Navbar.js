import React, { useContext } from "react";
import logo from "../logo.png";
import { Link, useNavigate } from "react-router-dom";
import credContext from "./context/credentials/credContext";

function Navbar() {
  const navigate = useNavigate();
  const context = useContext(credContext);
  const { showAlert } = context;

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    showAlert("Logged out successfully", "success");
  };
  return (
    <>
      <nav className="flex flex-wrap justify-between px-20 text-[#393E46] py-10 items-center bg-[#FFE69A] shadow-lg sticky top-0 z-50">
        <Link to="/home">
          <img src={logo} className="logo hover:scale-110" alt="" />
        </Link>
        <div className="flex items-center  space-x-4">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            className="outline-none   bg-transparent  font-Montserrat"
            type="text"
            name="search"
            id="search"
            placeholder="Search"
            autoComplete="off"
          />
        </div>
        <ul className="flex flex-wrap items-center align-middle justify-center space-x-[30px]">
          <li>
            <Link to="/addnote">
              <span data-tooltip="New Note" data-flow="bottom">
                <i className="fa-solid fa-plus hover:text-[27px] fa-xl"></i>
              </span>
            </Link>
          </li>
          <li>
            <Link to="/home">
              <span data-tooltip="Profile" data-flow="bottom">
                <i className="fa-solid fa-user hover:text-[27px] fa-xl"></i>
              </span>
            </Link>
          </li>
          <li>
            <Link to="/about">
              <span data-tooltip="About Us" data-flow="bottom">
                <i className="fa-solid fa-circle-info  hover:text-[27px] fa-xl"></i>
              </span>
            </Link>
          </li>
          <li>
            <button onClick={logout} to="/">
              <span data-tooltip="Logout" data-flow="bottom">
                <i className="fa-solid hover:text-[27px] fa-right-from-bracket fa-xl"></i>
              </span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
