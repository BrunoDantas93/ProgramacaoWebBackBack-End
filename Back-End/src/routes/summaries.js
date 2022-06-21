module.exports = app => {
    const summaries = require("../controllers/summaries.js");
    var router = require("express").Router();
    
    // Create a new summaries
    router.post("/", summaries.create);
    
    // Retrieve all summaries teacher with id    
    router.get("/:id", summaries.findAll);

    // Update a summaries with id
    router.put("/:id", summaries.update);

    // Delete a Tutorial with id
    router.delete("/:id", summaries.delete);
    
    app.use('/summaries', router);
};