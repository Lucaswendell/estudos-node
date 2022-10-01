const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  const user = {
    name: "Lucas",
    surname: "Wendel",
  };

  const auth = false;
  const approved = false;

  res.render("home", { user, auth, approved });
});

app.get("/dashboard", (req, res) => {
  const items = ["Item a", "Item B", "Item C"];

  res.render("dashboard", { items });
});

app.listen(3000, () => {
  console.log("Server rodando na porta 3000");
});
