const Enrolled = require("../models/enrolled.js");

exports.create = (req, res) => {

    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    const course = new Enrolled({
      Course_id: req.body.Course_id,
      Students_id: req.body.Students_id,
    })

    Enrolled.create(course, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while enrolling the student in the course."
        });
      else res.send(data);
    });
};

exports.findAll = (req, res) => {
  
  if (!req.body) {
    res.status(400).send({
    message: "Content can not be empty!"
    });
  }
  Enrolled.findAll(req.params.id, (err, data) => {
    if (err) {
    if (err.kind === "not_found") {
        res.status(404).send({
        message: `Not found students that belong to this course with id ${req.params.id}.`
        });
    } else {
        res.status(500).send({
        message: "Error retrieving students that belong to this course with id " + req.params.id
        });
    }
    } else res.send(data);
  });
};

exports.deleteByStudent = (req, res) => {
  Enrolled.removeByStudent(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Enrolled with Student_id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Enrolled with Student_id " + req.params.id
        });
      }
    } else res.send({ message: `Enrolled was deleted successfully!` });
  });
};