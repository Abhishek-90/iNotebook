import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";

const Notes = () => {
  const notesList = useContext(noteContext);

  return (
    <div className="row">
      {notesList.notes.map((note) => {
        return ( 
        <NoteItem key={note._id} note={note}/>
        );
      })}
    </div>
  );
};

export default Notes;
