import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Addnote from "./components/CRUD/Addnote";
import NoteState from "./components/context/notes/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import CredState from "./components/context/credentials/CredState";

function App() {
  return (
    <>
      <NoteState>
        <CredState>
          <Router>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/addnote" element={<Addnote />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
            </Routes>
          </Router>
        </CredState>
      </NoteState>
    </>
  );
}

export default App;

// Search bar
// Profile Card
// About page
// Google, Github, LinkedIn Authentication
// Mobile Responsive
// Change Modal
// Alerts
// Alert Modal before Delete
// Sessions and Cookies
