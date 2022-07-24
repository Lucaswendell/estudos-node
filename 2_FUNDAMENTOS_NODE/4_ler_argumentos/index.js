//nome
console.log(process.argv);

const args = process.argv.slice(2);

console.log(args);

const argObj = {};
for (const arg of args) {
  const argArray = arg.split("=");
  argObj[argArray[0]] = argArray[1];
}

console.log(argObj);
