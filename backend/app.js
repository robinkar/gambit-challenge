const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());

app.use("/api/data", (req, res) => {
  res.json([]);
});

app.use(express.static(path.join(__dirname, "..", "build")));

app.use(express.static("public"));

module.exports = app;
