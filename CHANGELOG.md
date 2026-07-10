# Changelog — parcelamentofederal (parcelamento.elisaofiscal.tax)

Formato: [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) · Versionamento: [SemVer](https://semver.org/lang/pt-BR/).

## [1.3.1] - 2026-07-10

### Adicionado
- Identidade visual no cabeçalho: **logo SVG** (ícone de parcelas + wordmark `parcelamento.elisaofiscal.tax`) e **favicon** embutido em data-URI — sem rede, adapta ao tema.

## [1.3.0] - 2026-07-10

### Adicionado
- **MEI · Simei** como módulo próprio (Manual RFB 02/09/2025): 2–60 parcelas, mín. R$ 50, DASN-Simei, reparcelamento 10%/20%.
- **Reparcelamento** no Simples Nacional e no MEI: 1ª parcela de 10% (um histórico) ou 20% (mais de um) da dívida consolidada, com piso da modalidade (R$ 300 / R$ 50) — Manual do Parcelamento RFB.
- Multa de consolidação no **teto de 20%** para SN/MEI (art. 53 Res. CGSN nº 140/2018), editável se o valor já vier consolidado.
- SEO: Open Graph, Twitter, canonical, JSON-LD `WebApplication`, `robots.txt`, `sitemap.xml`.
- UI/UX: intro com H2 semântico, filtros por grupo (Simples/MEI, PGFN, e-CAC, PF), meta-regras nos cartões, sugestão de nº de parcelas.

### Alterado
- Simples Nacional restrito a **ME/EPP** (PGDAS-D); MEI saiu deste cartão.
- Mínimo de **2 parcelas** no SN/MEI (manuais RFB).

### Privacidade
- Sem mudanças de rede: continua 100% client-side e anônimo.

## [1.2.0] - 2026-07-10

### Adicionado
- Módulo **Transação PGFN · adesão**: entrada (%) sobre consolidado sem desconto, desconto sobre encargos com teto por perfil (65% / 70%), parcelas de entrada e saldo em até 60× com SELIC.
- Comparar até **3 simulações na sessão** (memória do navegador — sem localStorage de valores, sem rede).
- Badge «novo» no cartão da transação; marca alinhada a `parcelamento.elisaofiscal.tax`.

### Alterado
- Motor de cálculo compartilhado aceita `modoTransacao` (entrada, desconto, offset de meses do saldo após a entrada).
- Módulo Regularize aponta para o novo módulo de transação em vez de só avisar “não coberto”.

### Privacidade
- Comparações ficam só em RAM da aba; fechar a aba apaga. Continua zero `fetch` no código servido ao browser.

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
