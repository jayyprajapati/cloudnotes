import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import "./About.css";
function About() {
  const navigate = useNavigate();

  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
      navigate("/login");
    }
  }, [isLogged, navigate]);
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center align-middle">
        <div className="card ">
          <h2>CARD</h2>
        </div>
      </div>
    </>
  );
}

export default About;
