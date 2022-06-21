const EvaluationMethods = require("../models/evaluationmethods.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    const evaluationMethods = new EvaluationMethods({
      label: req.body.label
    })
    
    EvaluationMethods.create(evaluationMethods, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Evaluation Method."
        });
      else res.send(data);
    });
};

exports.findAll = (req, res) => {
  EvaluationMethods.findAll((err, data) => {
        if (err) {
        if (err.kind === "not_found") {
            res.status(404).send({
            message: `Not found Evaluation Methods`
            });
        } else {
            res.status(500).send({
            message: "Error retrieving Evaluation Methods"
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
    
    EvaluationMethods.updateById(
        req.params.id,
        new EvaluationMethods(req.body),
        (err, data) => {            
        if (err) {
            if (err.kind === "not_found") {
            res.status(404).send({
                message: `Not found Evaluation Method with id ${req.params.id}.`
            });
            } else {
            res.status(500).send({
                message: "Error updating Evaluation Method with id " + req.params.id
            });
            }
        } 
        else res.send(data);
        }
        
    );
};
