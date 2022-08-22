const http = require("http");

const port = 3000;

const server = http.createServer((req, res) => {
  const urlInfo = require("url").parse(req.url, true);
  const name = urlInfo.query.name;
  res.statusCode = 200;

  res.setHeader("Content-type", "text/html");
  if (!name) {
    res.end(`
        <h1>Preencha seu nome</h1>
        <form method="GET">
            <input type="text" name="name" />
            <button>Enviar</button>
        </form>
    `);
  } else {
    res.end(`<h1>Nome: ${name}</h1>`);
  }
});

server.listen(port, () => {
  console.log(`rodando na porta ${port}`);
});
