const inquirer = require("inquirer");
const chalk = require("chalk");
const fs = require("fs");
let accountSignIn = "";

operation();

function operation() {
  const choices = [];
  if (accountSignIn) {
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
        "Consultar Saldo": getAccountBalance,
        Depositar: addAmount,
        Sacar: withDraw,
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
        return buildAccount();
      }

      fs.writeFileSync(
        `accounts/${accountName}.json`,
        '{"balance": 0, "statement": []}',
        function (err) {
          console.log(err);
        }
      );
      console.log(chalk.green("Parabéns, sua conta foi criada!"));
      accountSignIn = accountName;
      return operation();
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
        accountSignIn = account;
        return operation();
      } else {
        console.log(chalk.bgRed.black("Conta não encontrada!"));
        return signIn();
      }
    })
    .catch((err) => console.log(err));
}

//add an amount to user account

function addAmount() {
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
        return addAmount();
      }

      if (amount < 0) {
        console.log(
          chalk.bgRed.black("Valor digitado deve ser maior que zero.")
        );
        return addAmount();
      }

      const account = getAccount();
      const statement = [...account.statement, `+${amount}`];

      account.balance = parseFloat(amount) + parseFloat(account.balance);
      account.statement = statement;

      fs.writeFileSync(
        `accounts/${accountSignIn}.json`,
        JSON.stringify(account),
        function (err) {
          console.log(err);
        }
      );

      console.log(chalk.green("O valor foi depositado na conta!"));
      console.log(chalk.green(`Saldo atual: R$${account.balance}`));
      return operation();
    })
    .catch((err) => console.log(err));
}

function getAccount() {
  if (fs.existsSync(`accounts/${accountSignIn}.json`)) {
    const accountJSON = fs.readFileSync(`accounts/${accountSignIn}.json`, {
      encoding: "utf-8",
      flag: "r",
    });

    return JSON.parse(accountJSON);
  } else {
    console.log(chalk.bgRed.black("Conta não encontrada."));
    return operation();
  }
}

//show account values
function getAccountBalance() {
  const account = getAccount();
  console.log(
    chalk.bgBlue.black(`Olá, o saldo da sua conta é de R$${account.balance}`)
  );
  console.log(chalk.white(`=== Entradas ===`));
  const deposits = account.statement.filter((value) => /^\+/g.test(value));
  console.log(chalk.green(deposits.join(" | ")));

  console.log(chalk.white(`=== Saídas ===`));
  const withDraw = account.statement.filter((value) => /^\-/g.test(value));
  console.log(chalk.red(withDraw.join(" | ")));

  return operation();
}

// withdraw an amount from user account
function withDraw() {
  inquirer
    .prompt([{ name: "amount", message: "Quanto você desseja sacar?" }])
    .then((answer) => {
      const { amount } = answer;

      if (isNaN(amount)) {
        console.log(chalk.bgRed.black("Valor inválido."));
        return withDraw();
      }

      if (amount < 0) {
        console.log(
          chalk.bgRed.black("Valor digitado deve ser maior que zero.")
        );
        return withDraw();
      }

      const account = getAccount();

      if (amount > account.balance) {
        console.log(
          chalk.bgRed.black(
            `Valor digitado deve ser menor ou igual a R$${account.balance}.`
          )
        );
        return withDraw();
      }

      account.balance = parseFloat(account.balance) - parseFloat(amount);

      account.statement = [...account.statement, `-${amount}`];

      fs.writeFileSync(
        `accounts/${accountSignIn}.json`,
        JSON.stringify(account),
        function (err) {
          console.log(err);
        }
      );

      console.log(chalk.green("O valor foi sacado da conta!"));
      console.log(chalk.green(`Saldo atual: R$${account.balance}`));
      return operation();
    })
    .catch((e) => console.log(e));
}
