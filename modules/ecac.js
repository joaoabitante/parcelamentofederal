/**
 * Módulo: e-CAC / Receita Federal — parcelamento de débitos correntes
 * (ainda NÃO inscritos em dívida ativa).
 *
 * BASE LEGAL:
 *   - Lei nº 10.522/2002, art. 10: até 60 prestações mensais e sucessivas.
 *   - IN RFB nº 2.063/2021: unificou parcelamento ordinário e simplificado,
 *     sem limite de valor para adesão pelo e-CAC; prestação mínima de
 *     R$ 200,00 (pessoa física) e R$ 500,00 (pessoa jurídica) — art. 6º.
 *   - Lei nº 10.522/2002, art. 13, § único: prestações acrescidas de SELIC
 *     acumulada + 1% no mês do pagamento.
 *
 * ⚠️ CONFERIR: valores mínimos de prestação são fixados por IN e podem
 * mudar — validar na IN vigente antes de uso real.
 */
(function () {
  'use strict';
  window.ELISAO_MODULOS = window.ELISAO_MODULOS || [];
  window.ELISAO_MODULOS.push({
    id: 'ecac',
    nome: 'e-CAC · Receita Federal',
    icone: '🧾',
    descricao: 'Débitos correntes (não inscritos em dívida ativa) — até 60 vezes.',
    maxParcelas: 60,
    moraAplicavel: true,
    perfis: [
      { id: 'pf', label: 'Pessoa Física', parcelaMinimaCentavos: 20000 },
      { id: 'pj', label: 'Pessoa Jurídica', parcelaMinimaCentavos: 50000 }
    ],
    camposExtras: [],
    avisosFixos: [
      'Não podem ser parcelados por aqui: débitos do Simples Nacional (módulo próprio), quotas do IRPF em dia (módulo próprio) e tributos retidos na fonte (IN RFB 2.063/2021, art. 14).',
      'Débitos já inscritos em dívida ativa devem ser simulados no módulo Regularize · PGFN.',
      'A falta de pagamento de 3 prestações (consecutivas ou não) causa rescisão do parcelamento.'
    ],
    basesLegais: [
      'Lei nº 10.522/2002, arts. 10 a 14-B',
      'IN RFB nº 2.063/2021 (parcelamento ordinário/simplificado no e-CAC)'
    ]
  });
})();
