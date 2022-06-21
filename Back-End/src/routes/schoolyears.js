module.exports = app => {
    const schoolyears = require("../controllers/schoolyears.js");
    var router = require("express").Router();
    
    // Create a new degree
    router.post("/", schoolyears.create);
    
    // Retrieve all degrees teacher with id    
    router.get("/", schoolyears.findAll);

    // Update a degree with id
    router.put("/:id", schoolyears.update);
    
    app.use('/schoolyears', router);
};