import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:8000";

  const startingNotes = [];
  const [notes, setnotes] = useState(startingNotes);

  // –––––––––––––––––––––––––– Get all notes of a user ––––––––––––––––––––––––––

  const getNotes = async () => {
    const url = `${host}/api/notes/allnotes`;
    // send request to server
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    // wait for response
    const json = await response.json();
    setnotes(json);
  };

  // –––––––––––––––––––––––––– Add new Note ––––––––––––––––––––––––––

  const addNote = async (title, description, tag) => {
    const url = `${host}/api/notes/addnote`;
    // send request to server
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      // send user data
      body: JSON.stringify({ title, description, tag }),
    });
    // wait for response
    const json = await response.json();
    setnotes(notes.concat(json));
    // send response
    return json;
  };

  // –––––––––––––––––––––––––– Delete Note ––––––––––––––––––––––––––

  const deleteNote = async (id) => {
    const url = `${host}/api/notes/deletenote/${id}`;
    // send request to server
    const response = await fetch(url, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    // wait for response
    const json = await response.json();
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newNote);
    // send response
    return json;
  };

  // –––––––––––––––––––––––––– Edit/Update Note ––––––––––––––––––––––––––

  const editNote = async (id, title, description, tag) => {
    const url = `${host}/api/notes/updatenote/${id}`;
    // send request to server
    const response = await fetch(url, {
      method: "PUT",
      mode: "cors",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      // send user data
      body: JSON.stringify({ title, description, tag }),
    });
    // wait for response
    const json = await response.json();
    // Copy the response and create a new note out of it
    const newNotes = JSON.parse(JSON.stringify(notes));
    // edit that new note
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        newNotes[index].date = Date.now();
        break;
      }
    }
    // set new updated note to notes array
    setnotes(newNotes);
    // send response
    return json;
  };

  // –––––––––––––––––––––––––– Search Note ––––––––––––––––––––––––––

  const [query, setQuery] = useState("");
  const searchResults = (q) => {
    setQuery(q);
  };

  // ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

  return (
    <noteContext.Provider
      value={{
        notes,
        addNote,
        deleteNote,
        editNote,
        getNotes,
        searchResults,
        query,
        setQuery,
      }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
