//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//DB Connection Settings and Setup
const url =
    "mongodb+srv://dbAdmin:Vp595nRHGcAYO7AB@learningcluster.jwqrf.mongodb.net/notesDB?retryWrites=true&w=majority";
const connectionProperties = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const noteSchema = new mongoose.Schema({
    title: String,
    content: String,
    date: Date,
});

const Note = mongoose.model("Note", noteSchema);

//Routing for the App
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/addNote", (req, res) => {
    //Connect to the DB
    mongoose.connect(url, connectionProperties);
    //Create a new Note Object
    const newNote = new Note({
        title: req.body.title,
        content: req.body.content,
        date: new Date(),
    });

    //finally post it to the database and close connection
    newNote.save((err) => {
        //handle any errors along the way
        if (err) {
            res.status(err.status).json(err);
        } else {
            res.status(200).json("Success");
        }
    });
});

//get all the notes in the DB
app.get("/api/getAll", (req, res) => {
    //Connect to the DB
    mongoose.connect(url, connectionProperties);

    //Fetch all the notes from the DB
    Note.find({}, (err, foundNotes) => {
        if (err) {
            mongoose.connection.close();
            res.status(err.status).json(err);
        } else {
            res.status(200).json({
                notes: foundNotes,
                length: foundNotes.length,
            });
        }
    });
});

//deletes a specific note based on ID
app.delete("/api/deleteNote", (req, res) => {
    //connect to DB
    mongoose.connect(url, connectionProperties);

    //delete the required Note
    Note.deleteOne({ _id: Object(req.body.noteId) }, (err) => {
        if (err) {
            mongoose.connection.close();
            res.status(err.status).json(err);
        } else {
            res.status(200).json("Success");
        }
    });
});

//patches a specific Note based on ID
app.patch("/api/updateNote", (req, res) => {
    //connect to DB
    mongoose.connect(url, connectionProperties);

    //update the database
    Note.findByIdAndUpdate(
        Object(req.body.data.noteUpdate.id),
        {
            title: req.body.data.noteUpdate.title,
            content: req.body.data.noteUpdate.content,
            date: new Date(),
        },
        { useFindAndModify: true },
        (err) => {
            if (err) {
                mongoose.connection.close();
                res.status(err.status).json(err);
            } else {
                res.status(200).json("Success");
            }
        }
    );
});

app.listen(process.env.port || 5000, () => {
    console.log("Server started on port 5000");
});
