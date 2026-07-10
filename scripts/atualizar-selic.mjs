#!/usr/bin/env node
/**
 * Regenera data/selic-tabela.js a partir da fonte OFICIAL:
 * API de dados abertos do Banco Central do Brasil, série SGS 4390
 * ("Taxa de juros - Selic acumulada no mês", % a.m.).
 * Docs: https://dadosabertos.bcb.gov.br (sem autenticação, sem chave).
 *
 * ONDE RODA: exclusivamente no GitHub Actions
 * (.github/workflows/atualizar-selic.yml) ou na máquina do mantenedor.
 * NUNCA roda no navegador do usuário — o site continua estático e anônimo:
 * quem consulta o BCB é o robô de CI, uma vez por mês.
 *
 * SEGURANÇA (fail-closed): qualquer resposta inesperada — HTTP != 200,
 * JSON malformado, data fora do padrão, taxa fora da faixa [0, 10] % a.m.,
 * série curta ou desatualizada — aborta com exit 1 SEM tocar no arquivo,
 * preservando a última tabela válida. Os valores só entram no .js gerado
 * via JSON.stringify (sem interpolação de texto bruto da API).
 *
 * REGRA IMPORTANTE: o mês corrente é excluído — a API informa o acumulado
 * parcial do mês em andamento, que ainda vai crescer; incluí-lo
 * corromperia as somas. O 1% do mês do pagamento já é regra fixa do motor.
 */
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// SELIC como juros de tributo federal existe desde 01/1995 (Lei 9.065/95)
const URL_API = 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.4390/dados?formato=json&dataInicial=01/01/1995';
const ARQUIVO = join(dirname(fileURLToPath(import.meta.url)), '..', 'data', 'selic-tabela.js');

function falhar(motivo) {
  console.error('ERRO (tabela NÃO alterada): ' + motivo);
  process.exit(1);
}

const resp = await fetch(URL_API, { headers: { accept: 'application/json' } })
  .catch(e => falhar('falha de rede ao consultar o BCB: ' + e.message));
if (!resp.ok) falhar('API do BCB respondeu HTTP ' + resp.status);
const dados = await resp.json().catch(() => falhar('resposta do BCB não é JSON válido'));
if (!Array.isArray(dados) || dados.length < 300) {
  falhar('série suspeita: esperado >= 300 meses desde 1995, veio ' + (Array.isArray(dados) ? dados.length : typeof dados));
}

const agora = new Date();
const idxMesAtual = agora.getUTCFullYear() * 12 + agora.getUTCMonth();
const taxas = {};
let idxMaisRecente = -Infinity;

for (const item of dados) {
  const m = /^01\/(\d{2})\/(\d{4})$/.exec(item && item.data ? item.data : '');
  const v = Number(item && item.valor);
  if (!m) falhar('data fora do padrão dd/mm/aaaa: ' + JSON.stringify(item));
  if (!Number.isFinite(v) || v < 0 || v > 10) falhar('taxa fora da faixa [0, 10]: ' + JSON.stringify(item));
  const mes = Number(m[1]);
  const ano = Number(m[2]);
  if (mes < 1 || mes > 12 || ano < 1995 || ano > 2100) falhar('mês/ano inválido: ' + JSON.stringify(item));
  const idx = ano * 12 + (mes - 1);
  if (idx >= idxMesAtual) continue; // mês corrente: acumulado parcial, descartar
  taxas[ano + '-' + String(mes).padStart(2, '0')] = v;
  if (idx > idxMaisRecente) idxMaisRecente = idx;
}

if (idxMaisRecente < idxMesAtual - 3) {
  falhar('série desatualizada: último mês fechado disponível está a mais de 3 meses de distância');
}

const hoje = agora.toISOString().slice(0, 10);
const conteudo = `/**
 * Tabela SELIC mensal (% ao mês) — única "base de dados" do sistema.
 *
 * ARQUIVO GERADO AUTOMATICAMENTE — NÃO EDITAR À MÃO.
 * Gerador: scripts/atualizar-selic.mjs (GitHub Actions, mensal), a partir
 * da fonte oficial: Banco Central do Brasil, API de dados abertos,
 * série SGS 4390 ("Selic acumulada no mês"). Edições manuais serão
 * sobrescritas na próxima execução do robô.
 *
 * O navegador do usuário NUNCA consulta a API — este arquivo estático é a
 * única fonte em tempo de uso (anonimato por design). O mês corrente não
 * aparece aqui de propósito (acumulado parcial); meses ausentes são
 * projetados pela última taxa conhecida e sinalizados na interface.
 */
window.SELIC_TABELA = {
  meta: {
    fonte: 'Banco Central do Brasil — API de dados abertos, série SGS 4390 (Selic acumulada no mês)',
    atualizadoEm: ${JSON.stringify(hoje)},
    observacao: 'Tabela gerada automaticamente a partir da API oficial do BCB. ' +
      'Cobre de janeiro/1995 até o último mês fechado; o mês corrente é ' +
      'excluído por ser acumulado parcial.'
  },
  // chave: "AAAA-MM" → taxa % acumulada no mês
  taxas: ${JSON.stringify(taxas, null, 2).replace(/\n/g, '\n  ')}
};
`;

writeFileSync(ARQUIVO, conteudo, 'utf8');
const chaves = Object.keys(taxas).sort();
console.log('OK: ' + chaves.length + ' meses gravados (' + chaves[0] + ' até ' + chaves[chaves.length - 1] + ') em data/selic-tabela.js');
