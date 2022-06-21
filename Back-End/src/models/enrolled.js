const sql = require("../database");
// constructor
const Enrolled = function(enrolled) {
  this.Course_id = enrolled.Course_id;
  this.Students_id = enrolled.Students_id;
};

Enrolled.create = (newEnrolled, result) => {
  sql.query("INSERT INTO enrolled SET ?", newEnrolled, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newEnrolled });
  });
};

Enrolled.findAll = (Course_id, result) => {
  sql.query(`SELECT * FROM enrolled WHERE Course_id = ?`, [Course_id], (err, res) => {
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

Enrolled.removeByStudent = (id, result) => {
  sql.query("DELETE FROM enrolled WHERE Students_id = ?", id, (err, res) => {
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
    console.log("deleted student with id: ", id);
    result(null, res);
  });
};


module.exports = Enrolled;
