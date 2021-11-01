import noteContext from "./noteContext";
import { useState, useEffect } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000/notes/";

  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {

    const response = await fetch(`${host}fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE3OTY2MzRhOWI2YTExMjU1YzU2NTQzIn0sImlhdCI6MTYzNTM5NjM4MH0.i3XP_RXeJGSNQaeyQo6citDtcvmRKTVTnQ1tS3XbbV8",
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
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE3OTY2MzRhOWI2YTExMjU1YzU2NTQzIn0sImlhdCI6MTYzNTM5NjM4MH0.i3XP_RXeJGSNQaeyQo6citDtcvmRKTVTnQ1tS3XbbV8",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json()
    // console.log(json);
    setNotes(notes.concat(json.note));
  };

  const deleteNote = async (id) => {
    // console.log(`Deleting Note: ${id}`);

    //Deleting on Client Side
    setNotes(notes.filter((note) => note._id !== id));

    //Deleting on Database
    const response = await fetch(`${host}deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE3OTY2MzRhOWI2YTExMjU1YzU2NTQzIn0sImlhdCI6MTYzNTM5NjM4MH0.i3XP_RXeJGSNQaeyQo6citDtcvmRKTVTnQ1tS3XbbV8",
      },
    });

    return response.json();
  };

  const editNote = async (id,title,description,tag) => {
    // console.log(`Updating Note: ${id}`);

    const response = await fetch(`${host}updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE3OTY2MzRhOWI2YTExMjU1YzU2NTQzIn0sImlhdCI6MTYzNTM5NjM4MH0.i3XP_RXeJGSNQaeyQo6citDtcvmRKTVTnQ1tS3XbbV8",
      },
      body: JSON.stringify({ title:title, description:description, tag:tag }),
    });
    const json = await response.json();
    // eslint-disable-next-line
    // console.log(json)

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
