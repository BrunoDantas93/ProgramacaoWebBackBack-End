module.exports = app => {
    const enrolled = require("../controllers/enrolled.js");
    var router = require("express").Router();
    
    
    router.post("/", enrolled.create);
    
    router.delete("/student/:id", enrolled.deleteByStudent);

    router.get("/:id", enrolled.findAll);
    
    app.use('/enrolled', router);
};