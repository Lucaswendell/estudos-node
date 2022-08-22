const fs = require("fs");

fs.unlink("arquivo.txt", (err) => {
  if (err) {
    console.log(err.message);
    return;
  }

  console.log("Arquivo removido.");
});
