# DEV-LOG — parcelamentofederal (parcelamento.elisaofiscal.tax)

## 2026-07-10 - Transação PGFN + comparação (v1.2.0)

### Adicionado
- `modules/transacao-pgfn.js`: simulação genérica de transação por adesão (entrada %, desconto sobre encargos, tetos 65%/70%, entrada até 6×/12×, saldo até 60×).
- Motor `calcular` com `modoTransacao`: breakdown com desconto/entrada/saldo; parcelas de entrada (nominal) + saldo com SELIC e offset de mês após a entrada.
- UI: guardar até 3 cenários em `estado.comparacoes` (RAM da sessão); painel comparativo na etapa 3.

### Decisões técnicas
- **Não amarra a um edital fixo**: campos de % editáveis + avisos fortes — editais mudam; o valor é planejamento, não adesão automática.
- **Entrada sem SELIC embutida** na simulação (valor nominal das cotas de entrada); documentado em aviso — evita fingir precisão de guia oficial.
- **Desconto só sobre encargos** (multa+juros+encargo), limitado ao teto % da dívida do perfil — espelha a lógica típica dos editais sem hardcodar faixas de CAPAG.
- Comparação em memória (não localStorage) para não guardar valores de débito no disco.

### Pendências
- Conferir percentuais/prazos do edital PGFN vigente quando o usuário for divulgar o módulo.
- Opcional v1.3: presets por edital (JSON local versionado) sem rede.

## 2026-07-10 - SELIC oficial automática (v1.1.0)

### Adicionado
- `scripts/atualizar-selic.mjs`: busca a série SGS 4390 na API de dados abertos do BCB (fonte oficial, sem chave), valida cada registro e regenera `data/selic-tabela.js`. Fail-closed: HTTP != 200, JSON malformado, taxa fora de [0, 10] % a.m., série curta ou desatualizada → aborta sem tocar no arquivo.
- `.github/workflows/atualizar-selic.yml`: cron nos dias 3 e 10 de cada mês (BCB consolida o mês anterior nos primeiros dias úteis; a 2ª execução é redundância) + `workflow_dispatch` para rodar manual. Commit do bot dispara o redeploy do Cloudflare.
- Tabela regenerada na hora com dados oficiais: 378 meses (1995-01 a 2026-06).

### Alterado
- Histórico agora começa em 1995 (antes 2023): débitos com vencimento antigo usavam projeção da última taxa para meses PASSADOS — corrigido.
- Valores provisórios de 2025–2026 estavam errados em vários meses (conferido contra o oficial: jul/2025 1,21→1,28; ago 1,17→1,16; out 1,22→1,28; nov 1,17→1,05; dez 1,21→1,22; e todos os de 2026). RESOLVIDA a pendência crítica da v1.0.0.

### Decisões técnicas
- **Quem busca a SELIC é o CI, nunca o navegador**: manter o anonimato do usuário era inegociável; a atualização automática acontece em build-time (Action mensal → commit → redeploy), então o produto continua estático puro e o grep de `fetch(` no código servido ao navegador segue limpo (o único `fetch` real vive em `scripts/`, que o `index.html` não referencia).
- **Mês corrente excluído**: a API devolve o acumulado parcial do mês em andamento (ex.: 0,37 em 10/07/2026), que ainda cresce — incluir corromperia as somas. O 1% do mês de pagamento já é regra fixa do motor.
- Valores entram no arquivo gerado só via `JSON.stringify` (sem interpolar texto bruto da API — sem injeção).

### Pendências
- Após o push, conferir na aba Actions do GitHub se o workflow aparece e rodar um `workflow_dispatch` de teste.
- Conectar o repo no Cloudflare e vincular `parcelamento.elisaofiscal.tax` (ação humana, pendente da v1.0.1).

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
