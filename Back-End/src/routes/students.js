module.exports = app => {
    const student = require("../controllers/students.js");
    var router = require("express").Router();
    
    // Create a new student
    router.post("/", student.create);
    
    // Retrieve all students    
    router.get("/", student.findAll);

    
    // Retrieve all students    
    router.get("/degree/:id", student.findAllByDegree);


    // Verify if the email not in use
    router.post("/email", student.tstemail);

    // Verify if the number of student not in use
    router.post("/nostudent", student.tstnostudent);

    // Update a degree with id
    router.put("/:id", student.update);
    
    app.use('/students', router);
};