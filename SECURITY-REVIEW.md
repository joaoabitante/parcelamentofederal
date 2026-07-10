# SECURITY-REVIEW — parcelamentofederal

Checklist de revisão (perspectiva de dev sênior). Qualquer ❌ bloqueia release.

## v1.3.0 (2026-07-10) — SEO + reparcelamento SN/MEI

- ✅ **Anonimato** — SEO só com meta/JSON-LD estáticos; sem analytics, sem `fetch` no browser; `mei.js` script clássico local.
- ✅ **Validação** — reparcelamento: n ≥ 2; 1ª ≥ mínimo da modalidade; saldo das demais ≥ mínimo; % só 10 ou 20.
- ✅ **DOM** — filtros e rádios de reparcelamento via `el()` / atributos seguros.
- ⚠️ **Regras genéricas de manual** — não substituem o aplicativo oficial do Portal do Simples; disclaimers mantidos.

## v1.2.0 (2026-07-10) — Transação PGFN + comparação em sessão

- ✅ **Anonimato preservado** — comparação só em `estado.comparacoes` (RAM); sem localStorage de valores/datas; zero `fetch` em arquivos do browser; novo módulo `transacao-pgfn.js` é script estático clássico.
- ✅ **DOM seguro** — painel de comparação e tabelas de entrada usam helper `el()` / `textContent`.
- ✅ **Validação** — entrada % e desconto % em [0,100]; parcelas de entrada ≤ teto do perfil; desconto limitado a encargos e ao teto % da dívida; centavos inteiros.
- ⚠️ **Simulação genérica de edital** — não substitui Regularize/edital vigente; disclaimers no módulo e na UI. Não bloqueia release (ferramenta de planejamento).
- ⚠️ **Entrada sem SELIC embutida** — simplificação documentada em aviso no resultado.

## v1.1.0 (2026-07-10) — pipeline automático da SELIC

- ✅ **Anonimato do usuário preservado** — o navegador continua sem fazer nenhuma requisição externa; o único `fetch` real do repositório está em `scripts/atualizar-selic.mjs`, que roda apenas no GitHub Actions e NÃO é referenciado pelo `index.html`. A regra de grep passa a ser: nenhum `fetch(`/`XMLHttpRequest`/`sendBeacon` em arquivos carregados pelo navegador (`index.html`, `lib/`, `modules/`, `data/`).
- ✅ **Fonte oficial e primária** — API de dados abertos do Banco Central (`api.bcb.gov.br`, série SGS 4390), HTTPS, sem chave, sem intermediário/terceiro.
- ✅ **Fail-closed** — resposta inesperada (HTTP != 200, JSON inválido, data fora do padrão, taxa fora de [0, 10] % a.m., série curta ou desatualizada há mais de 3 meses) aborta com exit 1 sem tocar no arquivo; a última tabela válida permanece no ar.
- ✅ **Sem injeção no arquivo gerado** — valores da API só entram via `JSON.stringify`; nenhum texto bruto da resposta é interpolado no `.js`.
- ✅ **Mês corrente excluído** — a API retorna acumulado parcial do mês em andamento; o script grava somente meses fechados (correção de cálculo).
- ✅ **Permissões mínimas no CI** — workflow com `permissions: contents: write` apenas; sem secrets (API pública); commit assinado como `github-actions[bot]`; versões de actions fixadas em major estável (`checkout@v4`, `setup-node@v4`).
- ✅ **Pendência crítica da v1.0.0 RESOLVIDA** — valores provisórios de 2025–2026 substituídos pelos oficiais do BCB (378 meses, 1995-01 a 2026-06, conferidos por amostragem contra a série publicada).

## v1.0.0 (2026-07-10) — release inicial

## 6.1 Privacidade / Anonimato

- ✅ **Nenhuma chamada de rede em tempo de execução** — grep por `fetch(`, `XMLHttpRequest`, `sendBeacon`, `<script src="http` no código: zero ocorrências fora de comentários/documentação. Todos os `<script src>` apontam para arquivos locais relativos.
- ✅ **Nenhum identificador pessoal persistido** — não há campo de nome/CPF/CNPJ no sistema. `localStorage` guarda apenas `elisao.tema` e `elisao.ultimo-modulo`; valores e datas da simulação vivem só em memória e somem ao fechar a aba.
- ✅ **Nenhum analytics/pixel/terceiro embutido** — zero scripts externos, zero cookies, zero iframes.
- ⚠️ **Link externo de doação (LiveTip) no rodapé** — navegação só ocorre por clique explícito do usuário, com `rel="noopener noreferrer"`; nenhum dado é anexado à URL. Aceito por ser marca registrada dos projetos do autor; remover se quiser anonimato absoluto até no referer de saída.

## 6.2 Segurança de código (client-side)

- ✅ **Sem `eval`, `Function()` ou `innerHTML` com dado do usuário** — todo DOM dinâmico é criado via `createElement` + `textContent` (helper `el()`).
- ✅ **Inputs numéricos validados** — parse próprio de moeda pt-BR com regex estrita; rejeita `NaN`, negativos e valores acima de R$ 100 bi (`Number.isSafeInteger`); nº de parcelas validado como inteiro em [1, teto legal]; multa limitada a [0, 20]; extras limitados a [min, max] do módulo; datas validadas (inclusive dias inexistentes, ex.: 31/02).
- ✅ **Nenhum `mailto:`/`action=` para servidor externo** — o único form tem `submit` interceptado com `preventDefault()`; exportação é `window.print()` local.

## 6.3 Correção dos cálculos

- ✅ **Fórmulas com base legal em comentário** — multa: art. 61, Lei 9.430/96; juros: Lei 9.065/95 art. 13, Lei 9.430/96 art. 61 § 3º, Lei 10.522/2002 art. 13 § único; limites por módulo citados em cada arquivo de `modules/`.
- ✅ **Casos de borda testados** — parcela abaixo do mínimo (erro com sugestão do nº máximo), parcelas acima do teto (erro), referência anterior ao vencimento (erro), pagamento no mesmo mês do vencimento (juros 0, só multa), IRPF < R$ 100 (quota única obrigatória), valor vazio/negativo/não numérico (erro).
- ✅ **Arredondamento monetário** — centavos inteiros em todo o motor; `Math.round` apenas na aplicação de percentuais; última parcela absorve o resto da divisão (total fecha exato); multa calculada em centésimos inteiros (33/dia).
- ⚠️ **Tabela SELIC com valores provisórios (2025–2026)** — cálculo correto, mas insumo precisa de conferência oficial (BCB). Bloqueia divulgação pública, não o uso em desenvolvimento. Ver DEV-LOG.
- ⚠️ **Multa em dias corridos** (lei conta a partir do 1º dia útil) — pode superestimar 1–2 dias; campo editável na UI compensa. Documentado na lib.

## 6.4 UX de confiança

- ✅ **Disclaimers visíveis** — barra fixa ("não substitui o cálculo oficial"), rodapé com "o que esta ferramenta NÃO é" e rodapé de cada simulação impressa.
- ✅ **Fonte/data da tabela SELIC exibida** — no rodapé e em todo resultado (aviso com data de atualização); modal "Ver tabela SELIC local" mostra todos os valores.
- ✅ **Botão "Limpar dados locais" funcional e visível** — no topo de todas as telas; informa exatamente o que era guardado.

## Veredicto

**Liberado para uso local/desenvolvimento.** Release público condicionado às pendências ⚠️ de conferência da tabela SELIC e dos valores mínimos vigentes (ver DEV-LOG.md).
