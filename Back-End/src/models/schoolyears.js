const sql = require("../database");
// constructor
const SchoolYear = function(schoolyear) {
  this.label = schoolyear.label;
};

SchoolYear.create = (schoolyear, result) => {
  sql.query("INSERT INTO schoolyear SET ?", schoolyear, (err, res) => {
    if (err) {
      //console.log("error: ", err);
      result(err, null);
      return;
    }
    //console.log("created teacher: ", { id: res.insertId, ...newTeacher });
    result(null, { id: res.insertId, ...schoolyear });
  });
};

SchoolYear.findAll = (result) => {
  sql.query(`SELECT * FROM schoolyear`, (err, res) => {
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

SchoolYear.updateById = (id, schoolYear, result) => {
  sql.query(
    "UPDATE schoolyear SET label = ? WHERE id = ?",
    [schoolYear.label, id],
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
      result(null, { id: id, ...schoolYear });
    }
  );
};
module.exports = SchoolYear;
