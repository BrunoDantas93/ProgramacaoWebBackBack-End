const Students = require("../models/students.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    //Create degree
    const student = new Students({
      nostudent: req.body.nostudent,
      email: req.body.email,
      name: req.body.name,
      surname: req.body.surname,
      Degrees_id : req.body.Degrees_id,
    })
    console.log(student)
    // Save Tutorial in the database
    Students.create(student, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the student."
        });
      else res.send(data);
    });
};

exports.tstemail = (req, res) => {
  
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body)
  //Login Teacher
  const student = new Students({
    email: req.body.email
  })
  // Save Tutorial in the database
  Students.email(student, (err, data) => {
    if (err)
      res.status(404).send({
        message:
          err.message || "Not found student"
      });
    else res.send(data);
  });
};

exports.tstnostudent = (req, res) => {
  
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  //Login Teacher
  const student = new Students({
    nostudent: req.body.nostudent
  })
  // Save Tutorial in the database
  Students.nostudent(student, (err, data) => {
    if (err)
      res.status(404).send({
        message:
          err.message || "Not found student"
      });
    else res.send(data);
  });
};


exports.findAll = (req, res) => {
  Students.findAll((err, data) => {
        if (err) {
        if (err.kind === "not_found") {
            res.status(404).send({
            message: `Not found student`
            });
        } else {
            res.status(500).send({
            message: "Error retrieving student"
            });
        }
        } else res.send(data);
    });
};

exports.findAllByDegree = (req, res) => {
  Students.findByDegreeId(req.params.id, (err, data) => {
        if (err) {
        if (err.kind === "not_found") {
            res.status(404).send({
            message: `Not found Student with Degree id ${req.params.id}.`
            });
        } else {
            res.status(500).send({
            message: "Error retrieving Student with Degree_id " + req.params.id
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
    
    Students.updateById(
        req.params.id,
        new Students(req.body),
        (err, data) => {            
        if (err) {
            if (err.kind === "not_found") {
            res.status(404).send({
                message: `Not found student with id ${req.params.id}.`
            });
            } else {
            res.status(500).send({
                message: "Error updating student with id " + req.params.id
            });
            }
        } 
        else res.send(data);
        }
        
    );
};
