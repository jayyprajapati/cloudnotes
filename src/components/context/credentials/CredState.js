import React, { useState } from "react";
import credContext from "./credContext.js";

const CredState = (props) => {
  const host = "https://cloudnotes-api-8ay5.onrender.com";

  const [user, setUser] = useState([]);

  const loadingElement = (loadEl, rmEl, btn, span) => {
    const load = document.getElementById(`#${loadEl}`);
    load.classList.remove("hidden");
    load.classList.add("animate-spin");
    document.getElementById(`#${rmEl}`).classList.add("hidden");
    document.getElementById(`#${btn}`)?.classList.add("opacity-60");
    document.getElementById(`#${btn}`).style.cursor = "not-allowed";
    document.getElementById(`#${btn}`)?.setAttribute("disabled", true);
    document.getElementById(`#${span}`)?.removeAttribute("data-tooltip");
  };

  const loadWhileNoContent = (el) => {
    document.getElementById(`#${el}`)?.classList.add("hidden");
    document.getElementById("#load")?.classList.remove("hidden");
    document.getElementById("#load")?.classList.add("animate-spin");
    document.getElementById("#load")?.classList.add("flex");
  };

  const stopLoading = (el) => {
    document.getElementById(`#${el}`)?.classList.remove("hidden");
    document.getElementById("#load")?.classList.add("hidden");
  };
  // –––––––––––––––––––––––––– User Login ––––––––––––––––––––––––––

  const userLogin = async (email, password) => {
    const url = `${host}/api/auth/login`;
    // send request to server
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // send user data
      body: JSON.stringify({ email, password }),
    });
    // wait for response
    const json = await response.json();
    // send response
    return json;
  };

  // –––––––––––––––––––––––––– User Signup ––––––––––––––––––––––––––

  const userSignup = async (name, email, password) => {
    const url = `${host}/api/auth/signup`;
    // send request to server
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // send user data
      body: JSON.stringify({ name, email, password }),
    });
    // wait for response
    const json = await response.json();
    // send response
    return json;
  };

  // –––––––––––––––––––––––––– Show Alert ––––––––––––––––––––––––––

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    // Set alert type and message and display it
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  // –––––––––––––––––––––––––– Get user Details ––––––––––––––––––––––––––

  const userDetails = async () => {
    const url = `${host}/api/auth/getuser`;
    // send request to server
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    // wait for response
    const json = await response.json();
    setUser(json);
  };

  return (
    <credContext.Provider
      value={{
        userLogin,
        userSignup,
        showAlert,
        alert,
        userDetails,
        user,
        loadingElement,
        loadWhileNoContent,
        stopLoading,
      }}
    >
      {props.children}
    </credContext.Provider>
  );
};

export default CredState;
