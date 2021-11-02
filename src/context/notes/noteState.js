import noteContext from "./noteContext";
import { useState, useEffect } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000/notes/";

  const [notes, setNotes] = useState([]);
  const token = localStorage.getItem("authToken");
  const fetchNotes = async () => {

    const response = await fetch(`${host}fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":token,
      },
    });

    const json = await response.json();
    setNotes(json);

    // return response.json();
  };
  //Adding Notes to our existing list of Notes
  const addNote = async ({ title, description, tag }) => {

    const response = await fetch(`${host}addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":token,
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json()
    setNotes(notes.concat(json.note));
  };

  const deleteNote = async (id) => {
    //Deleting on Client Side
    setNotes(notes.filter((note) => note._id !== id));

    //Deleting on Database
    const response = await fetch(`${host}deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    
    return response.status;
  };

  const editNote = async (id,title,description,tag) => {
    const response = await fetch(`${host}updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":token,
      },
      body: JSON.stringify({ title:title, description:description, tag:tag }),
    });
    const json = await response.json();
    // eslint-disable-next-line
  
    const newNote = JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if(element._id === id){
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;      
      }
    }
    setNotes(newNote);
    return response.status;
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote,fetchNotes }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
