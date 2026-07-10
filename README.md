# elisaofiscal.tax

Simulador **gratuito, 100% anônimo e client-side** de parcelamentos de tributos federais, para pessoas físicas e contadores:

- 🏛️ **Regularize / PGFN** — dívida ativa da União (até 60×)
- 🧾 **e-CAC / Receita Federal** — débitos correntes (até 60×)
- 🏪 **Simples Nacional** — PGDAS e MEI (até 60×)
- 📊 **Lucro Presumido** — IRPJ/CSLL trimestral vencido (até 60×)
- 👤 **IRPF** — quotas da declaração anual (até 8×)

## Princípio inegociável: anonimato total

Nenhuma chamada de rede além do carregamento dos arquivos estáticos. Sem cookies, sem analytics, sem formulário que envie dados a servidor algum. `localStorage` guarda apenas preferências de interface (tema e último módulo), removíveis pelo botão **Limpar dados locais**. Estático e anônimo **por design, não por limitação temporária**.

## Como usar

Abra o `index.html` direto no navegador (duplo clique) — não precisa de servidor nem de internet. Ou hospede a pasta em qualquer serviço estático.

## Atualizando a taxa SELIC

A única "base de dados" é [data/selic-tabela.js](data/selic-tabela.js): edite o objeto `taxas` com os valores oficiais do Banco Central (série SGS 4390) e ajuste `meta.atualizadoEm`. Meses ausentes são projetados com a última taxa conhecida e sinalizados na tela.

> ⚠️ Os valores de 2025–2026 que acompanham o repositório são **provisórios** — confira no BCB antes de uso real. Ver pendências no [DEV-LOG.md](DEV-LOG.md).

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
