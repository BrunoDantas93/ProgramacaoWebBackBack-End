const SchoolYear = require("../models/schoolyears.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    //Create degree
    const schoolyear = new SchoolYear({
      label: req.body.label
    })
    // Save Tutorial in the database
    SchoolYear.create(schoolyear, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the school year."
        });
      else res.send(data);
    });
};

exports.findAll = (req, res) => {
  SchoolYear.findAll((err, data) => {
        if (err) {
        if (err.kind === "not_found") {
            res.status(404).send({
            message: `Not found School years`
            });
        } else {
            res.status(500).send({
            message: "Error retrieving degrees"
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
    
    SchoolYear.updateById(
        req.params.id,
        new SchoolYear(req.body),
        (err, data) => {            
        if (err) {
            if (err.kind === "not_found") {
            res.status(404).send({
                message: `Not found school year with id ${req.params.id}.`
            });
            } else {
            res.status(500).send({
                message: "Error updating school year with id " + req.params.id
            });
            }
        } 
        else res.send(data);
        }
        
    );
};
