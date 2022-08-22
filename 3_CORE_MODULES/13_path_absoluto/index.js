const path = require("path");

//path absoluto
console.log(path.resolve("teste.txt"));

//formar path
const midFolder = "realtorios";
const fileName = "matheu.txt";

const finalPath = path.join("/", "arquivos", midFolder, fileName);
console.log(finalPath);
