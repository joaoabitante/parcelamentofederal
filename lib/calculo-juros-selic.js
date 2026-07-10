/**
 * Juros de mora pela taxa SELIC — tributos federais.
 *
 * BASE LEGAL:
 *   - Lei nº 9.065/1995, art. 13 e Lei nº 9.430/1996, art. 61, § 3º:
 *     juros equivalentes à taxa SELIC ACUMULADA MENSALMENTE (soma simples
 *     das taxas mensais — não há capitalização composta), a partir do
 *     primeiro dia do mês SUBSEQUENTE ao vencimento até o mês anterior ao
 *     do pagamento, e de 1% no mês do pagamento.
 *   - Lei nº 10.522/2002, art. 13, parágrafo único (parcelamentos):
 *     cada prestação é acrescida de SELIC acumulada a partir do mês
 *     subsequente ao da CONSOLIDAÇÃO até o mês anterior ao do pagamento,
 *     e de 1% no mês do pagamento.
 *
 * INTERPRETAÇÃO ADOTADA (documentada): a 1ª prestação, paga no próprio mês
 * da consolidação, não recebe juros adicionais — o 1% desse mês já está
 * embutido nos juros de mora da consolidação (evita dupla contagem).
 * É o comportamento observado nos sistemas oficiais (e-CAC/Regularize).
 *
 * Meses sem taxa na tabela local (data/selic-tabela.js) são PROJETADOS com
 * a última taxa conhecida e contabilizados em `mesesProjetados`, para que
 * a interface sinalize que se trata de estimativa.
 */
(function () {
  'use strict';

  // ---- utilitários de mês (índice linear: ano*12 + mes-1) ----
  function idx(ano, mes) { return ano * 12 + (mes - 1); }
  function deIdx(i) { return { ano: Math.floor(i / 12), mes: (i % 12) + 1 }; }
  function chave(ano, mes) { return String(ano) + '-' + String(mes).padStart(2, '0'); }

  function tabela() {
    return (window.SELIC_TABELA && window.SELIC_TABELA.taxas) || {};
  }

  /** Última taxa presente na tabela (para projeção de meses futuros). */
  function ultimaConhecida() {
    const t = tabela();
    let melhor = null;
    for (const k of Object.keys(t)) {
      const m = /^(\d{4})-(\d{2})$/.exec(k);
      if (!m || typeof t[k] !== 'number' || !Number.isFinite(t[k])) continue;
      const i = idx(Number(m[1]), Number(m[2]));
      if (melhor === null || i > melhor.i) melhor = { i, taxa: t[k] };
    }
    return melhor;
  }

  /** Taxa do mês; se ausente, projeta com a última conhecida. */
  function taxaMes(ano, mes) {
    const v = tabela()[chave(ano, mes)];
    if (typeof v === 'number' && Number.isFinite(v)) {
      return { taxa: v, projetada: false };
    }
    const u = ultimaConhecida();
    return { taxa: u ? u.taxa : 0, projetada: true };
  }

  /**
   * Soma simples das taxas mensais no intervalo de índices [iInicio, iFim]
   * (inclusive). Intervalo vazio (iFim < iInicio) → 0.
   */
  function acumulada(iInicio, iFim) {
    let soma = 0;
    let projetados = 0;
    for (let i = iInicio; i <= iFim; i++) {
      const m = deIdx(i);
      const r = taxaMes(m.ano, m.mes);
      soma += r.taxa;
      if (r.projetada) projetados++;
    }
    return { percent: soma, mesesProjetados: projetados };
  }

  /**
   * Juros de mora de um débito em aberto, do vencimento até a referência.
   * Regra (art. 61, § 3º, Lei 9.430/96): SELIC do mês seguinte ao
   * vencimento até o mês anterior à referência + 1% no mês da referência.
   * Pagamento no MESMO mês do vencimento → juros zero (só multa de mora).
   *
   * @param {{ano:number, mes:number}} venc
   * @param {{ano:number, mes:number}} ref
   */
  function jurosMoraPercent(venc, ref) {
    const iv = idx(venc.ano, venc.mes);
    const ir = idx(ref.ano, ref.mes);
    if (ir <= iv) return { percent: 0, mesesProjetados: 0 };
    const acc = acumulada(iv + 1, ir - 1);
    return { percent: acc.percent + 1, mesesProjetados: acc.mesesProjetados };
  }

  /**
   * Juros da prestação k de um parcelamento consolidado no mês `ref`
   * (prestação 1 paga no próprio mês da consolidação; prestação k paga
   * k-1 meses depois).
   *
   * Regra (Lei 10.522/2002, art. 13, § único): SELIC do mês subsequente à
   * consolidação até o mês anterior ao pagamento + 1% no mês do pagamento.
   * Prestação 1 → 0% (ver interpretação no cabeçalho deste arquivo).
   * Prestação 2 → 1%. Prestação 3 → SELIC de 1 mês + 1%. E assim por diante.
   *
   * @param {{ano:number, mes:number}} ref mês da consolidação
   * @param {number} k número da prestação (1-based)
   */
  function jurosParcelaPercent(ref, k) {
    const ir = idx(ref.ano, ref.mes);
    const iPag = ir + (k - 1);
    const mesPagamento = deIdx(iPag);
    if (k <= 1) return { percent: 0, mesesProjetados: 0, mesPagamento };
    const acc = acumulada(ir + 1, iPag - 1);
    return {
      percent: acc.percent + 1,
      mesesProjetados: acc.mesesProjetados,
      mesPagamento
    };
  }

  window.CalcSelic = {
    taxaMes,
    acumulada,
    jurosMoraPercent,
    jurosParcelaPercent,
    ultimaConhecida,
    _idx: idx,
    _deIdx: deIdx
  };
})();
