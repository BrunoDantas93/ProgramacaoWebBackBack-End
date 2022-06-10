const Teachers = require("../models/teacher.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    //Create Teacher
    const teacher = new Teachers({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      surname: req.body.surname,
      noteacher: req.body.noteacher
    })
    // Save Tutorial in the database
    Teachers.create(teacher, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      else res.send(data);
    });
};

exports.findOne = (req, res) => {
  Teachers.findById(req.params.id, (err, data) => {
        if (err) {
        if (err.kind === "not_found") {
            res.status(404).send({
            message: `Not found Tutorial with id ${req.params.id}.`
            });
        } else {
            res.status(500).send({
            message: "Error retrieving Tutorial with id " + req.params.id
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
    
    Teachers.updateById(
        req.params.id,
        new Teachers(req.body),
        (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
            res.status(404).send({
                message: `Not found Tutorial with id ${req.params.id}.`
            });
            } else {
            res.status(500).send({
                message: "Error updating Tutorial with id " + req.params.id
            });
            }
        } else res.send(data);
        }
    );
};
