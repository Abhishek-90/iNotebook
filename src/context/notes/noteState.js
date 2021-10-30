import noteContext from "./noteContext";
import { useState, useEffect } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000/notes/";
  const initialNotes = [
    {
      _id: "617ba76baed26e8ff807b30f",
      user: "61796634a9b6a11255c56543",
      title: "To be Deleted3",
      description: "This note will be deleted.",
      tag: "General",
      date: "1635493739061",
      __v: 0,
    },
    {
      _id: "617ba76daed26e8ff807b311",
      user: "61796634a9b6a11255c56543",
      title: "To be Deleted3",
      description: "This note will be deleted.",
      tag: "General",
      date: "1635493741278",
      __v: 0,
    },
    {
      _id: "617ba76eaed26e8ff807b313",
      user: "61796634a9b6a11255c56543",
      title: "To be Deleted3",
      description: "This note will be deleted.",
      tag: "General",
      date: "1635493742452",
      __v: 0,
    },
    {
      _id: "617ba76faed26e8ff807b315",
      user: "61796634a9b6a11255c56543",
      title: "To be Deleted3",
      description: "This note will be deleted.",
      tag: "General",
      date: "1635493743255",
      __v: 0,
    },
    {
      _id: "617ba76faed26e8ff807b317",
      user: "61796634a9b6a11255c56543",
      title: "To be Deleted3",
      description: "This note will be deleted.",
      tag: "General",
      date: "1635493743889",
      __v: 0,
    },
    {
      _id: "617ba770aed26e8ff807b319",
      user: "61796634a9b6a11255c56543",
      title: "To be Deleted3",
      description: "This note will be deleted.",
      tag: "General",
      date: "1635493744451",
      __v: 0,
    },
    {
      _id: "617ba771aed26e8ff807b31b",
      user: "61796634a9b6a11255c56543",
      title: "To be Deleted3",
      description: "This note will be deleted.",
      tag: "General",
      date: "1635493745019",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(initialNotes);

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
    console.log("Addding Note");

    const response = await fetch(`${host}addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE3OTY2MzRhOWI2YTExMjU1YzU2NTQzIn0sImlhdCI6MTYzNTM5NjM4MH0.i3XP_RXeJGSNQaeyQo6citDtcvmRKTVTnQ1tS3XbbV8",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    return response.json();
  };

  const deleteNote = async (id) => {
    console.log(`Deleting Note: ${id}`);

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

  useEffect(() => {
    fetchNotes();
  }, []);




  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
