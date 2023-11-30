const express = require("express");
const asyncErrors = require("express-async-errors");
const Joi = require("joi");
const planetController = require("../controller/planet");

const morgan = require("morgan");

const app = express();
const port = 3000;
app.use(express.json());

app.use(morgan("dev"));

app.get("/api/planets", planetController.getAll);

app.get("/api/planets/:id", planetController.getOneById);

app.post("/api/planets", planetController.create);

app.put("/api/planets/:id", planetController.updateById);

app.delete("/api/planets/:id", planetController.deleteById);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("something went wrong...");
});
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
