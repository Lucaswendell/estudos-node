const fs = require("fs");

fs.rename("arquivo.txt", "novoarquivo.txt", (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log("Arquivo renomeado!");
});
