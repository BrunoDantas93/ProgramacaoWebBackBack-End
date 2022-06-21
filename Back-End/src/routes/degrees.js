module.exports = app => {
    const degrees = require("../controllers/degrees.js");
    var router = require("express").Router();
    
    // Create a new degree
    router.post("/", degrees.create);
    
    // Retrieve all degrees teacher with id    
    router.get("/", degrees.findAll);

    // Update a degree with id
    router.put("/:id", degrees.update);
    
    app.use('/degrees', router);
};