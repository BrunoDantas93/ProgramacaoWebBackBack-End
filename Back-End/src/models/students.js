const sql = require("../database");
// constructor
const Students = function(Student) {
  this.nostudent = Student.nostudent;
  this.email = Student.email;
  this.name = Student.name;
  this.surname = Student.surname;
  this.Degrees_id = Student.Degrees_id;
};

Students.create = (newStudent, result) => {
  sql.query("INSERT INTO students SET ?", newStudent, (err, res) => {
    if (err) {
      //console.log("error: ", err);
      result(err, null);
      return;
    }
    //console.log("created teacher: ", { id: res.insertId, ...newTeacher });
    result(null, { id: res.insertId, ...newStudent });
  });
};

Students.findAll = (result) => {
  sql.query(`SELECT * FROM students`, (err, res) => {
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

Students.findByDegreeId = (Degree_id, result) => {
  sql.query(`SELECT * FROM students where Degrees_id = ?`, [Degree_id], (err, res) => {
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
Students.email = (newStudent, result) => {
  sql.query(`SELECT * FROM students WHERE email = ?`, [newStudent.email], (err, res) => {
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

Students.nostudent = (newStudent, result) => {
  sql.query(`SELECT * FROM students WHERE nostudent = ?`, [newStudent.nostudent], (err, res) => {
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


Students.updateById = (id, student, result) => {
  sql.query(
    "UPDATE students SET nostudent = ?, email = ?, name = ?, surname = ?, Degrees_id = ? WHERE id = ?",
    [student.nostudent, student.email, student.name, student.surname, student.Degrees_id, id],
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { id: id, ...student });
    }
  );
};
module.exports = Students;
