import React, { useContext, useState } from "react";
import logo from "./imgs/logo.png";
import { Link, useNavigate } from "react-router-dom";
import credContext from "./context/credentials/credContext";
import noteContext from "./context/notes/noteContext";

function Navbar() {
  const navigate = useNavigate();

  const context = useContext(credContext);
  const { showAlert, userDetails } = context;

  const notecontext = useContext(noteContext);
  const { searchResults, query } = notecontext;

  const [menu, setMenu] = useState(false);

  const toggleMenu = () => {
    setMenu(!menu);
  };

  const getDetails = async () => {
    await userDetails();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    showAlert("Logged out successfully", "success");
  };

  const searchQuery = (e) => {
    const current = e.target.value;
    searchResults(current.toLowerCase());
  };
  return (
    <>
      <div>
        <nav className="bg-[#FFE69A] sticky md:px-20 py-10">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 right-0 flex items-center sm:justify-between md:hidden">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md p-2 text-gray-400  focus:text-white hover:text-gray-500 active:text-red-600 focus:outline-white "
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                  onClick={toggleMenu}
                  aria-label="Menu Bars"
                >
                  <span className="sr-only">Open main menu</span>

                  <i className="fa-solid hover:text-[27px] text-black fa-xl fa-bars"></i>
                </button>
              </div>
              <div className="flex flex-1 items-center justify-between w-full">
                <div className="flex w-full">
                  <Link to="/">
                    <img
                      className=" h-[44px] md:w-full hover:scale-110"
                      src={logo}
                      alt="Your Company"
                      aria-label="home through logo link"
                    />
                  </Link>
                </div>

                {/* Search Bar breakpoint -> md and wider  */}
                <div className="hidden md:flex w-full items-center md:mx-7 lg:mx-0 space-x-4">
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <input
                    className="outline-none  bg-transparent  font-Montserrat"
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search"
                    autoComplete="off"
                    value={query}
                    onChange={searchQuery}
                  />
                </div>

                {/* Big menu breakpoint -> md and wider*/}
                <div className="hidden w-full md:block">
                  <div className="flex justify-between">
                    {/* Add New note Link */}
                    <Link to="/addnote" aria-label="addNote big screen link">
                      <span data-tooltip="New Note" data-flow="bottom">
                        <i className="fa-solid fa-plus hover:text-[27px] fa-xl"></i>
                      </span>
                    </Link>

                    {/* Profile Link */}
                    <Link to="/profile" aria-label="profile big screen link">
                      <span
                        data-tooltip="Profile"
                        data-flow="bottom"
                        onClick={getDetails}
                      >
                        <i className="fa-solid fa-user hover:text-[27px] fa-xl"></i>
                      </span>
                    </Link>

                    {/* About Link */}
                    <Link to="/about" aria-label="about big screen link">
                      <span data-tooltip="About Us" data-flow="bottom">
                        <i className="fa-solid fa-circle-info  hover:text-[27px] fa-xl"></i>
                      </span>
                    </Link>
                    {/* Logout Link */}
                    <button
                      onClick={logout}
                      type="button"
                      aria-label="Logout Button"
                      to="/"
                    >
                      <span data-tooltip="Logout" data-flow="bottom">
                        <i className="fa-solid hover:text-[27px] fa-right-from-bracket fa-xl"></i>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu breakpoint -> smaller than md */}
          <div
            className={`${!menu && "hidden"} md:hidden flex flex-col gap-4`}
            id="mobile-menu"
          >
            <div className="px-4 mx-4 pt-8 flex justify-between">
              <Link to="/addnote" aria-label="addNote mobile screen link">
                <span data-tooltip="New Note" data-flow="bottom">
                  <i className="fa-solid fa-plus hover:text-[27px] fa-xl"></i>
                </span>
              </Link>

              <Link to="/profile" aria-label="profile mobile screen link">
                <span data-tooltip="Profile" data-flow="bottom">
                  <i className="fa-solid fa-user hover:text-[27px] fa-xl"></i>
                </span>
              </Link>

              <Link to="/about" aria-label="about mobile screen link">
                <span data-tooltip="About Us" data-flow="bottom">
                  <i className="fa-solid fa-circle-info  hover:text-[27px] fa-xl"></i>
                </span>
              </Link>

              <button
                onClick={logout}
                type="button"
                aria-label="Logout Button Mobile"
                to="/"
              >
                <span data-tooltip="Logout" data-flow="bottom">
                  <i className="fa-solid hover:text-[27px] fa-right-from-bracket fa-xl"></i>
                </span>
              </button>
            </div>
            <div className="flex md:hidden justify-evenly pt-6 w-full items-center  space-x-4">
              <input
                className="outline-none items-center border-b-2 border-gray-500 bg-transparent  font-Montserrat"
                type="text"
                name="search"
                id="search-mobile"
                placeholder="Search Here..."
                autoComplete="off"
                value={query}
                onChange={searchQuery}
              />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
