import React, { useState } from "react";
import Updates from "./UpDates";
import AddForm from "./AddForm";
import NoteList from "./NoteList";

export default function Crud() {
    const [notes, setNotes] = useState([]);

    const getAllNotes = () => {
        fetch(process.env.REACT_APP_CRUD_URL)
            .then((response) => response.json())
            .then((notes) => {
                setNotes(notes);
            });
    };

    const addNote = (note) => {
        fetch(process.env.REACT_APP_CRUD_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(note),
        }).then(() => getAllNotes());
    };

    const deleteNote = (id) => {
        fetch(`${process.env.REACT_APP_CRUD_URL}/${id}`, {
            method: "DELETE",
        }).then(() => getAllNotes());
    };

    return (
        <div className="Crud">
            <Updates getAllNotes={getAllNotes} />
            <NoteList notes={notes} deleteNote={deleteNote} />
            <AddForm addNote={addNote} />
        </div>
    );
}