import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import TextareaAutosize from "react-textarea-autosize";

function CreateArea(props) {
    const [note, setNote] = useState({
        title: "",
        content: "",
    });

    const [expandNoteArea, setNoteArea] = useState(false);

    function expand() {
        setNoteArea(true);
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setNote((prevValue) => {
            return {
                ...prevValue,
                [name]: value,
            };
        });
    }

    return (
        <div>
            <form className="create-note">
                {expandNoteArea && (
                    <input
                        name="title"
                        autoFocus={true}
                        onChange={handleChange}
                        value={note.title}
                        placeholder="Title"
                    />
                )}
                <TextareaAutosize
                    style={{ overflow: "hidden" }}
                    name="content"
                    onClick={expand}
                    onChange={handleChange}
                    value={note.content}
                    placeholder="Take a note..."
                    minRows={expandNoteArea ? 3 : 1}
                ></TextareaAutosize>
                <Zoom in={expandNoteArea}>
                    <Fab
                        onClick={(event) => {
                            props.addNote(note);
                            event.preventDefault();
                            setNote({ title: "", content: "" });
                        }}
                    >
                        <AddIcon />
                    </Fab>
                </Zoom>
            </form>
        </div>
    );
}

export default CreateArea;
