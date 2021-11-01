import React, { useContext,useState,useRef } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(noteContext);
  const {notes,editNote} = context;
  const ref = useRef(null);
  const refClose = useRef(null);
  
  const updateNote = (note) => {
    setNote({id:note._id,etitle:note.title,edescription:note.description,etag:note.tag});
    ref.current.click();
  }

  const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:""});

  const handleClick = (e)=>{
    console.log("Updating Note\n",note);
    editNote(note.id,note.etitle,note.edescription,note.etag);
    refClose.current.click();
  }

  const onchange = (e)=>{
      setNote({...note,[e.target.name]: e.target.value})
  }

  return (
    <>
      <AddNote />

      {true && <button ref = {ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>}

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="etitle" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="etitle"
                  name="etitle"
                  onChange={onchange}
                  value={note.etitle}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="edescription" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="edescription"
                  name="edescription"
                  onChange={onchange}
                  value={note.edescription}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="etag" className="form-label">
                  Tag
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="etag"
                  name="etag"
                  onChange={onchange}
                  value={note.etag}
                />
              </div>
            </form>
              <div className="modal-footer">
                <button ref = {refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2 className="my-4">Your Notes</h2>
      <div className="row">
        {notes.map((note) => {
          return <NoteItem key={note._id} note={note} updateNote={updateNote}/>;
        })}
      </div>
    </>
  );
};

export default Notes;
