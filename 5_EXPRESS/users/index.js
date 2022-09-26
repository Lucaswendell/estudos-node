const express = require("express");
const router = express.Router();

const path = require("path");
const basePath = path.join(__dirname, "../templates");

router.get("/aula_5/users/:id", (req, res) => {
  const id = req.params.id;
  console.log(`Estamos buscando pelo usuario: ${id}`);
  res.sendFile(`${basePath}/aula_5.html`);
});

router.get("/aula_6", (req, res) => {
  res.sendFile(`${basePath}/aula_6.html`);
});

router.post("/aula_6/save", (req, res) => {
  const { name, age } = req.body;

  console.log(`O nome do usuario é ${name} e ele tem ${age} anos`);
  res.sendFile(`${basePath}/aula_6.html`);
});

module.exports = router;
