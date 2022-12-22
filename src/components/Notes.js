import React, { useContext, useEffect, useState, useRef } from "react";
import Noteitem from "./Noteitem";
import noteContext from "./context/notes/noteContext";
import credContext from "./context/credentials/credContext";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";
import EmptyNotes from "./EmptyNotes";

function Notes() {
  // Load the user note after login
  useEffect(() => {
    if (localStorage.getItem("token")) {
      (async () => {
        if (notes.length === 0) {
          document.getElementById("#notes")?.classList.add("hidden");
          document.getElementById("#load")?.classList.remove("hidden");
          document.getElementById("#load")?.classList.add("animate-spin");
          document.getElementById("#load")?.classList.add("flex");
        }
        //
        await getNotes();
        // setLoader(true);
        document.getElementById("#notes")?.classList.remove("hidden");
        document.getElementById("#load")?.classList.add("hidden");
        setQuery("");
      })();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
  // navigate functionality to navigate from one endpoint to another
  let navigate = useNavigate();

  // Access note context and note states
  const context = useContext(noteContext);
  const { notes, getNotes, editNote, deleteNote, query, setQuery } = context;

  // Access credentials context and credentials states
  const credcontext = useContext(credContext);
  const { showAlert, alert, loadingElement } = credcontext;

  // const [loader, setLoader] = useState(false);
  // note states
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "General",
  });

  // –––––––––––––––––––––– Edit Modal Functionality ––––––––––––––––––––––––
  // Edit Modal Reference Button
  const ref = useRef(null);

  // Edit modal states
  const [showModal, setShowModal] = useState(false);

  // Function calls and displays Edit modal when Edit icon is clicked.
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

  // Update each field value whenever user types a new char in field
  const updateValue = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  // Edit function called on server side after user make changes and clicks update in modal.
  const editNoteOnServer = async (e) => {
    e.preventDefault();
    loadingElement("load", "editIcon", "editBtn");
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

  // –––––––––––––––––––––– Delete Modal Functionality ––––––––––––––––––––––––

  // Delete Modal reference Button
  const deleteModalRef = useRef(null);

  const [showDelModal, setShowDelModal] = useState(false);
  const [delNoteDetails, setDelNoteDetails] = useState({ id: "", title: "" });

  // Function calls and displays delete warning modal when delete icon is clicked.
  const deleteModal = (id, title) => {
    deleteModalRef.current.click();
    setDelNoteDetails({ id, title });
  };

  // Delete function called on server side after user confirms delete in modal.
  const deleteNoteOnServer = async () => {
    loadingElement("load", "delIcon", "delBtn");
    const json = await deleteNote(delNoteDetails.id);
    setShowDelModal(false);
    const status = json.success ? "success" : "Error";
    showAlert(json.message, status);
  };

  // –––––––––––––––––––––– Search Bar Functionality ––––––––––––––––––––––––
  const getFilteredNotes = (query, notes) => {
    if (!query) return notes;
    return notes.filter((note) => note.title?.toLowerCase().includes(query));
  };

  const filteredNotes = getFilteredNotes(query, notes);

  // ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

  return (
    <>
      {/* Show Alert if required */}
      {alert && <Alert alert={alert} />}

      {/* Your Notes Title */}
      <h1 className=" flex flex-wrap font-Montserrat justify-center mt-16 my-5 text-4xl  tracking-tight leading-none text-[#393E46]">
        Your{" "}
        <mark className="mx-4 px-2 text-white bg-[#FFC23C] rounded">Notes</mark>
      </h1>
      <hr className="my-2 mx-auto w-48 h-1 bg-[#515150] rounded border-0"></hr>

      {/* Edit Modal */}
      <div>
        {/* Hidden Modal Button */}
        <button
          className="hidden transition
          delay-1500
          duration-150
          ease-in-out"
          ref={ref}
          type="button"
          onClick={() => setShowModal(true)}
          aria-label="Trigger Edit Modal Button"
        >
          Button to show Edit Modal
        </button>

        {/* Modal Content */}
        {showModal ? (
          <>
            <div className="bg-black bg-opacity-50 fixed z-50 justify-center items-center left-1/2 ml-[-50%] inset-0">
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
                      aria-label="Close Button"
                      type="button"
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
                      id="#editBtn"
                      className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                      onClick={editNoteOnServer}
                    >
                      <i
                        id="#load"
                        className="fa-solid opacity-60 hidden fa-spinner"
                      ></i>
                      <i
                        id="#editIcon"
                        className="fa-regular  fa-circle-check"
                      ></i>
                      &nbsp; Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>

      {/* Delete Modal */}
      <div>
        {/*Hidden Modal Button */}
        <button
          className="hidden transition
          delay-1500
          duration-150
          ease-in-out"
          ref={deleteModalRef}
          type="button"
          onClick={() => setShowDelModal(true)}
          aria-label="Trigger Delete Modal Button"
        >
          Button to show Delete Modal
        </button>

        {/* Modal Content */}
        {showDelModal ? (
          <>
            <div className="bg-black bg-opacity-50 fixed z-50 justify-center items-center left-1/2 ml-[-50%] inset-0">
              <div className="absolute flex justify-center items-center inset-0  my-2 mx-auto">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-5/6 md:w-1/2 bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between gap-6 p-5 rounded-t ">
                    <h3 className="text-xl font-Montserrat">
                      Are you sure you want to{" "}
                      <span className="text-red-600">Delete</span> this note?
                    </h3>
                    <button
                      className="bg-transparent border-0 text-black float-right"
                      onClick={() => setShowDelModal(false)}
                      aria-label="Close Button"
                      type="button"
                    >
                      <span className=" opacity-7 block">
                        <i className="fa-solid fa-xmark fa-xl"></i>
                      </span>
                    </button>
                  </div>

                  <hr className="  w-full h-1 bg-[#fcd581] rounded border-0"></hr>
                  <div className="flex justify-center">
                    <h2 className="m-5 font-bold text-gray-500 font-Montserrat">
                      {delNoteDetails.title}
                    </h2>
                  </div>
                  <div className="flex items-center justify-center gap-5 p-6 ">
                    <button
                      className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                      onClick={() => setShowDelModal(false)}
                    >
                      <i className="fa-solid fa-xmark"></i>&nbsp; Cancel
                    </button>
                    <button
                      id="#delBtn"
                      className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
                      onClick={deleteNoteOnServer}
                    >
                      <i
                        id="#load"
                        className="fa-solid opacity-60 hidden fa-spinner"
                      ></i>
                      <i id="#delIcon" className="fa-regular fa-trash-can"></i>
                      &nbsp; Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>

      <i
        id="#load"
        className={`fa-solid hidden fa-spinner text-[50px] my-10 text-gray-500 justify-center`}
      ></i>

      <div id="#notes">
        {/* Show Empty notes GIF when no notes available */}
        {notes.length === 0 && <EmptyNotes />}

        {/* Display Notes */}
        <div className=" grid lg:grid-cols-3 md:grid-cols-2 content-evenly grid-cols-1 grid-flow-row gap-6 my-8 mx-5">
          {filteredNotes.map((note, i) => {
            return (
              <div className="flex" key={i}>
                <Noteitem
                  note={note}
                  updateNote={updateNote}
                  delNote={deleteModal}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Notes;
