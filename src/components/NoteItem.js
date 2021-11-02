import React,{useContext} from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const {deleteNote} = context; 
  const {note,updateNote} = props
  
  const handleDelete = async ()=>{

    const response = await deleteNote(note._id);

    if(response === 200){
      props.showAlert("Note Deleted","success");
    }
    else{
      props.showAlert("Deletion Failed","danger");
    }
  }
  
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="row">
            <h5 className="card-title">{note.title}</h5>
            <h6><span className="badge bg-secondary">{note.tag}</span></h6>
          </div>
          <p className="card-text">{note.description} </p>
          <i className="fas fa-trash-alt mx-2" onClick={handleDelete}></i>
          <i className="far fa-edit mx-2" onClick={()=>updateNote(note)}></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
