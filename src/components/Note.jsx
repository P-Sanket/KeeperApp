import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function Note(props) {
    return (
        <div className="note">
            <h1>{props.title}</h1>
            <p>{props.content}</p>

            <Zoom in={true}>
                <Fab
                    style={{ backgroundColor: "#eb5200" }}
                    onClick={() => {
                        props.deleteNote(props.id);
                    }}
                >
                    <DeleteIcon />
                </Fab>
            </Zoom>
            <Zoom in={true}>
                <Fab
                    style={{ backgroundColor: "#27ae60" }}
                    onClick={() => {
                        props.updateNote(props.id, props.title, props.content);
                    }}
                >
                    <EditIcon />
                </Fab>
            </Zoom>
        </div>
    );
}

export default Note;
