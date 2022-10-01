const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

const hbs = exphbs.create({
  partialsDir: ["views/partials"],
});

app.engine("handlebars", hbs.engine);
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

app.get("/post", (req, res) => {
  const post = {
    title: "Aprender Node.js",
    category: "Javascript",
    body: "Artigo",
    comment: 4,
  };

  res.render("blogpost", { post });
});

app.get("/blog", (req, res) => {
  const posts = [
    {
      title: "Aprender Node.js",
      category: "Javascript",
      body: "Artigo",
      comment: 4,
    },
    {
      title: "Aprender JS",
      category: "Javascript",
      body: "Artigo",
      comment: 4,
    },
    {
      title: "Aprender Python",
      category: "Python",
      body: "Artigo",
      comment: 4,
    },
  ];

  res.render("blog", { posts });
});

app.get("/dashboard", (req, res) => {
  const items = ["Item a", "Item B", "Item C"];

  res.render("dashboard", { items });
});

app.listen(3000, () => {
  console.log("Server rodando na porta 3000");
});
