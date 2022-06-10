module.exports = app => {
    const teachers = require("../controllers/teacher.js");
    var router = require("express").Router();
    
    // Create a new teacher
    router.post("/", teachers.create);
    
    // Update a teacher with id
    router.post("/login", teachers.login);

    // Update a teacher with id
    router.post("/email", teachers.tstemail);

    // Retrieve a single teacher with id    
    router.get("/:id", teachers.findOne);

    // Update a teacher with id
    router.put("/:id", teachers.update);
    
    
    app.use('/teachers', router);
};