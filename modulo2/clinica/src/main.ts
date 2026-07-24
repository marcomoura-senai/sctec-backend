import express from 'express';

import { rootRouter } from './routers/index.router';

// <PROTOCOLO><HOST>:<PORT>/<CAMINHO>
// http://localhost:3000/v1/
// http://localhost:3000/b
// http://localhost:3000/c
function main() {
  const app = express();

  const port = process.env.PORT ?? 3000;
  app.use(express.json({ limit: '50mb' }));

  app.use('/v1', rootRouter);

  app.listen(port, () => {
    console.log(`Listening on port ${port.toString()}`);
  });
}

main();
