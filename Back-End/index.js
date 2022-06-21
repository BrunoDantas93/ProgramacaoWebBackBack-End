const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
  };

app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the application." });
});

require("./src/routes/teacher.js")(app);
require("./src/routes/degrees.js")(app);
require("./src/routes/students.js")(app);
require("./src/routes/schoolyears.js")(app);
require("./src/routes/courses.js")(app);
require("./src/routes/summaries.js")(app);
require("./src/routes/evaluationmethods.js")(app);
require("./src/routes/quotation.js")(app);
require("./src/routes/enrolled.js")(app);
require("./src/routes/assessments.js")(app);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});