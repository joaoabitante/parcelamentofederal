/**
 * Tabela SELIC mensal (% ao mês) — única "base de dados" do sistema.
 *
 * FONTE OFICIAL: Banco Central do Brasil — https://www.bcb.gov.br
 * Série SGS nº 4390 ("Taxa de juros - Selic acumulada no mês").
 *
 * POR QUE UM ARQUIVO .JS E NÃO .JSON:
 * carregar .json exigiria fetch(), que é proibido por design (anonimato
 * total, zero requisições de rede) e falha quando o arquivo é aberto via
 * file://. Um script clássico com variável global funciona offline.
 *
 * ATUALIZAÇÃO MANUAL: edite o objeto `taxas` abaixo e ajuste
 * `meta.atualizadoEm`. Nenhuma chamada de API é feita — por design.
 *
 * ⚠️ IMPORTANTE: os valores de 2025 e 2026 abaixo são PROVISÓRIOS
 * (estimativas para desenvolvimento) e DEVEM ser substituídos pelos
 * valores oficiais do BCB antes de uso real. Ver pendências no DEV-LOG.md.
 *
 * Meses ausentes da tabela são projetados pela última taxa conhecida
 * (ver lib/calculo-juros-selic.js) e sinalizados na interface como
 * "projeção".
 */
window.SELIC_TABELA = {
  meta: {
    fonte: 'Banco Central do Brasil — série SGS 4390 (Selic acumulada no mês)',
    atualizadoEm: '2026-07-10',
    observacao: 'Valores de 2023 e 2024 conforme histórico público do BCB. ' +
      'Valores de 2025 e 2026 são PROVISÓRIOS e precisam de conferência ' +
      'na fonte oficial antes de uso real.'
  },
  // chave: "AAAA-MM" → taxa % acumulada no mês
  taxas: {
    '2023-01': 1.12, '2023-02': 0.92, '2023-03': 1.17, '2023-04': 0.92,
    '2023-05': 1.12, '2023-06': 1.07, '2023-07': 1.07, '2023-08': 1.14,
    '2023-09': 0.97, '2023-10': 1.00, '2023-11': 0.92, '2023-12': 0.89,

    '2024-01': 0.97, '2024-02': 0.80, '2024-03': 0.83, '2024-04': 0.89,
    '2024-05': 0.83, '2024-06': 0.79, '2024-07': 0.91, '2024-08': 0.87,
    '2024-09': 0.84, '2024-10': 0.93, '2024-11': 0.79, '2024-12': 0.93,

    // ⚠️ 2025 em diante: PROVISÓRIO — substituir pelos valores oficiais (BCB)
    '2025-01': 1.01, '2025-02': 0.99, '2025-03': 1.06, '2025-04': 1.06,
    '2025-05': 1.14, '2025-06': 1.10, '2025-07': 1.21, '2025-08': 1.17,
    '2025-09': 1.22, '2025-10': 1.22, '2025-11': 1.17, '2025-12': 1.21,

    '2026-01': 1.20, '2026-02': 1.09, '2026-03': 1.20, '2026-04': 1.15,
    '2026-05': 1.17, '2026-06': 1.19
  }
};
