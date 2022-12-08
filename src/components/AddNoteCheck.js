import React from "react";
import Addnote from "./CRUD/Addnote";
import { Navigate } from "react-router-dom";
// import Navbar from "./Navbar";
// import Notes from "./Notes";

function AddNoteCheck() {
  return (
    <>
      {localStorage.getItem("token") ? (
        <Addnote />
      ) : (
        <Navigate to="/login" replace={true} />
      )}
    </>
  );
}

export default AddNoteCheck;
