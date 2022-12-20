import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Addnote from "./components/CRUD/Addnote";
import NoteState from "./components/context/notes/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import CredState from "./components/context/credentials/CredState";
import DesiredModal from "./components/Playground/DesiredModal";

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <CredState>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/myModal" element={<DesiredModal />} />
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/addnote" element={<Addnote />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/profile" element={<Profile />} />
            </Routes>
          </CredState>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
