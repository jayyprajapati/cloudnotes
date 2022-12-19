import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import "./About.css";
import img from "./jay.jpeg";
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
      <div className="flex flex-col gap-4 justify-center font-Montserrat mt-10 items-center align-middle">
        <h1 className="text-xl">CloudNotes Created by</h1>
        <div className="card ">
          <div className="card-info">
            <div className="card-avatar">
              <img src={img} className="rounded-full" alt="" />
            </div>
            <div className="card-title">Jay Prajapati</div>
            <div className="card-subtitle p-2">jay.prajapati5717@gmail.com</div>
            {/* <div className="card-subtitle">Build using &amp; React</div> */}
          </div>
          <ul className="card-social">
            <li className="card-social__item">
              <a
                href="https://www.instagram.com/jayy.prajapati/"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-brands fa-instagram text-gray-500"></i>
              </a>
            </li>
            <li className="card-social__item">
              <a
                href="https://github.com/jayyprajapati"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-brands fa-github text-gray-500"></i>
              </a>
            </li>
            <li className="card-social__item">
              <a
                href="https://www.linkedin.com/in/jay-prajapati-614180191"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-brands fa-linkedin text-gray-500"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default About;
