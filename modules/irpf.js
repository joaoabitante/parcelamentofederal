/**
 * Módulo: IRPF — parcelamento (quotas) do saldo a pagar da declaração
 * anual de ajuste da pessoa física.
 *
 * BASE LEGAL:
 *   - Lei nº 9.250/1995, art. 14, e IN RFB anual da DIRPF (ex.: IN RFB
 *     nº 2.134/2023, art. 12, para o exercício 2023 — conferir a IN do
 *     exercício corrente):
 *       · saldo pode ser pago em até 8 quotas mensais e sucessivas;
 *       · quota mínima de R$ 50,00;
 *       · imposto inferior a R$ 100,00 deve ser pago em quota única;
 *       · 1ª quota vence no prazo final de entrega, SEM acréscimos;
 *       · 2ª quota: juros de 1%;
 *       · demais quotas: SELIC acumulada do mês seguinte ao prazo de
 *         entrega até o mês anterior ao pagamento + 1% no mês do pagamento.
 *
 * OBSERVAÇÃO: não há multa de mora aqui — as quotas são opção legal de
 * pagamento dentro do prazo, não atraso. Saldo de IRPF VENCIDO (declaração
 * entregue e quotas não pagas) deve ser simulado no módulo e-CAC.
 */
(function () {
  'use strict';
  window.ELISAO_MODULOS = window.ELISAO_MODULOS || [];
  window.ELISAO_MODULOS.push({
    id: 'irpf',
    nome: 'IRPF · Quotas da declaração',
    icone: '👤',
    descricao: 'Saldo a pagar da declaração anual — até 8 quotas mensais.',
    maxParcelas: 8,
    moraAplicavel: false,          // quotas dentro do prazo: sem multa/juros de mora
    usaReferencia: false,          // a consolidação é o próprio prazo de entrega
    labelVencimento: 'Prazo final de entrega da declaração',
    valorMinimoParcelamentoCentavos: 10000, // < R$ 100,00 → quota única
    perfis: [
      { id: 'pf', label: 'Pessoa Física', parcelaMinimaCentavos: 5000 }
    ],
    camposExtras: [],
    avisosFixos: [
      'A 1ª quota vence junto com o prazo de entrega da declaração, sem acréscimos; as demais vencem no último dia útil de cada mês seguinte.',
      'Imposto menor que R$ 100,00 deve ser pago em quota única.',
      'Quota em atraso vira débito comum (multa 0,33%/dia até 20% + SELIC) — nesse caso, simule no módulo e-CAC.'
    ],
    basesLegais: [
      'Lei nº 9.250/1995, art. 14',
      'IN RFB da DIRPF do exercício (ex.: IN RFB nº 2.134/2023, art. 12) — conferir a IN do ano corrente'
    ]
  });
})();
