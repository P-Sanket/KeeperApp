import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function useGetAllHook() {
    const [notes, setNote] = useState([]);
    //fetches all the notes to render
    axios
        .get("/api/getAll")
        .then((res) => {
            if (res.status === 200) {
                setNote(res.data.notes);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    return notes;
}

function App() {
    const notes = useGetAllHook();

    function handleAddNote(newNote) {
        axios
            .post("/api/addNote", newNote)
            .then((res) => {})
            .catch((res) => {
                console.log(res);
            });
    }

    function deleteNote(id) {
        // setNote((prevNotes) => {
        //     return prevNotes.filter((note, index) => {
        //         return index !== id;
        //     });
        // });
    }

    return (
        <div>
            <Header />
            <CreateArea addNote={handleAddNote} />
            {notes.map((note, index) => {
                return (
                    <Note
                        key={index}
                        id={index}
                        onClick={deleteNote}
                        title={note.title}
                        content={note.content}
                    />
                );
            })}
            <Footer />
        </div>
    );
}

export default App;
