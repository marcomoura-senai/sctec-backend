import * as fs from 'fs';
import * as path from 'path';


// Configurações de Offset (Ponto de Partida)
// Em um cenário real, o script poderia fazer um "SELECT MAX(id)" antes de rodar.
const OFFSET_USUARIO = 5001; 
const OFFSET_PRODUTO = 250;
const OFFSET_PEDIDO = 15000;

// Configurações da volumetria dos dados
const QTD_USUARIOS = 100_000;
const QTD_PRODUTOS = 100_000;
const QTD_PEDIDOS = 1_000_000; // 1 Milhão de pedidos
const MAX_ITENS_POR_PEDIDO = 5; // Resultará em média 2.5 milhões de itens

const outputDir = path.join(__dirname, 'seeds');

// Garante que o diretório de saída existe
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// Função utilitária para gerar números aleatórios
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// Função otimizada para escrever streams grandes sem estourar a memória RAM (Gerenciamento de Backpressure)
async function writeData(
    filename: string,
    header: string,
    numRecords: number,
    generateRecord: (i: number) => string
): Promise<void> {
    return new Promise((resolve, reject) => {
        const stream = fs.createWriteStream(path.join(outputDir, filename));
        stream.write(`${header}\n`);

        let i = 1;
        function write() {
            let ok = true;
            do {
                const data = generateRecord(i) + '\n';
                if (i === numRecords) {
                    stream.write(data, 'utf8');
                    stream.end();
                    stream.on('finish', resolve);
                    return;
                } else {
                    ok = stream.write(data, 'utf8');
                }
                i++;
            } while (i <= numRecords && ok);

            if (i <= numRecords) {
                // Se o buffer encheu, espera esvaziar (drain) antes de continuar
                stream.once('drain', write);
            }
        }
        
        stream.on('error', reject);
        write();
    });
}

async function generateAllSeeds() {
    console.log('⏳ Iniciando geração de dados (Isso pode levar alguns minutos)...\n');

    // 1. Gerar Usuários
    console.log('Gerando usuários...');
    await writeData(
        'usuarios.csv',
        'id,login,senha,cpf,nome,email',
        QTD_USUARIOS,
        (i) => {
            const id = i + OFFSET_USUARIO;
            return `${id},user${id},hashsenha123,${String(id).padStart(11, '0')},Usuario Teste ${id},user${id}@email.com`
        }
    );

    // 2. Gerar Produtos (Assumindo que existem categorias de 1 a 10 criadas previamente)
    console.log('Gerando produtos...');
    await writeData(
        'produtos.csv',
        'id,categoria_id,nome,descricao,preco_base,estoque,ativo',
        QTD_PRODUTOS,
        (i) => {
            const id = i + OFFSET_PRODUTO;
            return `${id},${randomInt(1, 10)},Produto ${id},Descricao ${id},${(Math.random() * 500 + 10).toFixed(2)},${randomInt(0, 1000)},true`
        }
    );

    // 3. Gerar Pedidos
    console.log('Gerando pedidos...');
    const statusPermitidos = ['pendente', 'entregue', 'cancelado'];
    const estados = ['SP', 'RJ', 'MG', 'RS', 'SC'];
    
    await writeData(
        'pedidos.csv',
        'id,usuario_id,data,status,logradouro,cep,bairro,uf,cidade,estado',
        QTD_PEDIDOS,
        (i) => {
            const id = i + OFFSET_PEDIDO;
            const userId = randomInt(1, QTD_USUARIOS);
            const status = randomElement(statusPermitidos);
            const uf = randomElement(estados);
            // Formato de data YYYY-MM-DD
            const data = `2023-${String(randomInt(1, 12)).padStart(2, '0')}-${String(randomInt(1, 28)).padStart(2, '0')}`; 
            return `${id},${userId},${data},${status},Rua ${id},12345678,Bairro X,${uf},Cidade Y,Estado Z`;
        }
    );

    // 4. Gerar Itens de Pedido
    console.log('Gerando itens dos pedidos...');
    // Para esta tabela associativa, iteramos sobre os pedidos e criamos de 1 a MAX itens para cada
    await new Promise((resolve, reject) => {
        const stream = fs.createWriteStream(path.join(outputDir, 'itens_pedido.csv'));
        stream.write(`pedido_id,produto_id,quantidade,preco_unitario\n`);

        let pedidoId = 1;
        function write() {
            let ok = true;
            do {
                const qtdItensNestePedido = randomInt(1, MAX_ITENS_POR_PEDIDO);
                // Usar Set para evitar duplicar produto_id no mesmo pedido (PK Composta)
                const produtosSet = new Set<number>();
                
                while(produtosSet.size < qtdItensNestePedido) {
                    produtosSet.add(randomInt(1, QTD_PRODUTOS));
                }

                let dataChunk = '';
                produtosSet.forEach(produtoId => {
                    const qtd = randomInt(1, 5);
                    const preco = (Math.random() * 500 + 10).toFixed(2);
                    dataChunk += `${pedidoId},${produtoId},${qtd},${preco}\n`;
                });

                if (pedidoId === QTD_PEDIDOS) {
                    stream.write(dataChunk, 'utf8');
                    stream.end();
                    stream.on('finish', resolve);
                    return;
                } else {
                    ok = stream.write(dataChunk, 'utf8');
                }
                pedidoId++;
            } while (pedidoId <= QTD_PEDIDOS && ok);

            if (pedidoId <= QTD_PEDIDOS) {
                stream.once('drain', write);
            }
        }
        stream.on('error', reject);
        write();
    });

    console.log('\n✅ Geração de sementes concluída com sucesso!');
    console.log(`📂 Os arquivos CSV estão salvos no diretório: ${outputDir}`);
}

generateAllSeeds().catch(console.error);