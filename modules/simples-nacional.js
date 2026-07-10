/**
 * Módulo: Simples Nacional (ME/EPP) — parcelamento e reparcelamento na RFB.
 *
 * BASE LEGAL / FONTES OFICIAIS:
 *   - LC nº 123/2006, art. 21, §§ 15 a 24 (parcelamento de débitos do SN).
 *   - Resolução CGSN nº 140/2018, arts. 46 a 55 e art. 53 (consolidação;
 *     multa de mora no valor máximo de 20% mesmo com atraso < 60 dias).
 *   - Manual do Parcelamento do Simples Nacional (RFB, v. 06/08/2024):
 *       · máx. 60 parcelas; mín. 2 parcelas; parcela mín. R$ 300,00;
 *       · contribuinte pode escolher quantidade ≤ máximo possível;
 *       · reparcelamento: 1ª parcela = 10% (um parcelamento anterior) ou
 *         20% (mais de um) da dívida consolidada; nunca inferior a R$ 300;
 *       · não se aplica a MEI (aplicativo próprio), nem a DAU (PGFN).
 *   - Portal Gov.br: 1 negociação/ano-calendário (regra operacional RFB).
 *
 * ⚠️ Conferir manuais/editais vigentes no Portal do Simples Nacional.
 */
(function () {
  'use strict';
  window.ELISAO_MODULOS = window.ELISAO_MODULOS || [];
  window.ELISAO_MODULOS.push({
    id: 'simples',
    nome: 'Simples Nacional · ME/EPP',
    icone: '🏪',
    grupo: 'simples',
    descricao: 'PGDAS-D na RFB — parcelamento ou reparcelamento (até 60×, mín. R$ 300).',
    maxParcelas: 60,
    minParcelas: 2,
    moraAplicavel: true,
    /** Art. 53 Res. CGSN 140/2018: consolidação com multa no teto de 20%. */
    multaPadraoPercent: 20,
    forcarMultaTeto: true,
    modoReparcelamento: true,
    perfis: [
      { id: 'me', label: 'ME / EPP (PGDAS-D)', parcelaMinimaCentavos: 30000 }
    ],
    camposExtras: [],
    avisosFixos: [
      'Multa de mora na consolidação do SN: teto de 20% mesmo com atraso inferior a 60 dias (art. 53 da Res. CGSN nº 140/2018 — Manual RFB).',
      'Mínimo de 2 e máximo de 60 parcelas; parcela mínima R$ 300,00 (Manual do Parcelamento do Simples Nacional / CGSN 140).',
      'Reparcelamento: 1ª parcela de 10% (um parcelamento anterior) ou 20% (mais de um) da dívida consolidada, nunca inferior a R$ 300 (Manual RFB § reparcelamento).',
      'Não cobre MEI (use o módulo MEI), nem débito já inscrito em Dívida Ativa da União (use Regularize/PGFN).',
      'ICMS/ISS transferidos a Estado/Município ou lançados isoladamente saem deste parcelamento federal.',
      'Regra operacional comum: um pedido de parcelamento por ano-calendário no âmbito da RFB — confira no Portal do Simples.'
    ],
    basesLegais: [
      'Lei Complementar nº 123/2006, art. 21, §§ 15 a 24',
      'Resolução CGSN nº 140/2018, arts. 46 a 55 e art. 53',
      'Manual do Parcelamento do Simples Nacional (RFB)'
    ]
  });
})();
