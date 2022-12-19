import React, { useState } from "react";
import credContext from "./credContext.js";

const CredState = (props) => {
  const host = "http://localhost:8000";

  const [alert, setAlert] = useState(null);
  const [user, setUser] = useState([]);

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
    // console.log(json);
    setUser(json);
    // console.log(user);
  };

  return (
    <credContext.Provider
      value={{ userLogin, userSignup, showAlert, alert, userDetails, user }}
    >
      {props.children}
    </credContext.Provider>
  );
};

export default CredState;
