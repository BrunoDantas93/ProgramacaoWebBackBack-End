const Quotation = require("../models/quotation.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    const quotation = new Quotation({
      percentage: req.body.percentage,
      EvaluationMethods_id: req.body.EvaluationMethods_id,
      Course_id: req.body.Course_id
    })
    // Save Tutorial in the database
    Quotation.create(quotation, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Quotation."
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
  Quotation.findAll(req.params.id, (err, data) => {
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
  Quotation.findById(req.params.id, (err, data) => {
        if (err) {
        if (err.kind === "not_found") {
            res.status(404).send({
            message: `Not found Course with id ${req.params.id}.`
            });
        } else {
            res.status(500).send({
            message: "Error retrieving quotation with id " + req.params.id
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
    
    Quotation.updateById(
        req.params.id,
        new Quotation(req.body),
        (err, data) => {            
        if (err) {
            if (err.kind === "not_found") {
            res.status(404).send({
                message: `Not found Quotation with id ${req.params.id}.`
            });
            } else {
            res.status(500).send({
                message: "Error updating Quotation with id " + req.params.id
            });
            }
        } 
        else res.send(data);
        }
        
    );
};

exports.delete = (req, res) => {
  Quotation.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Quotation with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Quotation with id " + req.params.id
        });
      }
    } else res.send({ message: `Quotation was deleted successfully!` });
  });
};

