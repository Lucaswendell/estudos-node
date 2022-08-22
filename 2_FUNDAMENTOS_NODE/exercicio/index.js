import inquirer from "inquirer";
import chalk from "chalk";

try {
  const perguntas = [
    { name: "idade", message: "Qual a sua idade?" },
    { name: "nome", message: "Qual o seu nome?" },
  ];
  inquirer
    .prompt(perguntas)
    .then((answers) => {
      const { nome, idade } = answers;

      if (!nome || !idade) {
        throw new Error("Nome e Idade são obrigatorios.");
      }
      if (!Number.isInteger(parseInt(idade))) {
        throw new Error("Digite um número inteiro.");
      }

      const regexNome = new RegExp(/([^A-Za-z\s])+/gi);

      if (regexNome.test(nome)) {
        throw new Error("Digite um nome válido.");
      }

      console.log(chalk.bgYellow.black(`Nome: ${answers.nome}`));
      console.log(chalk.bgYellow.black(`Idade: ${answers.idade}`));
    })
    .catch((e) => {
      console.log(e.message);
    });
} catch (e) {
  console.log(e.message);
}
