const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

const hbs = exphbs.create({
  partialsDir: ["views/partials"],
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.static("public"));

const products = [
  ...new Array(100).fill(undefined).map((obs, index) => ({
    id: index,
    price: (index + 1) * 100,
    description: `Produto ${index + 1}`,
  })),
];

app.get("/", (req, res) => {
  res.render("home", { products });
});

app.get("/product/:id", (req, res) => {
  const { id } = req.params;

  res.render("product", { product: products[id], showProduct: true });
});

app.listen(3000, () => {
  console.log("Server rodando na 3000");
});
