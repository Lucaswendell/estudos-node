function math({ a, b, operation = "+", reverse = false }) {
  if (!a || !b) {
    console.log("Erro: Informe a e b.");
    return;
  }

  const textOperation = {
    true: `${a} ${operation} ${b}`,
    false: `${b} ${operation} ${a}`,
  };

  const switchOperation = {
    "+": reverse ? a + b : b + a,
    "-": reverse ? a - b : b - a,
    "*": reverse ? a * b : b * a,
    "/": reverse ? a / b : b / a,
  };
  const resultado = switchOperation[operation] ?? "Operação inválida";

  console.log(`${textOperation[reverse]} = ${resultado}`);
}

export default math;
