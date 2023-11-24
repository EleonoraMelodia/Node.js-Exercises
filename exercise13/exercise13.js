var express = require("express");
var asyncErrors = require("express-async-errors");
var Joi = require("joi");
var planetController = require("../controller/planet");
var morgan = require("morgan");
var app = express();
var port = 3000;
app.use(express.json());
app.use(morgan("dev"));
app.get("/api/planets", planetController.getAll);
app.get("/api/planets/:id", planetController.getOneById);
app.post("/api/planets", planetController.create);
app.put("/api/planets/:id", planetController.updateById);
app.delete("/api/planets/:id", planetController.deleteById);
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("something went wrong...");
});
app.listen(port, function () {
    console.log("server listening on port ".concat(port));
});
