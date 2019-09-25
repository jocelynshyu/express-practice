const fs = require("fs");
const express = require("express");
const getAnimals = require("../animals/index");

const app = express();
app.use(express.static("static"));

function render(filePath, params) {
  let html = fs.readFileSync(filePath, "utf8");
  for (const key in params) {
    const reg = new RegExp(`{${key}}`, "g");
    html = html.replace(reg, params[key]);
  }
  return html;
}

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.get("/animals-json", async function (req, res) {
  const { animals } = await getAnimals();
  res.send(animals);
});

app.get("/animals", async function (req, res) {
  const { animals } = await getAnimals();
  const main = animals.map(a => render("web/animal-link.html", a)).join("");
  res.send(render("web/index.html", { main, title: "待認養動物" }));
});

app.listen(3000, function () {
  console.log("Homework listening on port 3000!");
});
