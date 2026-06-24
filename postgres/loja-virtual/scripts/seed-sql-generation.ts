import * as fs from 'fs';
import * as path from 'path';

// Configurações de Offset (Ponto de Partida)
const OFFSET_USUARIO = 5001; 
const OFFSET_PRODUTO = 250;
const OFFSET_PEDIDO = 15000;

// Configurações da volumetria dos dados
const QTD_USUARIOS = 100_000;
const QTD_PRODUTOS = 100_000;
const QTD_PEDIDOS = 1_000_000; 
const MAX_ITENS_POR_PEDIDO = 5; 

// Tamanho do lote para o Bulk Insert (Ideal entre 1.000 e 5.000 para PostgreSQL)
const BATCH_SIZE = 1000;

const outputDir = path.join(__dirname, '..', 'ddl');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// Caminho do arquivo SQL final
const sqlFilePath = path.join(outputDir, 'seed-transaction.sql');
const sqlStream = fs.createWriteStream(sqlFilePath);

// Função utilitária para escrever no stream de forma segura (Backpressure)
function writeToSql(data: string): Promise<void> {
    return new Promise((resolve, reject) => {
        if (!sqlStream.write(data, 'utf8')) {
            sqlStream.once('drain', resolve);
        } else {
            resolve();
        }
    });
}

// Função genérica para criar lotes (Chunks) de INSERTs
async function generateSqlBatches(
    tableName: string,
    columns: string,
    numRecords: number,
    generateValues: (i: number) => string
): Promise<void> {
    console.log(`Gerando INSERTS para a tabela: ${tableName}...`);
    let buffer: string[] = [];
    
    for (let i = 1; i <= numRecords; i++) {
        buffer.push(`(${generateValues(i)})`);
        
        // Quando atingir o tamanho do lote ou o final do loop, descarrega no arquivo
        if (buffer.length === BATCH_SIZE || i === numRecords) {
            const query = `INSERT INTO ${tableName} (${columns}) VALUES \n${buffer.join(',\n')};\n\n`;
            await writeToSql(query);
            buffer = []; // Limpa o buffer para o próximo lote
        }
    }
}

async function generateAllSeeds() {
    console.log('⏳ Iniciando geração do arquivo SQL (Isso pode levar alguns minutos)...\n');

    // Inicia a Transação
    await writeToSql('BEGIN;\n\n');

    // 1. Gerar Usuários
    await generateSqlBatches(
        'usuario',
        'id, login, senha, cpf, nome, email',
        QTD_USUARIOS,
        (i) => {
            const id = i + OFFSET_USUARIO - 1; // Subtrai 1 para o primeiro ser o exato OFFSET
            return `${id}, 'user${id}', 'hashsenha123', '${String(id).padStart(11, '0')}', 'Usuario Teste ${id}', 'user${id}@email.com'`;
        }
    );

    // 2. Gerar Produtos
    await generateSqlBatches(
        'produto',
        'id, categoria_id, nome, descricao, preco_base, estoque, ativo',
        QTD_PRODUTOS,
        (i) => {
            const id = i + OFFSET_PRODUTO - 1;
            return `${id}, ${randomInt(1, 10)}, 'Produto ${id}', 'Descricao ${id}', ${(Math.random() * 500 + 10).toFixed(2)}, ${randomInt(0, 1000)}, true`;
        }
    );

    // 3. Gerar Pedidos
    const statusPermitidos = ['pendente', 'entregue', 'cancelado'];
    const estados = ['SP', 'RJ', 'MG', 'RS', 'SC'];
    
    await generateSqlBatches(
        'pedido',
        'id, usuario_id, data, status, logradouro, cep, bairro, uf, cidade, estado',
        QTD_PEDIDOS,
        (i) => {
            const id = i + OFFSET_PEDIDO - 1;
            // IMPORTANTE: Corrige o range para sortear apenas IDs de usuários que realmente acabamos de criar
            const userId = randomInt(OFFSET_USUARIO, OFFSET_USUARIO + QTD_USUARIOS - 1);
            const status = randomElement(statusPermitidos);
            const uf = randomElement(estados);
            const data = `2023-${String(randomInt(1, 12)).padStart(2, '0')}-${String(randomInt(1, 28)).padStart(2, '0')}`; 
            
            return `${id}, ${userId}, '${data}', '${status}', 'Rua ${id}', '12345678', 'Bairro X', '${uf}', 'Cidade Y', 'Estado Z'`;
        }
    );

    // 4. Gerar Itens de Pedido (Lógica customizada devido à variação de itens por pedido)
    console.log(`Gerando INSERTS para a tabela: item_pedido...`);
    let itemBuffer: string[] = [];

    for (let i = 1; i <= QTD_PEDIDOS; i++) {
        const pedidoId = i + OFFSET_PEDIDO - 1;
        const qtdItensNestePedido = randomInt(1, MAX_ITENS_POR_PEDIDO);
        const produtosSet = new Set<number>();
        
        // Evita duplicar produto no mesmo pedido (PK Composta)
        while(produtosSet.size < qtdItensNestePedido) {
            produtosSet.add(randomInt(OFFSET_PRODUTO, OFFSET_PRODUTO + QTD_PRODUTOS - 1));
        }

        for (const produtoId of produtosSet) {
            const qtd = randomInt(1, 5);
            const preco = (Math.random() * 500 + 10).toFixed(2);
            itemBuffer.push(`(${pedidoId}, ${produtoId}, ${qtd}, ${preco})`);

            // Descarrega o lote de itens
            if (itemBuffer.length >= BATCH_SIZE) {
                const query = `INSERT INTO item_pedido (pedido_id, produto_id, quantidade, preco_unitario) VALUES \n${itemBuffer.join(',\n')};\n\n`;
                await writeToSql(query);
                itemBuffer = [];
            }
        }
    }
    
    // Descarrega o resto do buffer de itens (se sobrou algo)
    if (itemBuffer.length > 0) {
        const query = `INSERT INTO item_pedido (pedido_id, produto_id, quantidade, preco_unitario) VALUES \n${itemBuffer.join(',\n')};\n\n`;
        await writeToSql(query);
    }

    // 5. Finaliza com Ajuste de Sequences e COMMIT
    console.log('Finalizando script com Sequences e COMMIT...');
    await writeToSql(`
-- Ajuste automático das Sequences (Identities) após inserção manual
SELECT setval(pg_get_serial_sequence('usuario', 'id'), (SELECT MAX(id) FROM usuario));
SELECT setval(pg_get_serial_sequence('produto', 'id'), (SELECT MAX(id) FROM produto));
SELECT setval(pg_get_serial_sequence('pedido', 'id'), (SELECT MAX(id) FROM pedido));

COMMIT;
`);

    sqlStream.end();

    await new Promise((resolve) => sqlStream.on('finish', resolve));

    console.log('\n✅ Geração de sementes SQL concluída com sucesso!');
    console.log(`📂 O arquivo está salvo em: ${sqlFilePath}`);
}

generateAllSeeds().catch(console.error);