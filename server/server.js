const express = require("express");
const getAnimals = require("../animals/index");

const app = express();

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.get("/animals", async function (req, res) {
  const { animals } = await getAnimals();
  res.send(animals);
});

app.listen(3000, function () {
  console.log("Homework listening on port 3000!");
});
