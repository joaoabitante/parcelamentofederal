# Changelog — parcelamentofederal (parcelamento.elisaofiscal.tax)

Formato: [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) · Versionamento: [SemVer](https://semver.org/lang/pt-BR/).

## [1.0.1] - 2026-07-10

### Alterado
- Projeto renomeado para `parcelamentofederal`; publicado no GitHub com domínio oficial `parcelamento.elisaofiscal.tax` (Cloudflare).
- README com instruções de publicação (estático puro, sem build).

## [1.0.0] - 2026-07-10

### Adicionado
- Primeira versão: simulador 100% client-side e anônimo de parcelamentos federais.
- Módulos: Regularize/PGFN, e-CAC/Receita Federal, Simples Nacional, Lucro Presumido e IRPF (quotas).
- Multa de mora 0,33%/dia (teto 20%) sugerida automaticamente e editável.
- Juros SELIC com tabela local editável (`data/selic-tabela.js`) e projeção sinalizada para meses futuros.
- Comparativo entre quantidades de parcelas, tabela de prestações e exportação por impressão local.
- Tema claro/escuro, acessibilidade (labels, teclado, `aria-live`), botão "Limpar dados locais".
- Log de atualizações visível na própria interface (rodapé → 📋).
