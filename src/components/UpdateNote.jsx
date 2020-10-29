import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import axios from "axios";
import DoneIcon from "@material-ui/icons/Done";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import TextareaAutosize from "react-textarea-autosize";

function UpdateNote(props) {
    const [open, setOpen] = useState(props.open);
    const [note, setUpdatedNote] = useState({
        id: props.updateNote.id,
        title: props.updateNote.title,
        content: props.updateNote.content,
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setUpdatedNote((prevValue) => {
            return {
                ...prevValue,
                [name]: value,
            };
        });
    }

    function handleClose() {
        setOpen(false);
        props.setUpdateNoteState(false);
    }

    function handleUpdate() {
        axios
            .patch("/api/updateNote", { data: { noteUpdate: note } })
            .then((res) => {})
            .catch((err) => {
                console.log(err);
            });
        setOpen(false);
        props.setUpdateNoteState(false);
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogContent>
                <form className="create-note">
                    <input
                        name="title"
                        autoFocus={true}
                        onChange={handleChange}
                        value={note.title}
                        placeholder="Title"
                    />
                    <TextareaAutosize
                        style={{ overflow: "hidden" }}
                        name="content"
                        onChange={handleChange}
                        value={note.content}
                        placeholder="Take a note..."
                        minRows={3}
                    ></TextareaAutosize>
                    <Zoom in={true}>
                        <Fab
                            onClick={handleUpdate}
                            style={{ backgroundColor: "#27ae60" }}
                        >
                            <DoneIcon />
                        </Fab>
                    </Zoom>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default UpdateNote;
