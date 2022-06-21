const sql = require("../database");
// constructor
const Courses = function(courses) {
  this.name = courses.name;
  this.SchoolYear_id = courses.SchoolYear_id;
  this.Teachers_id = courses.Teachers_id;
  this.Degrees_id = courses.Degrees_id;
};

Courses.create = (newCourses, result) => {
  sql.query("INSERT INTO course SET ?", newCourses, (err, res) => {
    if (err) {
      //console.log("error: ", err);
      result(err, null);
      return;
    }
    //console.log("created teacher: ", { id: res.insertId, ...newTeacher });
    result(null, { id: res.insertId, ...newCourses });
  });
};

Courses.findAll = (Teachers_id, result) => {
  sql.query(`SELECT * FROM course WHERE Teachers_id = ?`, [Teachers_id], (err, res) => {
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

Courses.findById = (id, result) => {
  sql.query(`SELECT * FROM course WHERE id = ?`, [id], (err, res) => {
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

Courses.updateById = (id, course, result) => {
  sql.query(
    "UPDATE course SET name = ?, SchoolYear_id = ?, Degrees_id = ? WHERE id = ?",
    [course.name, course.SchoolYear_id, course.Degrees_id, id],
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
      result(null, { id: id, ...course });
    }
  );
};
module.exports = Courses;
