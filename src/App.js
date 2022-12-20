import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Addnote from "./components/Addnote";
import NoteState from "./components/context/notes/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import CredState from "./components/context/credentials/CredState";

function App() {
  return (
    <>
      <NoteState>
        <CredState>
          <Router>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  localStorage.getItem("token") ? (
                    <Home />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/addnote" element={<Addnote />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/profile" element={<Profile />} />
            </Routes>
          </Router>
        </CredState>
      </NoteState>
    </>
  );
}

export default App;
