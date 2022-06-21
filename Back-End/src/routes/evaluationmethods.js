module.exports = app => {
    const evaluationmethods = require("../controllers/evaluationmethods.js");
    var router = require("express").Router();
    
    // Create a new degree
    router.post("/", evaluationmethods.create);
    
    // Retrieve all degrees teacher with id    
    router.get("/", evaluationmethods.findAll);

    // Update a degree with id
    router.put("/:id", evaluationmethods.update);
    
    app.use('/evaluationmethods', router);
};