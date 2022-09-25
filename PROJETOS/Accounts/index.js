const inquirer = require("inquirer");
const chalk = require("chalk");
const fs = require("fs");
let usuarioLogado = "";

operation();

function operation() {
  const choices = [];
  if (usuarioLogado) {
    choices.push("Consultar Saldo", "Depositar", "Sacar", "Sair");
  } else {
    choices.push("Criar conta", "Entrar", "Sair");
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
        Entrar: signIn,
        "Consultar Saldo": "",
        Depositar: deposit,
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
        '{"balance": 0, "statement": []}',
        function (err) {
          console.log(err);
        }
      );
      console.log(chalk.green("Parabéns, sua conta foi criada!"));
      usuarioLogado = accountName;
      operation();
    })
    .catch((err) => console.log(err));
}

// sign in account

function signIn() {
  inquirer
    .prompt([
      {
        name: "account",
        message: "Digite o nome da sua conta: ",
      },
    ])
    .then((answer) => {
      const { account } = answer;

      if (fs.existsSync(`accounts/${account}.json`)) {
        usuarioLogado = account;
        operation();
      } else {
        console.log(chalk.bgRed.black("Conta não encontrada!"));
        signIn();
        return;
      }
    })
    .catch((err) => console.log(err));
}

//add an amount to user account

function deposit() {
  inquirer
    .prompt([
      {
        name: "amount",
        type: "number",
        message: "Qual valor deseja depositar?",
      },
    ])
    .then((answer) => {
      const { amount } = answer;

      if (isNaN(amount)) {
        console.log(chalk.bgRed.black("Valor inválido."));
        deposit();
        return;
      }

      if (amount < 0) {
        console.log(
          chalk.bgRed.black("Valor digitado deve ser maior que zero.")
        );
        deposit();
        return;
      }

      if (fs.existsSync(`accounts/${usuarioLogado}.json`)) {
        const account = JSON.parse(
          fs.readFileSync(`accounts/${usuarioLogado}.json`)
        );

        const statement = JSON.stringify([...account.statement, `+${amount}`]);

        fs.writeFileSync(
          `accounts/${usuarioLogado}.json`,
          `{"balance": ${account.balance + amount}, "statement": ${statement}}`,
          function (err) {
            console.log(err);
          }
        );

        console.log(chalk.green("O valor foi depositado na conta!"));
        operation();
      } else {
        console.log(chalk.bgRed.black("Conta não encontrada."));
        operation();
        return;
      }
    })
    .catch((err) => console.log(err));
}
