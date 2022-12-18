import React, { useState, useContext } from "react";
import loginImg from "../Add notes-bro.png";
import siteLogo from "../logo.png";
import { Link, useNavigate } from "react-router-dom";
import credContext from "./context/credentials/credContext";
import Alert from "./Alert";

function Signup() {
  const context = useContext(credContext);
  const { userSignup, showAlert, alert } = context;
  //   let history = useHistory();
  const navigate = useNavigate();
  const [cred, setCred] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const signup = async (e) => {
    e.preventDefault();

    const json = await userSignup(cred.name, cred.email, cred.password);
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      navigate("/home");
      showAlert(json.message, "success");
    } else {
      navigate("/login");
      showAlert(json.message, "Error");
    }
  };

  const updateValue = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };
  return (
    <>
      {alert && <Alert alert={alert} />}
      <section className="h-screen bg-[#FEFCF3]">
        <div className="px-6 h-full text-gray-800">
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
              <img src={loginImg} className="w-full" alt="Sample" />
            </div>
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <div className="flex flex-row items-center justify-center mb-10">
                <img src={siteLogo} className="w-3/4 justify-center" alt="" />
              </div>
              <form onSubmit={signup}>
                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p className="text-center font-semibold mx-4 mb-0">
                    Welcome &nbsp;{" "}
                  </p>
                </div>

                {/* <!-- Name input --> */}
                <div className="mb-6">
                  <input
                    type="text"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
                    id="name"
                    name="name"
                    placeholder="Name"
                    onChange={updateValue}
                    minLength="3"
                    required
                    autoComplete="off"
                  />
                </div>
                {/* <!-- Email input --> */}
                <div className="mb-6">
                  <input
                    type="email"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
                    id="email"
                    name="email"
                    placeholder="Email address"
                    onChange={updateValue}
                    autoComplete="off"
                    required
                  />
                </div>

                {/* <!-- Password input --> */}
                <div className="mb-6">
                  <input
                    type="password"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
                    id="password"
                    name="password"
                    placeholder="Password"
                    minLength="6"
                    onChange={updateValue}
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="mb-6">
                  <input
                    type="password"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
                    id="cpassword"
                    name="cpassword"
                    placeholder="Confirm Password"
                    onChange={updateValue}
                    required
                  />
                </div>

                <div className="text-center flex justify-between lg:text-left">
                  <button
                    type="submit"
                    disabled={cred.password !== cred.cpassword}
                    className="inline-block px-7 py-3 bg-[#22A39F] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-[#6ECCAF] hover:shadow-lg focus:bg-[#22A39F] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#22A39F] active:shadow-lg transition duration-150 ease-in-out"
                    aria-label="Register Button"
                  >
                    <i className="fa-solid fa-user-plus"></i>&nbsp; Register
                  </button>
                  <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                    Already have an account?&nbsp;
                    <Link
                      to="/login"
                      className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                      aria-label="SignIn link"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Signup;
