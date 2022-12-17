import React, { useContext, useEffect, useState, useRef } from "react";
import Noteitem from "./Noteitem";
import noteContext from "./context/notes/noteContext";
import credContext from "./context/credentials/credContext";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";

function Notes() {
  // Access note context and note states
  const context = useContext(noteContext);
  const { notes, getNotes, editNote, deleteNote } = context;

  // Access credentials context and credentials states
  const credcontext = useContext(credContext);
  const { showAlert, alert } = credcontext;

  // navigate functionality to navigate from one endpoint to another
  let navigate = useNavigate();

  // edit modal states
  const [showModal, setShowModal] = useState(false);

  // note states
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "General",
  });

  // Ref for edit button
  const ref = useRef(null);

  // Ref for delete button
  const delref = useRef(null);

  // Open edit modal WHEN button triggered by each edit icon
  const updateNote = (currentNote) => {
    // click edit button using ref and open edit modal
    ref.current.click();

    // set new note attribute values to note state
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  // Delete note WHEN button triggered by each delete icon
  const delNote = async (id) => {
    delref.current.click();
    const json = await deleteNote(id);
    const status = json.success ? "success" : "Error";
    showAlert(json.message, status);
  };

  // Update each field value whenever user types a new char in field
  const updateValue = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  // Handle click to edit note by fetching the details from server
  const handleClick = async (e) => {
    e.preventDefault();
    const json = await editNote(
      note.id,
      note.etitle,
      note.edescription,
      note.etag
    );
    setShowModal(false);
    const status = json.success ? "success" : "Error";
    showAlert(json.message, status);
  };

  // Load the user note after login
  useEffect(() => {
    if (localStorage.getItem("token")) {
      (async () => {
        await getNotes();
      })();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {alert && <Alert alert={alert} />}
      <button className="hidden" ref={delref} type="button" onClick={delNote}>
        Button to trigger deleteNote function
      </button>
      <h1 className=" flex flex-wrap font-Montserrat justify-center mt-16 my-5 text-xl  tracking-tight leading-none text-[#393E46] md:text-4xl lg:text-4xl">
        Your{" "}
        <mark className="mx-4 px-2 text-white bg-[#FFC23C] rounded">Notes</mark>
      </h1>
      <hr className="my-2 mx-auto w-48 h-1 bg-[#515150] rounded border-0"></hr>
      <div className="">
        <button
          className="hidden transition
          delay-1500
          duration-150
          ease-in-out"
          ref={ref}
          type="button"
          onClick={() => setShowModal(true)}
        >
          Button to show Edit Modal
        </button>

        {showModal ? (
          <>
            <div className="bg-black bg-opacity-50 absolute z-50 justify-center items-center inset-0">
              <div className="absolute flex justify-center items-center inset-0  my-2 mx-auto">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[450px] bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 rounded-t ">
                    <h3 className="text-xl font-Montserrat">
                      <i className="fa-solid fa-pencil fa-md"></i>&nbsp; Edit
                      Note
                    </h3>
                    <button
                      className="bg-transparent border-0 text-black float-right"
                      onClick={() => setShowModal(false)}
                    >
                      <span className=" opacity-7 block">
                        <i className="fa-solid fa-xmark fa-xl"></i>
                      </span>
                    </button>
                  </div>

                  <hr className="  w-full h-1 bg-[#fcd581] rounded border-0"></hr>

                  <div className="my-4 px-4">
                    <form
                      action="/"
                      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                    >
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="etitle"
                        >
                          Title
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="etitle"
                          type="text"
                          value={note.etitle}
                          onChange={updateValue}
                          name="etitle"
                          autoComplete="off"
                        />
                      </div>
                      <div className="mb-6">
                        <label
                          htmlFor="edescription"
                          className="block mb-2 mt-2 text-sm font-bold text-gray-700"
                        >
                          Description
                        </label>
                        <textarea
                          id="edescription"
                          name="edescription"
                          rows="4"
                          value={note.edescription}
                          onChange={updateValue}
                          autoComplete="off"
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                        ></textarea>
                      </div>
                      <div className="w-full  px-3 mb-6 md:mb-0">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="etag"
                        >
                          Tag
                        </label>
                        <div className="relative">
                          <select
                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="etag"
                            name="etag"
                            onChange={updateValue}
                          >
                            <option>Do not Change</option>
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
                    </form>
                  </div>
                  <div className="flex items-center justify-end p-6 ">
                    <button
                      className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={handleClick}
                    >
                      <i className="fa-solid fa-check fa-2xl"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
      <div className=" grid lg:grid-cols-3 md:grid-cols-2 content-evenly grid-cols-1 grid-flow-row my-8">
        {notes.map((note, i) => {
          return (
            <div className="flex" key={i}>
              <Noteitem note={note} updateNote={updateNote} delNote={delNote} />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Notes;
