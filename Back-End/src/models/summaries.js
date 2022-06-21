const sql = require("../database");
// constructor
const Summaries = function(summaries) {
  this.title = summaries.title;
  this.date = summaries.date;
  this.description = summaries.description;
  this.Course_id = summaries.Course_id;
};

Summaries.create = (newSummaries, result) => {
  sql.query("INSERT INTO summaries SET ?", newSummaries, (err, res) => {
    if (err) {
      //console.log("error: ", err);
      result(err, null);
      return;
    }
    //console.log("created teacher: ", { id: res.insertId, ...newTeacher });
    result(null, { id: res.insertId, ...newSummaries });
  });
};

Summaries.findAll = (Course_id, result) => {
  sql.query(`SELECT * FROM summaries WHERE Course_id = ?`, [Course_id], (err, res) => {
    if (err) {
      //console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      //console.log("found teacher: ", res[0]);
      result(null, res);
      return;
    }
    // not found Teachers with the id
    result({ kind: "not_found" }, null);
  });
};

Summaries.updateById = (id, summaries, result) => {
  sql.query(
    "UPDATE summaries SET title = ?, date = ?, description = ? WHERE id = ?",
    [summaries.title, summaries.date, summaries.description, id],
    (err, res) => {
      if (err) {
        //console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Teachers with the id
        result({ kind: "not_found" }, null);
        return;
      }
      //console.log("updated Teachers: ", { id: id, ...Teachers });
      result(null, { id: id, ...summaries });
    }
  );
};

Summaries.remove = (id, result) => {
  sql.query("DELETE FROM summaries WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted summary with id: ", id);
    result(null, res);
  });
};
module.exports = Summaries;
