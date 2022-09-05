const inquirer = require("inquirer");
const chalk = require("chalk");
const fs = require("fs");
let usuarioLogado = "";

operation();

function operation({ isUsuarioLogado = false, usuario = "" } = {}) {
  const choices = [];
  if (isUsuarioLogado) {
    usuarioLogado = usuario;
    choices.push("Consultar Saldo", "Depositar", "Sacar", "Sair");
  } else {
    choices.push("Criar conta", "Entrar na conta", "Sair");
  }

  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "O que você deseja fazer?",
        choices,
      },
    ])
    .then((answer) => {
      const action = answer["action"];
      const actions = {
        "Criar conta": crateAccount,
        "Consultar Saldo": "",
        Depositar: "",
        Sacar: "",
        Sair: sair,
      };

      if (!actions[action]) console.log(chalk.bgRed.black("Ação inválida."));

      typeof actions[action] === "function" && actions[action]();
    })
    .catch((e) => console.log(e.message));
}
//Sair
function sair() {
  console.log(chalk.bgBlue.black("Obrigado por usar o account."));
  process.exit;
}
//Create account
function crateAccount() {
  console.log(chalk.bgGreen.black("Parabéns por escolher nosso banco."));
  console.log(chalk.green("Defina as opções da sua conta a seguir"));
  buildAccount();
}

function buildAccount() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite um nome para a sua conta: ",
      },
    ])
    .then((answer) => {
      const { accountName } = answer;
      console.info(accountName);
      if (!fs.existsSync("accounts")) {
        fs.mkdirSync("accounts");
      }

      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(
          chalk.bgRed.black("Esta conta já existe, escolha outra conta")
        );
        buildAccount();
        return;
      }

      fs.writeFileSync(
        `accounts/${accountName}.json`,
        '{"balance": 0}',
        function (err) {
          console.log(err);
        }
      );
      console.log(chalk.green("Parabéns, sua conta foi criada!"));
      operation({ isUsuarioLogado: true, usuario: accountName });
    })
    .catch((err) => console.log(err));
}

//add an amount to user account

// function deposit(){
//     inquirer.prompt([
//         {
//             name: 'amount',
//             message: ''
//         }
//     ])
// }
