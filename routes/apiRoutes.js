// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information.
// ===============================================================================

const uniqid = require('uniqid');
// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET/POST/DELETE Requests

  app.get("/api/notes", function(req, res) {
    store.getNotes().then(notes => res.json(notes));
  });

  app.get("/api/notes", function(req, res) {
    store.addNotes(req.body).then(notes => res.json(notes));
  });

  app.delete("/api/notes/:id",function(req, res){
    store.deleteNote(req.params.id).then(notes=>res.json(notes)).then(()=> res.json({ ok: true }));
  });
}
  