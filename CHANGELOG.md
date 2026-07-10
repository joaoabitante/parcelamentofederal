# Changelog — parcelamentofederal (parcelamento.elisaofiscal.tax)

Formato: [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) · Versionamento: [SemVer](https://semver.org/lang/pt-BR/).

## [1.1.0] - 2026-07-10

### Adicionado
- Atualização automática da tabela SELIC: GitHub Actions roda `scripts/atualizar-selic.mjs` nos dias 3 e 10 de cada mês, busca a série oficial SGS 4390 na API de dados abertos do Banco Central, regenera `data/selic-tabela.js` e commita (o Cloudflare redeploya sozinho). Fail-closed: dado inesperado aborta sem tocar na tabela.
- Histórico completo da SELIC desde janeiro/1995 (378 meses) — débitos antigos deixam de depender de projeção para meses passados.

### Corrigido
- Valores provisórios de 2025–2026 substituídos pelos oficiais do BCB (ex.: jul/2025: 1,21 → 1,28; nov/2025: 1,17 → 1,05).
- Mês corrente é excluído da tabela (a API devolve acumulado parcial, que corromperia as somas).

### Privacidade
- Nada muda para quem usa: o navegador continua sem fazer nenhuma requisição externa — quem consulta o BCB é o robô de CI, uma vez por mês.

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
