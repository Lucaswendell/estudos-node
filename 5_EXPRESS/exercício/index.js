const express = require("express");
const app = express();

const pagina_1 = require("./pagina_1");
const pagina_2 = require("./pagina_2");

app.use(express.static("public"));
app.use("/pagina_1", pagina_1);
app.use("/pagina_2", pagina_2);
app.listen(5000, () => {
  console.log("Server rodando na porta 5000");
});
