/**
 * Módulo: MEI (Simei) — parcelamento e reparcelamento de débitos na RFB.
 *
 * BASE LEGAL / FONTES OFICIAIS:
 *   - LC nº 123/2006 (Simei) e Resolução CGSN nº 140/2018 (parcelamento).
 *   - Manual do Parcelamento de Débitos do MEI (RFB, v. 02/09/2025):
 *       · máx. 60 parcelas; mín. 2 (dívida consolidada precisa caber em ≥2×);
 *       · parcela mínima R$ 50,00;
 *       · condição: DASN-Simei dos períodos a parcelar;
 *       · débitos do ano-calendário corrente só após transmissão da DASN
 *         daquele ano (ex.: débitos de 2025 só em 2026, após DASN 2025);
 *       · multa de mora no máximo de 20% na consolidação (art. 53 CGSN 140);
 *       · reparcelamento: 1ª parcela 10% ou 20% da consolidada (mesma lógica
 *         do SN), respeitando o mínimo de R$ 50.
 *   - Portal Gov.br: até 60×, mín. R$ 50; 1 negociação/ano-calendário.
 *
 * ⚠️ Não inclui multa por atraso de declaração (MAED/DARF) nem programas
 * especiais encerrados (ex.: Relp-MEI com prazo fechado).
 */
(function () {
  'use strict';
  window.ELISAO_MODULOS = window.ELISAO_MODULOS || [];
  window.ELISAO_MODULOS.push({
    id: 'mei',
    nome: 'MEI · Simei',
    icone: '🧾',
    grupo: 'simples',
    descricao: 'Débitos do MEI na RFB — parcelamento ou reparcelamento (até 60×, mín. R$ 50).',
    maxParcelas: 60,
    minParcelas: 2,
    moraAplicavel: true,
    multaPadraoPercent: 20,
    forcarMultaTeto: true,
    modoReparcelamento: true,
    perfis: [
      { id: 'mei', label: 'Microempreendedor Individual', parcelaMinimaCentavos: 5000 }
    ],
    camposExtras: [],
    avisosFixos: [
      'Condição: DASN-Simei dos períodos a parcelar (Manual do Parcelamento de Débitos do MEI / RFB).',
      'Ex.: em 2026 dá para parcelar débitos de 2025 e anteriores se a DASN-Simei de 2025 já foi transmitida; débitos de 2026 só após a DASN de 2026.',
      'Mínimo de 2 e máximo de 60 parcelas; parcela mínima R$ 50,00. A dívida consolidada precisa ser suficiente para ao menos 2 parcelas.',
      'Reparcelamento: 1ª parcela de 10% (um parcelamento anterior) ou 20% (mais de um) da dívida consolidada, nunca inferior a R$ 50.',
      'Multa de mora na consolidação: teto de 20% (art. 53 da Res. CGSN nº 140/2018).',
      'Multas por atraso de declaração (MAED) pagas em DARF não entram neste parcelamento.',
      'Débito do MEI já em Dívida Ativa da União: simule em Regularize/PGFN ou Transação PGFN.'
    ],
    basesLegais: [
      'Lei Complementar nº 123/2006 (Simei) e alterações',
      'Resolução CGSN nº 140/2018 (parcelamento e art. 53 — multa)',
      'Manual do Parcelamento de Débitos do MEI (RFB)'
    ]
  });
})();
