const sql = require("../database");
// constructor
const Quotation = function(quotation) {
  this.EvaluationMethods_id = quotation.EvaluationMethods_id;
  this.Course_id = quotation.Course_id;
  this.percentage = quotation.percentage;
};

Quotation.create = (newQuotation, result) => {
  sql.query("INSERT INTO quotation SET ?", newQuotation, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newQuotation });
  });
};

Quotation.findAll = (Course_id, result) => {
  sql.query(`SELECT * FROM quotation WHERE Course_id = ?`, [Course_id], (err, res) => {
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

Quotation.findById = (id, result) => {
  sql.query(`SELECT * FROM quotation WHERE id = ?`, [id], (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

Quotation.updateById = (id, quotation, result) => {
  sql.query(
    "UPDATE quotation SET EvaluationMethods_id = ?, Course_id = ?, percentage = ? WHERE id = ?",
    [quotation.EvaluationMethods_id, quotation.Course_id, quotation.percentage, id],
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { id: id, ...quotation });
    }
  );
};

Quotation.remove = (id, result) => {
  sql.query("DELETE FROM quotation WHERE id = ?", id, (err, res) => {
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
module.exports = Quotation;
