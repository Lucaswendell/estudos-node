const fs = require("fs"); //file system

fs.readFile("arquivo1.txt", "utf-8", (err, content) => {
  if (err) {
    console.log(err.message);
    return;
  }

  console.log(content);
});
