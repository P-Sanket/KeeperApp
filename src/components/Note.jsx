import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
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
            props.onClick(props.id);
          }}
        >
          <DeleteIcon />
        </Fab>
      </Zoom>
    </div>
  );
}

export default Note;
