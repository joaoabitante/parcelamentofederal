# DEV-LOG — parcelamentofederal (parcelamento.elisaofiscal.tax)

## 2026-07-10 - Publicação (v1.0.1)

### Alterado
- Pasta local e projeto renomeados de `elisaofiscal-tax` para `parcelamentofederal`.
- Repo publicado no GitHub (`joaoabitante/parcelamentofederal`); domínio definido: `parcelamento.elisaofiscal.tax` no Cloudflare.
- README com seção de publicação; versão exibida na UI bumpada para 1.0.1.

### Decisões técnicas
- Deploy sem build step: Cloudflare servindo os assets estáticos direto do repo (mesmo modelo do premio.elisaofiscal.net).

### Pendências
- Conectar o repo no painel do Cloudflare e vincular o domínio `parcelamento.elisaofiscal.tax` (ação humana, requer login).
- Pendências da v1.0.0 abaixo continuam valendo (SELIC provisória etc.).

## 2026-07-10 - Projeto completo (v1.0.0: shell + 5 módulos + libs)

### Adicionado
- `index.html`: wizard em 3 etapas (tributo → valores → resultado), tema claro/escuro, impressão local (`window.print()`), modais de tabela SELIC e log de atualizações, botão "Limpar dados locais".
- `lib/calculo-multa-mora.js`: multa 0,33%/dia com teto de 20% (art. 61, Lei 9.430/96).
- `lib/calculo-juros-selic.js`: SELIC acumulada por soma simples; juros de mora até a consolidação e juros por prestação (Lei 9.065/95, art. 13; Lei 9.430/96, art. 61, § 3º; Lei 10.522/2002, art. 13, § único).
- `data/selic-tabela.js`: tabela SELIC mensal local, editável manualmente.
- Módulos: `regularize.js` (60x, mín. R$ 100 PF / R$ 500 PJ, encargo legal editável), `ecac.js` (60x, mín. R$ 200 PF / R$ 500 PJ), `simples-nacional.js` (60x, mín. R$ 300 ME/EPP e R$ 50 MEI), `lucro-presumido.js` (60x PJ + aviso sobre quotas do art. 5º da Lei 9.430/96), `irpf.js` (8 quotas, mín. R$ 50, quota única abaixo de R$ 100, 1ª quota sem acréscimo).
- `CHANGELOG.md` + log de versões visível na UI (rodapé → modal).

### Decisões técnicas
- **Scripts clássicos, não ES modules**: `import`/`export` falham em `file://` por CORS; `<script src>` clássico funciona offline abrindo o arquivo direto. Módulos se registram em `window.ELISAO_MODULOS`.
- **`data/selic-tabela.js` em vez do `.json` sugerido na spec**: carregar `.json` exigiria `fetch()`, proibido por design (zero rede) e quebrado em `file://`. Mesmo conteúdo, como variável global.
- **Dinheiro em centavos inteiros** em todo o motor; percentuais só viram centavos com `Math.round` no final; última parcela absorve o resto da divisão para o total fechar exato.
- **1ª prestação sem juros adicionais**: o 1% do mês da consolidação já entra nos juros de mora da consolidação; cobrar de novo na 1ª prestação seria dupla contagem (comportamento observado nos sistemas oficiais). Documentado em `lib/calculo-juros-selic.js`.
- **Multa por dias corridos** (não dias úteis) — simplificação documentada na lib; campo de multa é editável na UI para ajuste manual.
- **Meses sem SELIC na tabela são projetados** com a última taxa conhecida e o resultado exibe aviso de projeção.
- **XSS por construção**: todo conteúdo dinâmico via `createElement`/`textContent` (helper `el()`); nenhum `innerHTML` com dado de usuário.
- `localStorage` guarda somente `elisao.tema` e `elisao.ultimo-modulo` (preferências de UI); botão "Limpar dados locais" remove ambos.

### Pendências
- **[CRÍTICO] Conferir a tabela SELIC**: valores de 2023–2024 vieram do histórico público do BCB, mas 2025–2026 são PROVISÓRIOS/estimados. Substituir pelos oficiais (BCB, série SGS 4390) antes de divulgar.
- Confirmar valores vigentes de parcela mínima: R$ 100/R$ 500 (PGFN, Portaria 6.757/2022), R$ 200/R$ 500 (IN RFB 2.063/2021), R$ 300/R$ 50 (Resolução CGSN 140/2018) e R$ 50 (quota IRPF) — mudam por norma infralegal.
- Confirmar a IN da DIRPF do exercício corrente (regra das 8 quotas).
- Encargo legal do DL 1.025/69 (10%/20%): confirmar aplicação atual na PGFN (transações podem substituí-lo).
- Decidir hospedagem (Cloudflare Workers/Pages como o premioelisaofiscal?) — o site funciona também aberto direto do arquivo.
