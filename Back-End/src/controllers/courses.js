const Courses = require("../models/courses.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    const course = new Courses({
      name: req.body.name,
      SchoolYear_id: req.body.SchoolYear_id,
      Teachers_id: req.body.Teachers_id,
      Degrees_id: req.body.Degrees_id
    })
    // Save Tutorial in the database
    Courses.create(course, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the course."
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
  Courses.findAll(req.params.id, (err, data) => {
    if (err) {
    if (err.kind === "not_found") {
        res.status(404).send({
        message: `Not found Course that belong to the teacher with id ${req.params.id}.`
        });
    } else {
        res.status(500).send({
        message: "Error retrieving Course that belong to the teacher with id " + req.params.id
        });
    }
    } else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Courses.findById(req.params.id, (err, data) => {
        if (err) {
        if (err.kind === "not_found") {
            res.status(404).send({
            message: `Not found Course with id ${req.params.id}.`
            });
        } else {
            res.status(500).send({
            message: "Error retrieving course with id " + req.params.id
            });
        }
        } else res.send(data);
    });
};

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }
    
    Courses.updateById(
        req.params.id,
        new Courses(req.body),
        (err, data) => {            
        if (err) {
            if (err.kind === "not_found") {
            res.status(404).send({
                message: `Not found Courses with id ${req.params.id}.`
            });
            } else {
            res.status(500).send({
                message: "Error updating Courses with id " + req.params.id
            });
            }
        } 
        else res.send(data);
        }
        
    );
};
