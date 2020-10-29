import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import UpdateNote from "./UpdateNote";

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
    const [updateNoteDetails, setUpdateNoteState] = useState({
        state: false,
        id: "",
        title: "",
        content: "",
    });

    function handleAddNote(newNote) {
        axios
            .post("/api/addNote", newNote)
            .then((res) => {})
            .catch((err) => {
                console.log(err);
            });
    }

    function deleteNote(id) {
        axios
            .delete("/api/deleteNote", { data: { noteId: id } })
            .then((res) => {})
            .catch((err) => {
                console.log(err);
            });
    }

    function updateNote(id, title, content) {
        setUpdateNoteState(() => {
            return {
                state: true,
                id: id,
                title: title,
                content: content,
            };
        });
    }

    return (
        <div>
            <Header />
            <CreateArea addNote={handleAddNote} />
            {updateNoteDetails.state && (
                <UpdateNote
                    open={true}
                    updateNote={updateNoteDetails}
                    setUpdateNoteState={setUpdateNoteState}
                />
            )}
            {notes.map((note) => {
                return (
                    <Note
                        key={note._id}
                        id={note._id}
                        deleteNote={deleteNote}
                        updateNote={updateNote}
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
