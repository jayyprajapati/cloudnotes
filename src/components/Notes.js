import React, { useContext, useEffect, useState, useRef } from "react";
import Noteitem from "./Noteitem";
import noteContext from "./context/notes/noteContext";
import credContext from "./context/credentials/credContext";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";
import EmptyNotes from "./EmptyNotes";
import DeleteModal from "./modals/DeleteModal";
import EditModal from "./modals/EditModal";

function Notes() {
  const [isContentLoading, setIsContentLoading] = useState(false);
  // Load the user note after login
  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (notes.length === 0) {
        // loadWhileNoContent("notes");
        setIsContentLoading(true);
      }
      getNotes().then(() => {
        // stopLoading("notes");
        setIsContentLoading(false);
        setQuery("");
      });
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
  const { showAlert, alert, loadingElement } =
    credcontext;

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
          <EditModal
            editOnServer={editNoteOnServer}
            note={note}
            setShowModal={setShowModal}
            updateValue={updateValue}
          />
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
          <DeleteModal
            delOnServer={deleteNoteOnServer}
            title={delNoteDetails.title}
            setShowDelModal={setShowDelModal}
          />
        ) : null}
      </div>

      {isContentLoading ? 
        <i
        id="#load"
        className={`fa-solid flex fa-spinner animate-spin text-[50px] my-10 text-gray-500 justify-center`}
      ></i> : 
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
      }
    </>
  );
}

export default Notes;
