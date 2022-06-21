const Summaries = require("../models/summaries.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    const course = new Summaries({
      title: req.body.title,
      date: req.body.date,
      description: req.body.description,
      Course_id: req.body.Course_id
    })
    // Save Tutorial in the database
    Summaries.create(course, (err, data) => {
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
  Summaries.findAll(req.params.id, (err, data) => {
    if (err) {
    if (err.kind === "not_found") {
        res.status(404).send({
        message: `Not found Summaries that belong to the course with id ${req.params.id}.`
        });
    } else {
        res.status(500).send({
        message: "Error retrieving Summaries that belong to the course with id " + req.params.id
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
    
    Summaries.updateById(
        req.params.id,
        new Summaries(req.body),
        (err, data) => {            
        if (err) {
            if (err.kind === "not_found") {
            res.status(404).send({
                message: `Not found Summaries with id ${req.params.id}.`
            });
            } else {
            res.status(500).send({
                message: "Error updating Summaries with id " + req.params.id
            });
            }
        } 
        else res.send(data);
        }        
    );
};

exports.delete = (req, res) => {
  Summaries.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found summary with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete summary with id " + req.params.id
        });
      }
    } else res.send({ message: `Summary was deleted successfully!` });
  });
};
