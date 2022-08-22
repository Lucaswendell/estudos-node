const http = require("http");
const fs = require("fs");
const url = require("url");
const port = 3000;

const server = http.createServer((req, res) => {
  const q = url.parse(req.url, true);
  const fileName = q.pathname.substring(1) || "index.html";

  try {
    if (!fs.existsSync(fileName) || !fileName.includes("html")) {
      throw new Error("Pagina não encotrada");
    }

    fs.readFile(fileName, (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  } catch (e) {
    fs.readFile("404.html", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  }
});

server.listen(port, () => {
  console.log(`rodando na porta ${port}`);
});
