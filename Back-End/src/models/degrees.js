const sql = require("../database");
// constructor
const Degrees = function(degree) {
  this.name = degree.name;
};

Degrees.create = (newDegree, result) => {
  sql.query("INSERT INTO degrees SET ?", newDegree, (err, res) => {
    if (err) {
      //console.log("error: ", err);
      result(err, null);
      return;
    }
    //console.log("created teacher: ", { id: res.insertId, ...newTeacher });
    result(null, { id: res.insertId, ...newDegree });
  });
};

Degrees.findAll = (result) => {
  sql.query(`SELECT * FROM degrees`, (err, res) => {
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

Degrees.updateById = (id, degree, result) => {
  sql.query(
    "UPDATE degrees SET name = ? WHERE id = ?",
    [degree.name, id],
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
      result(null, { id: id, ...degree });
    }
  );
};
module.exports = Degrees;
