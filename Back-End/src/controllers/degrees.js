const Degrees = require("../models/degrees.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    //Create degree
    const degree = new Degrees({
      name: req.body.name
    })
    // Save Tutorial in the database
    Degrees.create(degree, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the degree."
        });
      else res.send(data);
    });
};

exports.findAll = (req, res) => {
  Degrees.findAll((err, data) => {
        if (err) {
        if (err.kind === "not_found") {
            res.status(404).send({
            message: `Not found Degrees`
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
    
    Degrees.updateById(
        req.params.id,
        new Degrees(req.body),
        (err, data) => {            
        if (err) {
            if (err.kind === "not_found") {
            res.status(404).send({
                message: `Not found Degree with id ${req.params.id}.`
            });
            } else {
            res.status(500).send({
                message: "Error updating Degree with id " + req.params.id
            });
            }
        } 
        else res.send(data);
        }
        
    );
};
