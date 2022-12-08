import React, { useContext } from "react";
import Navbar from "./Navbar";
import Notes from "./Notes";
import Alert from "./Alert";
import credContext from "./context/credentials/credContext";

function Home() {
  const context = useContext(credContext);
  const { alert } = context;

  return (
    <>
      <Navbar />
      {alert && <Alert alert={alert} />}
      <Notes />
    </>
  );
}

export default Home;
