import React, { useContext, useState, useRef,useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useHistory } from "react-router";

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes,fetchNotes, editNote } = context;

  let history = useHistory();

  useEffect(() => {
    if(localStorage.getItem("authToken"))
      fetchNotes();
    else{
      history.push('/login');
    }
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (note) => {
    setNote({
      id: note._id,
      etitle: note.title,
      edescription: note.description,
      etag: note.tag,
    });
    ref.current.click();
  };

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const handleClick = async (e) => {
    // console.log("Updating Note\n",note);
    const response = await editNote(
      note.id,
      note.etitle,
      note.edescription,
      note.etag
    );
    console.log(response);
    if (response === 200) {
      props.showAlert("Note Edited", "success");
    } else {
      props.showAlert("Edit Failed", "danger");
    }
    refClose.current.click();
  };

  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />

      {true && (
        <button
          ref={ref}
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Launch demo modal
        </button>
      )}

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
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
                    minLength={5}
                    required={true}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onchange}
                    value={note.edescription}
                    minLength={5}
                    required={true}
                    rows={5}
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
                <button
                  ref={refClose}
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  disabled={
                    note.edescription.length < 5 || note.etitle.length < 5
                  }
                  type="button"
                  className="btn btn-primary"
                  onClick={handleClick}
                >
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2 className="my-4">Your Notes</h2>
      <div className="row">
        {notes.map((note) => {
          return (
            <NoteItem
              showAlert={props.showAlert}
              key={note._id}
              note={note}
              updateNote={updateNote}
            />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
