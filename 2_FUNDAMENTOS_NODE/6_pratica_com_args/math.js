function math({ a, b, operation = "+", reverse = false }) {
  if (!a || !b) {
    console.log("Erro: Informe a e b.");
    return;
  }

  const switchOperation = {
    "+": reverse ? a + b : b + a,
    "-": reverse ? a - b : b - a,
    "*": reverse ? a * b : b * a,
    "/": reverse ? a / b : b / a,
  };

  const resultado = switchOperation[operation] ?? "Operação inválida";

  return resultado;
}

module.exports = {
  math,
};
