import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

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

    return (
        <div>
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
                        <textarea
                            name="content"
                            onChange={handleChange}
                            value={note.content}
                            placeholder="Take a note..."
                            rows="3"
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default UpdateNote;
