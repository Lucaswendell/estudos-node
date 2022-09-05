const x = "10";

//Ver se o x é um numero
if (!Number.isInteger(x)) {
  throw new Error("O valor de x não é um número inteiro");
}

console.log("Continuando o código....");
