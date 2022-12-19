import React, { useState, useEffect, useContext } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import credContext from "./context/credentials/credContext";

function About() {
  const navigate = useNavigate();

  const [_, setIsLogged] = useState(false);
  const context = useContext(credContext);
  const { user, userDetails } = context;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogged(true);
      userDetails();
      // console.log(user);
    } else {
      setIsLogged(false);
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  // const getDetails = async () => {
  //   await userDetails();
  //   console.log(user);
  // };

  return (
    <>
      <Navbar />
      <div className="flex justify-center align-middle mt-20">
        <div className="w-full p-8 max-w-sm bg-white border border-gray-200 rounded-lg shadow-md">
          <div className="flex flex-col items-center pb-10">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src="https://png.pngtree.com/png-vector/20190114/ourlarge/pngtree-vector-avatar-icon-png-image_313572.jpg"
              alt="Bonnie"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900">
              Hello {user?.user?.name}
            </h5>
            <span className="text-sm text-gray-500 ">{user?.user?.email}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
