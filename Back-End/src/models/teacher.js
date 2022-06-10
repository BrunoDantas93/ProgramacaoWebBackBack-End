const sql = require("../database");
// constructor
const Teachers = function(teacher) {
  this.email = teacher.email;
  this.password = teacher.password;
  this.name = teacher.name;
  this.surname = teacher.surname;
  this.noteacher = teacher.noteacher;
};

Teachers.create = (newTutorial, result) => {
  sql.query("INSERT INTO teachers SET ?", newTutorial, (err, res) => {
    if (err) {
      //console.log("error: ", err);
      result(err, null);
      return;
    }
    //console.log("created teacher: ", { id: res.insertId, ...newTutorial });
    result(null, { id: res.insertId, ...newTutorial });
  });
};

Teachers.findById = (id, result) => {
  sql.query(`SELECT * FROM teachers WHERE id = ${id}`, (err, res) => {
    if (err) {
      //console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      //console.log("found teacher: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Teachers with the id
    result({ kind: "not_found" }, null);
  });
};

Teachers.updateById = (id, teacher, result) => {
  sql.query(
    "UPDATE teachers SET email = ?, password = ?, name = ?, surname = ?, noteacher = ? WHERE id = ?",
    [teacher.email, teacher.password, teacher.name, teacher.surname, teacher.noteacher, id],
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
      result(null, { id: id, ...Teachers });
    }
  );
};
module.exports = Teachers;
