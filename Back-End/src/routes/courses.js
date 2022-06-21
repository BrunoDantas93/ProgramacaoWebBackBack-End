module.exports = app => {
    const courses = require("../controllers/courses.js");
    var router = require("express").Router();
    
    // Create a new course
    router.post("/", courses.create);
    
    // Retrieve all course with of the teacher_id    
    router.get("/:id", courses.findAll);

    // Retrieve a single course with id    
    router.get("/course/:id", courses.findOne);

    // Update a degree with id
    router.put("/:id", courses.update);
    
    app.use('/courses', router);
};