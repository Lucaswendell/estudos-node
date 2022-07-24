const mimimist = require("minimist");

const args = mimimist(process.argv.slice(2));

console.log(args["nome"], args["profissao"]);
