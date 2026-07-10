/**
 * Módulo: Transação PGFN por adesão (simulação genérica de entrada + desconto).
 *
 * BASE LEGAL / REFERÊNCIA (regras mudam por edital — sempre conferir o vigente):
 *   - Lei nº 13.988/2020 e alterações (transação tributária).
 *   - Portarias/editais da PGFN (ex.: Edital de transação por adesão):
 *       · entrada facilitada tipicamente ~6% do valor da dívida SEM desconto,
 *         em até 6 parcelas (ou até 12 para PF, MEI, ME, EPP e equiparados);
 *       · desconto sobre juros, multas e encargo legal (não sobre o principal),
 *         com teto sobre o valor total da dívida (ex.: 65% geral / 70% perfis especiais);
 *       · saldo remanescente em até 60 prestações (limites menores para alguns
 *         débitos previdenciários — ver edital).
 *   - Lei nº 10.522/2002, art. 13, § único: prestações com SELIC + 1%.
 *
 * Esta ferramenta NÃO replica um edital específico linha a linha: o usuário
 * informa % de entrada e % de desconto (com tetos editáveis por perfil) para
 * planejar cenários. Sempre confronte com o Regularize / edital vigente.
 *
 * ⚠️ CONFERIR: percentuais, prazos e elegibilidade mudam a cada edital PGFN.
 */
(function () {
  'use strict';
  window.ELISAO_MODULOS = window.ELISAO_MODULOS || [];
  window.ELISAO_MODULOS.push({
    id: 'transacao-pgfn',
    nome: 'Transação PGFN · adesão',
    icone: '🤝',
    descricao: 'Dívida ativa com entrada + desconto sobre encargos (simulação genérica de editais de transação).',
    maxParcelas: 60,
    moraAplicavel: true,
    modoTransacao: true,
    // Entrada: % sobre o consolidado ANTES do desconto (padrão dos editais).
    entrada: {
      percentPadrao: 6,
      min: 0,
      max: 100,
      // parcelas de entrada: teto depende do perfil (ver perfis.maxParcelasEntrada)
      ajuda: 'Percentual de entrada sobre o valor consolidado SEM desconto (padrão típico dos editais: 6%).'
    },
    // Desconto incide sobre multa + juros + encargo (nunca sobre o principal),
    // limitado ao teto % do consolidado (perfil).
    desconto: {
      percentPadrao: 50,
      min: 0,
      max: 100,
      ajuda: 'Percentual de desconto sobre encargos (multa + juros + encargo). Limitado ao teto do perfil sobre o valor total da dívida.'
    },
    perfis: [
      {
        id: 'geral',
        label: 'Pessoa jurídica (geral)',
        parcelaMinimaCentavos: 50000,
        maxParcelasEntrada: 6,
        tetoDescontoDividaPct: 65
      },
      {
        id: 'especial',
        label: 'PF / MEI / ME / EPP e equiparados',
        parcelaMinimaCentavos: 10000,
        maxParcelasEntrada: 12,
        tetoDescontoDividaPct: 70
      }
    ],
    camposExtras: [
      {
        id: 'encargo',
        label: 'Encargo legal (%)',
        padrao: 10,
        min: 0,
        max: 20,
        ajuda: 'DL 1.025/69: 20% se inscrito; 10% se parcelado antes do ajuizamento. Se o valor já for consolidado no Regularize, use 0 e multa 0%.'
      }
    ],
    avisosFixos: [
      'Simulação GENÉRICA de transação por adesão: percentuais e prazos dependem do edital PGFN vigente — confira no Regularize antes de aderir.',
      'A entrada é calculada sobre o consolidado SEM desconto; o desconto reduz encargos (multa, juros e encargo), com teto sobre o valor total da dívida.',
      'Débitos previdenciários podem ter teto menor de prazo (ex.: 60 meses) — ver edital e códigos de receita.',
      'Transação é ato formal com a PGFN: esta ferramenta não transmite pedido nem gera DARF/guia oficial.'
    ],
    basesLegais: [
      'Lei nº 13.988/2020 (transação tributária) e alterações',
      'Editais/portarias PGFN de transação por adesão (conferir o vigente)',
      'Lei nº 10.522/2002, art. 13, § único (SELIC nas prestações)',
      'Decreto-Lei nº 1.025/1969 (encargo legal)'
    ]
  });
})();
