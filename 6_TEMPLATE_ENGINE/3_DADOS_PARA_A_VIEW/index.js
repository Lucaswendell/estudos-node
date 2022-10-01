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

  res.render("home", { user });
});

app.listen(3000, () => {
  console.log("Server rodando na porta 3000");
});
