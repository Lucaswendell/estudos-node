const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question("Qual a sua linguagem preferida? ", (language) => {
  if (
    language.toLowerCase() === "javascript" ||
    language.toLowerCase() === "js"
  ) {
    console.log("É isso ai");
  } else {
    console.log("Ta vivendo errado");
  }
  readline.close();
});
