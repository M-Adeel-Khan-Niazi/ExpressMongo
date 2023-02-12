const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const customerRoutes = require("./modules/customers/routes");
const app = express();
require("dotenv").config();

const port = process.env.PORT;
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    logger: true,
  })
  .then(() => console.info("Connected to MongoDB..."))
  .catch((err) => {
    console.error(err.message);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/v1", [customerRoutes]);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
