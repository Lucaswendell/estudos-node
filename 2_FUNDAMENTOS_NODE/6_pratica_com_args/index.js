//modulo externo
const minimist = require("minimist");
//modulo interno
const { math } = require("./math");

const args = minimist(process.argv.slice(2));
const a = parseInt(args["a"]);
const b = parseInt(args["b"]);
const operation = args["operacao"];
const reverse = args["inverter"];

console.log(math({ a, b, operation, reverse }));
