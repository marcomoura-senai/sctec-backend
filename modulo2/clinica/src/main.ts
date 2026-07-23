import express from 'express';

function main() {
  // <PROTOCOLO><HOST>:<PORT>/<CAMINHO>
  // http://localhost:3000/a
  // http://localhost:3000/b
  // http://localhost:3000/c
  const app = express();

  const port = process.env.PORT ?? 3000;

  app.get(
    '/livros',
    (req, res, next) => {
      console.log('Hello World from Livros!');
      next();
    },
    (req, res) => {
      // req -> request
      // res -> response

      console.log(req.headers);

      res.json({
        message: 'Hello World from Livros!',
        data: [
          { id: 1, name: 'Livro 1' },
          { id: 2, name: 'Livro 2' },
        ],
      });
    },
  );
  app.get('/view', (req, res) => {
    res.send(`<html><body><h1>Hello World from view!</h1></body></html>`);
  });

  app.listen(port, () => {
    console.log(`Listening on port ${port.toString()}`);
  });
}

main();
