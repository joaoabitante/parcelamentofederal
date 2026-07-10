# parcelamentofederal

**Site:** [parcelamento.elisaofiscal.tax](https://parcelamento.elisaofiscal.tax) (Cloudflare)

Simulador **gratuito, 100% anônimo e client-side** de parcelamentos de tributos federais, para pessoas físicas e contadores:

- 🏛️ **Regularize / PGFN** — dívida ativa da União (até 60×)
- 🤝 **Transação PGFN · adesão** — entrada + desconto sobre encargos (simulação genérica de editais)
- 🧾 **e-CAC / Receita Federal** — débitos correntes (até 60×)
- 🏪 **Simples Nacional** — PGDAS e MEI (até 60×)
- 📊 **Lucro Presumido** — IRPJ/CSLL trimestral vencido (até 60×)
- 👤 **IRPF** — quotas da declaração anual (até 8×)

## Princípio inegociável: anonimato total

Nenhuma chamada de rede além do carregamento dos arquivos estáticos. Sem cookies, sem analytics, sem formulário que envie dados a servidor algum. `localStorage` guarda apenas preferências de interface (tema e último módulo), removíveis pelo botão **Limpar dados locais**. Estático e anônimo **por design, não por limitação temporária**.

## Como usar

Abra o `index.html` direto no navegador (duplo clique) — não precisa de servidor nem de internet. Ou acesse a versão hospedada em [parcelamento.elisaofiscal.tax](https://parcelamento.elisaofiscal.tax).

## Publicação (Cloudflare)

O site é 100% estático, sem build step: basta conectar este repositório do GitHub ao Cloudflare (Workers/Pages com assets estáticos, mesmo modelo do premio.elisaofiscal.net), servindo a raiz do repo, e vincular o domínio customizado `parcelamento.elisaofiscal.tax`. Nenhuma variável de ambiente, nenhum comando de build.

## Taxa SELIC: oficial e automática

A única "base de dados" é [data/selic-tabela.js](data/selic-tabela.js), **gerada automaticamente** (não editar à mão): nos dias 3 e 10 de cada mês, o GitHub Actions ([atualizar-selic.yml](.github/workflows/atualizar-selic.yml)) executa [scripts/atualizar-selic.mjs](scripts/atualizar-selic.mjs), que busca a série oficial **SGS 4390** na API de dados abertos do Banco Central, valida os dados (fail-closed) e commita a tabela regenerada — o Cloudflare redeploya sozinho.

**Isso não quebra o anonimato:** quem consulta o BCB é o robô de CI, uma vez por mês. O navegador de quem usa o site continua sem fazer nenhuma requisição externa.

A tabela cobre de janeiro/1995 até o último mês fechado; o mês corrente fica de fora (acumulado parcial) e meses futuros são projetados com a última taxa conhecida, com aviso na tela.

## Estrutura

```
index.html               shell + wizard + motor de cálculo
modules/                 regras de cada tributo (base legal comentada)
lib/                     multa de mora e juros SELIC
data/selic-tabela.js     tabela SELIC local editável
DEV-LOG.md               log de desenvolvimento e pendências
SECURITY-REVIEW.md       checklist de segurança/privacidade por release
CHANGELOG.md             histórico de versões (também visível na UI)
```

## Aviso legal

Ferramenta de simulação independente. **Não substitui o cálculo oficial da Receita Federal/PGFN** e não constitui orientação jurídica ou contábil.
