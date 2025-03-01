import React, { useEffect, useContext, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import credContext from "./context/credentials/credContext";

function About() {
  const navigate = useNavigate();

  const context = useContext(credContext);
  const { user, userDetails } = context;
  const [isContentLoading, setIsContentLoading] = useState(false);

  // const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      // loadingElement("load", "name" )
      if (!user?.user?.name) {
        // loadWhileNoContent("info");
        setIsContentLoading(true);
      }

      userDetails().then(() => {
        // setLoader(true);s
        // stopLoading("info");
        setIsContentLoading(false);
      });
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex justify-center  align-middle mt-20">
        <div className="w-full p-8 max-w-sm bg-white border border-gray-200 rounded-lg shadow-md">
          <div className="flex flex-col items-center pb-10">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src="https://png.pngtree.com/png-vector/20190114/ourlarge/pngtree-vector-avatar-icon-png-image_313572.jpg"
              alt="Bonnie"
            />
            <>
            {isContentLoading ? 
              <i
              id="#load"
              className={`fa-solid flex fa-spinner animate-spin text-[30px] my-5 text-gray-500 justify-center`}
            ></i> :
            <div id="#info" className="font-Montserrat">
            <h5 className="mb-1 text-xl font-medium text-gray-900">
              Hey! &nbsp;
              <span className="text-gray-500 font-semibold">
                {user?.user?.name}
              </span>
            </h5>
            <span className="text-sm flex text-gray-500 items-center align-middle">
              <i className="fa-regular fa-envelope"></i> &nbsp;
              {user?.user?.email}
            </span>
          </div>
            }
            </>
            
            
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
