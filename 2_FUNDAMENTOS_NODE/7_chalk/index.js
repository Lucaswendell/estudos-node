const chalk = require("chalk");

const nota = 1;

if (nota >= 7) {
  console.log(chalk.green("Parabens! Aluno aprovado"));
} else {
  console.log(chalk.bgRed.black("Reprovado."));
}
