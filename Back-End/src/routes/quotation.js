module.exports = app => {
    const quotation = require("../controllers/quotation.js");
    var router = require("express").Router();
    
    router.post("/", quotation.create);
    
    router.get("/:id", quotation.findAll);

    router.get("/quotation/:id", quotation.findOne);

    router.put("/:id", quotation.update);
    
    router.delete("/:id", quotation.delete);
    
    app.use('/quotation', router);
};