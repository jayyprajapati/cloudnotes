import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:8000";
  const startingNotes = [];

  const [notes, setnotes] = useState(startingNotes);

  const getNotes = async () => {
    const url = `${host}/api/notes/allnotes`;
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setnotes(json);
  };

  const addNote = async (title, description, tag) => {
    const url = `${host}/api/notes/addnote`;
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const newnote = await response.json();

    setnotes(notes.concat(newnote));
  };

  const deleteNote = async (id) => {
    const url = `${host}/api/notes/deletenote/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    await response.json();
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newNote);
  };

  const editNote = async (id, title, description, tag) => {
    const url = `${host}/api/notes/updatenote/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      mode: "cors",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    await response.json();

    const newNotes = JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setnotes(newNotes);
    return;
  };

  return (
    <noteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
