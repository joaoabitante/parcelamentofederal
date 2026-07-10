/**
 * Multa de mora — tributos federais pagos em atraso.
 *
 * BASE LEGAL: art. 61 da Lei nº 9.430/1996:
 *   - 0,33% por dia de atraso;
 *   - limitada a 20% do valor do tributo;
 *   - contada a partir do 1º dia subsequente ao vencimento até o dia do
 *     pagamento.
 *
 * SIMPLIFICAÇÃO DOCUMENTADA: a lei conta a partir do primeiro dia ÚTIL
 * subsequente ao vencimento. Esta implementação usa dias corridos a partir
 * do dia seguinte ao vencimento, o que pode superestimar a multa em 1–2
 * dias (0,33%–0,66%) quando o vencimento cai antes de fim de semana ou
 * feriado — nunca subestima o teto de 20%. O campo de multa na interface é
 * editável, permitindo ajuste manual pelo usuário.
 */
(function () {
  'use strict';

  const MS_POR_DIA = 24 * 60 * 60 * 1000;

  /**
   * @param {{ano:number, mes:number, dia:number}} venc data de vencimento
   * @param {{ano:number, mes:number, dia:number}} ref  data do cálculo/pagamento
   * @returns {number} multa em % (0 a 20), com 2 casas decimais exatas
   */
  function multaMoraPercent(venc, ref) {
    const tVenc = Date.UTC(venc.ano, venc.mes - 1, venc.dia);
    const tRef = Date.UTC(ref.ano, ref.mes - 1, ref.dia);
    const dias = Math.floor((tRef - tVenc) / MS_POR_DIA);
    if (!Number.isFinite(dias) || dias <= 0) return 0;
    // 0,33%/dia calculado em centésimos inteiros (33/dia) para evitar
    // erro de ponto flutuante; teto de 20% (art. 61, § 2º, Lei 9.430/96)
    return Math.min((dias * 33) / 100, 20);
  }

  window.CalcMulta = { multaMoraPercent };
})();
