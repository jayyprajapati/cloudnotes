import React from "react";
import credContext from "./credContext.js";

const CredState = (props) => {
  const host = "http://localhost:8000";

  const userLogin = async (email, password) => {
    const url = `${host}/api/auth/login`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    return json;
  };
  const userSignup = async (name, email, password) => {
    const url = `${host}/api/auth/signup`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();

    return json;
  };

  return (
    <credContext.Provider value={{ userLogin, userSignup }}>
      {props.children}
    </credContext.Provider>
  );
};

export default CredState;
