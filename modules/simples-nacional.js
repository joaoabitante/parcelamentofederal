/**
 * Módulo: Simples Nacional — parcelamento de débitos apurados no regime
 * (PGDAS-D / DASN-SIMEI).
 *
 * BASE LEGAL:
 *   - Lei Complementar nº 123/2006, art. 21, §§ 15 a 24: parcelamento em
 *     até 60 parcelas mensais, com juros SELIC + 1% no mês do pagamento.
 *   - Resolução CGSN nº 140/2018, arts. 46 a 55: parcela mínima de
 *     R$ 300,00 para ME/EPP e R$ 50,00 para MEI; um pedido por ano-calendário
 *     no âmbito da RFB (regra geral).
 *
 * ⚠️ CONFERIR: parcelamentos ESPECIAIS (ex.: Relp) têm regras próprias e
 * prazo de adesão encerrado — este módulo cobre apenas o parcelamento
 * convencional vigente. Validar valores mínimos na resolução em vigor.
 */
(function () {
  'use strict';
  window.ELISAO_MODULOS = window.ELISAO_MODULOS || [];
  window.ELISAO_MODULOS.push({
    id: 'simples',
    nome: 'Simples Nacional',
    icone: '🏪',
    descricao: 'Débitos do Simples (PGDAS) e do MEI — até 60 vezes.',
    maxParcelas: 60,
    moraAplicavel: true,
    perfis: [
      { id: 'me', label: 'ME / EPP', parcelaMinimaCentavos: 30000 },
      { id: 'mei', label: 'MEI', parcelaMinimaCentavos: 5000 }
    ],
    camposExtras: [],
    avisosFixos: [
      'ICMS e ISS incluídos no DAS seguem o mesmo parcelamento enquanto o débito estiver na RFB; após transferência ao Estado/Município, as regras passam a ser locais.',
      'Regra geral: um pedido de parcelamento por ano-calendário no âmbito da RFB (Resolução CGSN 140/2018).',
      'Débito do Simples já inscrito em dívida ativa deve ser simulado no módulo Regularize · PGFN.'
    ],
    basesLegais: [
      'Lei Complementar nº 123/2006, art. 21, §§ 15 a 24',
      'Resolução CGSN nº 140/2018, arts. 46 a 55'
    ]
  });
})();
