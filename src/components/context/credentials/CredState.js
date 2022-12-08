import React, { useState } from "react";
import credContext from "./credContext.js";

const CredState = (props) => {
  const host = "http://localhost:8000";

  const [alert, setAlert] = useState(null);

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

  return (
    <credContext.Provider value={{ userLogin, userSignup, showAlert, alert }}>
      {props.children}
    </credContext.Provider>
  );
};

export default CredState;
