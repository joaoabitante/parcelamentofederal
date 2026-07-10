/**
 * Módulo: Regularize / PGFN — parcelamento ordinário de dívida ativa da União.
 *
 * BASE LEGAL:
 *   - Lei nº 10.522/2002, art. 10: parcelamento em até 60 prestações
 *     mensais e sucessivas.
 *   - Lei nº 10.522/2002, art. 13, § único: prestações acrescidas de SELIC
 *     acumulada + 1% no mês do pagamento.
 *   - Portaria PGFN nº 6.757/2022: parcela mínima de R$ 100,00 para pessoa
 *     física e R$ 500,00 para pessoa jurídica (parcelamento comum).
 *   - Decreto-Lei nº 1.025/1969: encargo legal de 20% sobre o débito
 *     inscrito em dívida ativa, reduzido a 10% se o pagamento/parcelamento
 *     ocorre antes do ajuizamento da execução fiscal.
 *
 * ⚠️ CONFERIR: valores de parcela mínima e percentuais do encargo mudam por
 * portaria — validar na PGFN (regularize.pgfn.gov.br) antes de uso real.
 */
(function () {
  'use strict';
  window.ELISAO_MODULOS = window.ELISAO_MODULOS || [];
  window.ELISAO_MODULOS.push({
    id: 'regularize',
    nome: 'Regularize · PGFN',
    icone: '🏛️',
    descricao: 'Dívida ativa da União — parcelamento ordinário em até 60 vezes.',
    maxParcelas: 60,
    moraAplicavel: true,
    perfis: [
      { id: 'pf', label: 'Pessoa Física', parcelaMinimaCentavos: 10000 },
      { id: 'pj', label: 'Pessoa Jurídica', parcelaMinimaCentavos: 50000 }
    ],
    // Encargo legal incide sobre o subtotal (principal + multa + juros).
    camposExtras: [
      {
        id: 'encargo',
        label: 'Encargo legal (%)',
        padrao: 10,
        min: 0,
        max: 20,
        ajuda: 'DL 1.025/69: 20% sobre o débito inscrito; 10% se pago/parcelado antes do ajuizamento da execução. Se o valor informado já for o consolidado do Regularize, use 0.'
      }
    ],
    avisosFixos: [
      'Se você copiou o valor já CONSOLIDADO do Regularize (com multa, juros e encargo), informe multa 0%, zere o encargo e use a data de hoje como vencimento para não duplicar acréscimos.',
      'Transações especiais da PGFN (ex.: transação por adesão) têm regras próprias de entrada e desconto e NÃO são cobertas por esta simulação.',
      'Parcelamento é confessado e o descumprimento de 3 parcelas causa rescisão (Lei 10.522/2002, art. 14-B).'
    ],
    basesLegais: [
      'Lei nº 10.522/2002, arts. 10 a 14-B (parcelamento ordinário)',
      'Portaria PGFN nº 6.757/2022 (parcela mínima)',
      'Decreto-Lei nº 1.025/1969 (encargo legal)'
    ]
  });
})();
