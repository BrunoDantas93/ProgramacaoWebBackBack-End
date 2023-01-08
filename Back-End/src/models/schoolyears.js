const sql = require("../database");
// constructor
const SchoolYear = function(schoolyear) {
  this.label = schoolyear.label;
};

SchoolYear.create = (schoolyear, result) => {
  sql.query("INSERT INTO schoolyear SET ?", schoolyear, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...schoolyear });
  });
};

SchoolYear.findAll = (result) => {
  sql.query(`SELECT * FROM schoolyear`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

SchoolYear.updateById = (id, schoolYear, result) => {
  sql.query(
    "UPDATE schoolyear SET label = ? WHERE id = ?",
    [schoolYear.label, id],
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { id: id, ...schoolYear });
    }
  );
};
module.exports = SchoolYear;
