import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import Navbar from "../Navbar";
import credContext from "../context/credentials/credContext";

function Addnote() {
  const navigate = useNavigate();

  const credcontext = useContext(credContext);
  const { showAlert } = credcontext;

  const context = useContext(noteContext);
  const { addNote, setQuery } = context;
  const [isLogged, setIsLogged] = useState(false);
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "General",
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogged(true);
      setQuery("");
    } else {
      setIsLogged(false);
      navigate("/login");
    }
  }, [isLogged, navigate, setQuery]);

  // function titleCase(str) {
  //   str = str.toLowerCase().split(" ");
  //   for (var i = 0; i < str.length; i++) {
  //     str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  //   }
  //   return str.join(" ");
  // }

  const addNewNote = async (e) => {
    e.preventDefault();
    // const newTitle = titleCase(note.title);
    const json = await addNote(note.title, note.description, note.tag);
    navigate("/home");
    const status = json.success ? "success" : "Error";
    showAlert(json.message, status);
  };

  const updateValue = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <div
        className="max-w-2xl px-8 py-6 mx-auto mb-10 font-Montserrat mt-4 text-black rounded-lg shadow-xl dark:bg-[#F7F7F7]"
        style={{ cursor: "auto" }}
      >
        <div className="flex items-center align-middle justify-center">
          <span className=" font-normal font-Montserrat text-[25px] text-gray-600">
            <i className="fa-solid fa-square-plus"></i> &nbsp; Add a
            <mark className="mx-1 px-2 text-white bg-[#FFC23C] rounded">
              New
            </mark>
            Note
          </span>
        </div>
        <hr className="my-4 mx-auto w-48 h-1 bg-[#fcd581] rounded border-0 md:my-5"></hr>
        <div className="my-10">
          <form
            onSubmit={addNewNote}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                placeholder="title"
                name="title"
                autoComplete="off"
                onChange={updateValue}
                minLength="3"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="description"
                className="block mb-2 mt-2 text-sm font-bold text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                autoComplete="off"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Write your thoughts here..."
                onChange={updateValue}
                minLength="6"
                required
              ></textarea>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="tag"
              >
                Tag
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="tag"
                  name="tag"
                  onChange={updateValue}
                  required
                >
                  <option>General</option>
                  <option>Personal</option>
                  <option>Work</option>
                  <option>Relax</option>
                  <option>Task</option>
                  <option>List</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center px-2 text-gray-700">
                  <i className="fa-solid fa-caret-down"></i>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end align-middle mx-auto mt-6">
              <button aria-label="Submit new Note" type="submit">
                <span data-tooltip="Send" data-flow="bottom">
                  <i className="fa-regular hover:scale-x-110 fa-paper-plane fa-2xl text-[#495057]"></i>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Addnote;
