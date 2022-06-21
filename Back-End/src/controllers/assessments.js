const Assessments = require("../models/assessments.js");

exports.create = (req, res) => {

    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    const assessments = new Assessments({
      grade: req.body.grade,
      Quotation_id: req.body.Quotation_id,
      Quotation_EvaluationMethods_id: req.body.Quotation_EvaluationMethods_id,
      Enrolled_id: req.body.Enrolled_id,
      Enrolled_Course_id: req.body.Enrolled_Course_id,
      Enrolled_Students_id: req.body.Enrolled_Students_id
    })

    Assessments.create(assessments, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the assessments."
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

  Assessments.findAll(req.params.id, (err, data) => {
    if (err) {
    if (err.kind === "not_found") {
        res.status(404).send({
        message: `Not found assessments that belong to the course with id ${req.params.id}.`
        });
    } else {
        res.status(500).send({
        message: "Error retrieving assessments that belong to the course with id " + req.params.id
        });
    }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }
    
    Assessments.updateById(
        req.params.id,
        new Assessments(req.body),
        (err, data) => {            
        if (err) {
            if (err.kind === "not_found") {
            res.status(404).send({
                message: `Not found Assessments with id ${req.params.id}.`
            });
            } else {
            res.status(500).send({
                message: "Error updating Assessments with id " + req.params.id
            });
            }
        } 
        else res.send(data);
        }
        
    );
};

exports.delete = (req, res) => {
  Assessments.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Assessments with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Assessments with id " + req.params.id
        });
      }
    } else res.send({ message: `Assessments was deleted successfully!` });
  });
};

exports.deleteByStudent = (req, res) => {
  Assessments.removeByStudent(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Assessments with Student_id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Assessments with Student_id " + req.params.id
        });
      }
    } else res.send({ message: `Assessments was deleted successfully!` });
  });
};