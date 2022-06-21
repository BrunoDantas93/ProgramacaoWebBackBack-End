module.exports = app => {
    const assessments = require("../controllers/assessments.js");
    var router = require("express").Router();
    
    router.post("/", assessments.create);
     
    router.get("/:id", assessments.findAll);

    router.put("/:id", assessments.update);
    
    router.delete("/student/:id", assessments.deleteByStudent);

    router.delete("/:id", assessments.delete);
        

    app.use('/assessments', router);
};