import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNote] = useState([]);

  function handleAddNote(note) {
    setNote((prevNotes) => {
      return [...prevNotes, note];
    });
  }

  function deleteNote(id) {
    setNote((prevNotes) => {
      return prevNotes.filter((note, index) => {
        return index !== id;
      });
    });
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
