/**
 * Você é o Arquiteto de Software de uma nova Fintech. 
 * A empresa vai lançar uma carteira multi-moedas que suporta Real (BRL), Bitcoin (BTC) e Ethereum (ETH). Cada moeda tem um fator de fracionamento diferente na vida real:
 * BRL (Centavos): 2 casas decimais 
 * ($10^2$)BTC (Satoshis): 8 casas decimais
 * ($10^8$)ETH (Wei): 18 casas decimais ($10^{18}$)
 * O Problema Arquitetural: O limite seguro de um número padrão no JavaScript (Number.MAX_SAFE_INTEGER) é de 15 dígitos.
 * Como o Ethereum usa 18 casas decimais, a matemática tradicional do JS vai estourar a memória e corromper o saldo se você usar multiplicadores comuns.
 * 
 * Sua Missão: Sem código base guiado. Você deve criar o motor de gerenciamento dessa carteira.
 * - Crie um objeto carteira que armazene o saldo isolado de cada moeda.
 * - Crie a lógica que seja capaz de lidar com depósitos e saques de qualquer uma das três moedas.
 * 
 * Critério de Aceite: O sistema deve permitir o depósito de 0.1 ETH e 0.2 ETH, e a leitura do saldo da memória deve retornar exatos 300000000000000000 Wei (sem casas decimais sobressalentes). E a função de teste unitário não deve printar o erro no console!
 */



/**
 * 
 * @param {string} coin 
 * @param {string} operation 
 * @param {number} decimalValue 
 */
function processTransaction(coin, operation, decimalValue) {
 
}

/**
 * 
 * @param {string} coin 
 */
function loadCredits(coin) {

}


function unitTest() {
  processTransaction("ETH", "DEPOSIT", 0.1);
  processTransaction("ETH", "DEPOSIT", 0.2);

  const credits = loadCredits("ETH");

  if (credits !== "0.30" && credits !== "0.300000000000000000") {
    console.log(
      `❌ ERRO GRAVE! Saldo detectado: ${credits} ETH. Falha de precisão.`,
    );
  }
}

unitTest();