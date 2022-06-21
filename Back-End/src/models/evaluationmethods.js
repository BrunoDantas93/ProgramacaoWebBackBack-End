const sql = require("../database");
// constructor
const EvaluationMethods = function(evaluationMethod) {
  this.label = evaluationMethod.label;
};

EvaluationMethods.create = (newEvaluationMethods, result) => {
  sql.query("INSERT INTO evaluationmethods SET ?", newEvaluationMethods, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newEvaluationMethods });
  });
};

EvaluationMethods.findAll = (result) => {
  sql.query(`SELECT * FROM evaluationmethods`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res);
      return;
    }
    // not found Teachers with the id
    result({ kind: "not_found" }, null);
  });
};

EvaluationMethods.updateById = (id, evaluationmethod, result) => {
  sql.query(
    "UPDATE evaluationmethods SET label = ? WHERE id = ?",
    [evaluationmethod.label, id],
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { id: id, ...evaluationmethod });
    }
  );
};
module.exports = EvaluationMethods;
