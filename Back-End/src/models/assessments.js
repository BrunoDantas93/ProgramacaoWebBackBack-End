const sql = require("../database");
// constructor
const Assessments = function(assessments) {
  this.grade = assessments.grade;
  this.Quotation_id = assessments.Quotation_id;
  this.Quotation_EvaluationMethods_id = assessments.Quotation_EvaluationMethods_id;
  this.Enrolled_id = assessments.Enrolled_id;
  this.Enrolled_Course_id = assessments.Enrolled_Course_id;
  this.Enrolled_Students_id = assessments.Enrolled_Students_id;
};

Assessments.create = (newAssessment, result) => {
  sql.query("INSERT INTO assessments SET ?", newAssessment, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newAssessment });
  });
};

Assessments.findAll = (Enrolled_Course_id, result) => {
  sql.query(`SELECT * FROM assessments WHERE Enrolled_Course_id = ?`, [Enrolled_Course_id], (err, res) => {
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

Assessments.updateById = (id, assessment, result) => {
  sql.query(
    "UPDATE assessments SET Grade = ?, Quotation_id = ? WHERE id = ?",
    [assessment.grade, assessment.Quotation_id, id],
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { id: id, ...assessment });
    }
  );
};

Assessments.remove = (id, result) => {
  sql.query("DELETE FROM assessments WHERE Quotation_id = ?", id, (err, res) => {
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

Assessments.removeByStudent = (id, result) => {
  sql.query("DELETE FROM assessments WHERE Enrolled_Students_id = ?", id, (err, res) => {
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

module.exports = Assessments;
