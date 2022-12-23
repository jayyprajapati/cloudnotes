import React, { useState, useContext } from "react";
import loginImg from "./imgs/Add notes-bro.png";
import siteLogo from "./imgs/logo.png";
import { Link, useNavigate } from "react-router-dom";
import credContext from "./context/credentials/credContext";
import Alert from "./Alert";

function Login() {
  const navigate = useNavigate();
  // Access credentials context and credentials states
  const context = useContext(credContext);
  const { userLogin, showAlert, alert, loadingElement } = context;

  // –––––––––––––––––––––– Login Functionality ––––––––––––––––––––––––
  // Credentials states
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  // Update each field value whenever user types a new char in field
  const updateValue = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Server Side Authentication verified when user hit Login button
  const login = async (e) => {
    e.preventDefault();
    loadingElement("load", "loginIcon", "loginBtn");

    // pass the credentials and wait for the server response
    const json = await userLogin(credentials.email, credentials.password);

    // If valid credentials
    if (json.success) {
      // Store the authToken generated by the server to user's localStorage for future verification purpose
      localStorage.setItem("token", json.authToken);
      navigate("/home");
      showAlert(json.message, "success");
    }
    // If Invalid credentials
    else {
      navigate("/login");
      showAlert(json.message, "Error");
      document.getElementById(`#load`).classList.add("hidden");
      document.getElementById(`#loginIcon`)?.classList.remove("hidden");
      document.getElementById(`#loginBtn`)?.setAttribute("disabled", false);
      document.getElementById(`#loginBtn`)?.classList.remove("opacity-60");
      document.getElementById(`#loginBtn`).style.cursor = "pointer";
    }
  };

  // ––––––––––––––––––– View/Hide Login Password Functionality –––––––––––––––––––––

  const [passToggle, setPassToggle] = useState(false);
  const [passIcon, setPassIcon] = useState("fa-eye-slash");

  // call function when user clicks view/eye icon
  const passView = () => {
    setPassToggle(!passToggle);
    if (passToggle) {
      document.getElementById("password").setAttribute("type", "password");
      setPassIcon("fa-eye-slash");
    } else {
      document.getElementById("password").setAttribute("type", "text");
      setPassIcon("fa-eye");
    }
  };

  // ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

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
              <form onSubmit={login}>
                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p className="text-center font-semibold mx-4 mb-0">
                    Sign In using &nbsp;{" "}
                    <i className="fa-regular fa-envelope"></i>
                  </p>
                </div>

                {/* <!-- Email input --> */}
                <div className="mb-6">
                  <input
                    type="text"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
                    id="email"
                    placeholder="Email address"
                    name="email"
                    onChange={updateValue}
                    required
                  />
                </div>

                {/* <!-- Password input --> */}
                <div className="mb-6 flex gap-3 items-center">
                  <input
                    type="password"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
                    id="password"
                    placeholder="Password"
                    name="password"
                    onChange={updateValue}
                    minLength="6"
                    autoComplete="off"
                    required
                  />
                  <span className="cursor-pointer" onClick={passView}>
                    <i className={`fa-solid ${passIcon} hover:scale-110`}></i>
                  </span>
                </div>

                <div className="text-center flex justify-between lg:text-left">
                  <button
                    type="submit"
                    className="inline-block px-7 py-3 bg-[#22A39F] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-[#6ECCAF] hover:shadow-lg focus:bg-[#22A39F] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#22A39F] active:shadow-lg transition duration-150 ease-in-out"
                    aria-label="Login Button"
                    id="#loginBtn"
                  >
                    <i id="#load" className="fa-solid hidden fa-spinner"></i>
                    &nbsp; Login &nbsp;
                    <i
                      id="#loginIcon"
                      className="fa-solid fa-right-to-bracket"
                    ></i>
                  </button>
                  <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                    Don't have an account?&nbsp;
                    <Link
                      to="/signup"
                      href="/"
                      className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                      aria-label="SignUp link"
                    >
                      Register
                    </Link>
                  </p>
                </div>

                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p className="text-center font-semibold mx-4 mb-0">Or</p>
                </div>

                <div className="flex flex-row space-x-6 items-center justify-center ">
                  <button
                    type="button"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    className="inline-block p-3 bg-black text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-gray-700 hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out mx-1"
                    aria-label="Github Button"
                  >
                    {/* <!-- Github --> */}
                    <i className="fa-brands fa-github fa-xl"></i>
                  </button>

                  <button
                    type="button"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    className="inline-block p-3 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mx-1"
                    aria-label="LinkedIn Button"
                  >
                    {/* <!-- LinkedIn --> */}
                    <i className="fa-brands fa-linkedin fa-xl"></i>
                  </button>
                  <button
                    type="button"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    className="inline-block p-3 bg-white  font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-white focus:shadow-lg focus:outline-none focus:ring-0 active:bg-white active:shadow-lg transition duration-150 ease-in-out mx-1"
                    aria-label="google Button"
                  >
                    {/* <!-- Google --> */}
                    <i className="fa-brands fa-google fa-lg text-black"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
