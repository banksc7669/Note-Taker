// Importing File System and Utilities module 
const fs = require('fs');
const util = require('util');

// Convert callback based methods to 
const uniqid = require('uniqid');

// Convert callback based methods to  
// promise based methods 
const writeFileAsync = util.promisify(fs.writeFile)
const readFileAsync = util.promisify(fs.readFile)

class Store {
    //add read and write functions   
    read() {
        return readFileAsync("db/db.json", "utf8");
    };

    write(note) {
        return writeFileAsync("db/db.json", JSON.stringify(note));
    };

    //get notes
    getNotes() {
        return this.read()
            .then((notes) => {

                let parsedNote;
                try {
                    parsedNote = [].concat(JSON.parse(notes));
                } catch (err) {
                    parsedNote = [];
                }
                return parsedNote
            });
    };

    //add notes
    addNotes(note) {
        const { title, text } = note;

        const newNote = { title, text, id: uuidv1() };
        console.log('newNote:', newNote)

        //the notes with the new note
        return this.getNotes()
            .then((notes) => [...notes, newNote])
            .then((updatedNotes) => this.write(updatedNotes))
            .then(() => newNote)
    };

    //delete notes
    removeNotes(id) {
        return this.read().then(notes => {
            console.log('notes:', notes)
            const filteredNotes = JSON.parse(notes).filter(note => {
                return note.id !== id
            })
            this.write(filteredNotes)
            return filteredNotes;
        })

    };
};

module.exports = new Store()