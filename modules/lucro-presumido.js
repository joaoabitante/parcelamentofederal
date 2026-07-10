/**
 * Módulo: Lucro Presumido — IRPJ/CSLL apurados trimestralmente.
 *
 * BASE LEGAL:
 *   - Lei nº 9.430/1996, art. 5º: o IRPJ/CSLL do trimestre pode ser pago em
 *     quota única no mês seguinte ao encerramento OU em até 3 quotas
 *     mensais (quota mínima R$ 1.000,00), com juros SELIC a partir da 2ª.
 *     ESSA opção de quotas vale para débito DENTRO do prazo e não é
 *     parcelamento — está descrita nos avisos.
 *   - Débito VENCIDO segue o parcelamento ordinário: Lei nº 10.522/2002,
 *     art. 10 (até 60 prestações) e IN RFB nº 2.063/2021 (prestação mínima
 *     de R$ 500,00 para pessoa jurídica). É este o cálculo simulado aqui,
 *     com multa de mora (art. 61 da Lei 9.430/96) e juros SELIC.
 */
(function () {
  'use strict';
  window.ELISAO_MODULOS = window.ELISAO_MODULOS || [];
  window.ELISAO_MODULOS.push({
    id: 'lucro-presumido',
    nome: 'Lucro Presumido',
    icone: '📊',
    descricao: 'IRPJ/CSLL trimestral vencido — parcelamento ordinário em até 60 vezes.',
    maxParcelas: 60,
    moraAplicavel: true,
    perfis: [
      { id: 'pj', label: 'Pessoa Jurídica', parcelaMinimaCentavos: 50000 }
    ],
    camposExtras: [],
    avisosFixos: [
      'Se o trimestre ainda está DENTRO do prazo, não é caso de parcelamento: a lei permite pagar em até 3 quotas mensais de no mínimo R$ 1.000,00, com SELIC a partir da 2ª quota (Lei 9.430/96, art. 5º).',
      'Informe como "data de vencimento" o último dia útil do mês seguinte ao encerramento do trimestre (vencimento da quota única).',
      'IRPJ e CSLL são débitos distintos no e-CAC — simule cada um separadamente se os valores forem diferentes.'
    ],
    basesLegais: [
      'Lei nº 9.430/1996, art. 5º (quotas do trimestre) e art. 61 (multa de mora)',
      'Lei nº 10.522/2002, art. 10 (parcelamento ordinário)',
      'IN RFB nº 2.063/2021 (prestação mínima)'
    ]
  });
})();
