import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
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
      <h1>This is Profile</h1>
    </>
  );
}

export default About;
