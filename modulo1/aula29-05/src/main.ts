// eslint -> regras de boas práticas de programação // Code smells
// prettier
// editorconfig -> LF\ CRLF || 2 || 4 ||

import { initDatabase } from './database';

async function main() {
  const a = '';
  const b = '';

  await initDatabase();

  console.log(a);
  console.log(b);
}

main().catch(console.error);
