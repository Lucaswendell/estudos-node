const express = require("express");
const app = express();

//rotas
const usersRoutes = require("./users");

//aula 3
const path = require("path");
const basePath = path.join(__dirname, "templates");

//aula 6
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
//arquivos estaticos
app.use(express.static("public"));
//

app.use("/users", usersRoutes);

app.get("/aula_2", (req, res) => {
  res.send("Olá mundo!!");
});

app.get("/aula_3", (req, res) => {
  res.sendFile(`${basePath}/aula_3.html`);
});

//middleware
const checkAuth = function (req, res, next) {
  req.authStatus = false;
  if (req.authStatus) {
    console.log("Está logado, pode continuar");
  } else {
    console.log("Não está logado");
  }
  next();
};

// app.use(checkAuth);

app.get("/aula_4", (req, res) => {
  res.json({ authStatus: req.authStatus });
});

app.get("/aula_7", (req, res) => {
  res.sendFile(`${basePath}/aula_7.html`);
});

//pagina 404 - aula_8
app.use((req, res, next) => {
  res.status(404).sendFile(`${basePath}/404.html`);
});

app.listen(3000, () => {
  console.log("Server rodando na porta 3000");
});
