# Campanha Google Ads — GRS Soluções (v2)

Plano pronto para montar, baseado na análise da campanha anterior
(maio/2026: R$ 396,67 / 121 cliques / 3 conversões não confiáveis).

**Aprendizados aplicados:**
- Buscas de **dor/situação** converteram (`atraso financiamento veículo`, `parcela do carro muito alta`).
- Jargão puro (`revisional de juros`) e **correspondência ampla sem negativas** queimaram ~30% do orçamento com curiosos, concorrentes e DIY.
- Foco inicial em **veículo** (onde houve sinal). Imobiliário/consignado entram depois, em campanha separada.

---

## 1. Configuração da campanha

| Item | Valor |
|---|---|
| Tipo | Rede de Pesquisa (Search) |
| Meta | Leads |
| Redes | **Pesquisa apenas** — DESmarcar "Rede de Display" e "Parceiros de pesquisa" |
| Localização | Começar por **São Paulo (estado)** ou capitais; expandir para Brasil após achar o CPL. Usar "Presença: pessoas que estão nos locais segmentados" (não "interesse") |
| Idioma | Português |
| Orçamento | R$ 40–60/dia, **estável**, sem desligar por ≥ 2–3 semanas |
| Lance inicial | **Maximizar cliques** com **CPC máx. R$ 3,50** |
| Lance fase 2 | Trocar para **Maximizar conversões** após ~15–30 conversões válidas; depois **CPA desejado** |
| Dispositivos | Todos (tráfego é majoritariamente mobile/WhatsApp) |
| URL final | a URL real da landing (com `?utm_source=google&utm_medium=cpc&utm_campaign=revisao_veiculo`) |

> **Por que Maximizar cliques no começo:** o histórico de conversão era inválido (disparava no autosave). Com o tracking corrigido, é preciso reacumular sinal antes de deixar a IA de lance assumir.

---

## 2. Estrutura de grupos de anúncios

Campanha: **GRS | Pesquisa | Revisão Veículo**

### Grupo 1 — Parcela alta / dívida
Tipos: frase `"..."` e exata `[...]` (sem ampla no início).
```
"parcela do carro muito alta"
"parcela do financiamento muito alta"
"financiamento do carro muito caro"
"não consigo pagar o financiamento do carro"
"dívida do financiamento não diminui"
[parcela do carro muito alta]
```

### Grupo 2 — Atraso / risco (converteu na v1)
```
"atraso no financiamento do veículo"
"financiamento atrasado o que fazer"
"parcela do carro atrasada"
[atraso financiamento veículo]
```
> Inclui dor de busca e apreensão (a landing trabalha isso), mas monitore: termos puramente informacionais já estão nas negativas.

### Grupo 3 — Revisão de juros / contrato
Tight, frase/exata + negativas fortes (esse tema atrai advogado/concorrente/DIY).
```
"revisão de juros do financiamento de veículo"
"juros abusivos no financiamento do carro"
"revisão de contrato de financiamento de veículo"
"reduzir juros do financiamento do carro"
[revisão de juros financiamento]
```

> **Imobiliário / consignado:** criar **campanha separada** depois (CET e público diferentes). Não misturar no mesmo grupo — foi o erro da v1.

---

## 3. Palavras-chave negativas (lista no nível da campanha)

Criar em Ferramentas → Palavras-chave negativas → nova lista → aplicar à campanha.

**Pesquisa/DIY:**
```
simulador, simular, calculadora, calcular, planilha, excel,
tabela price, amortização, juros compostos, como calcular, como somar juros
```
**Informacional / jurídico-teórico:**
```
o que é, o que significa, como funciona, lei, superendividamento,
súmula, tema 1085, jusbrasil, modelo de contrato, contrato pdf
```
**Transferência / repasse / quitação:**
```
quitar, quitei, repasse, repasso, assumir parcelas, transfiro,
contrato de gaveta, contrato de compra e venda, vendi meu carro,
comprei um carro, assumir financiamento
```
**Concorrentes / marcas (vistas na v1):**
```
trie, carbank, c6auto, hunting, v4 consultoria, nacional g3, avt prime,
simplifica soluções, dr lion, reis revisional, ferlob, votre, sicow,
hawk, xjures, revision solution
```
**Novo financiamento / score / vistoria:**
```
score, como financiar, vistoria, aprovar financiamento, simular financiamento
```
> **NÃO** negativar de cara: `atraso`, `busca e apreensão`, `alienado` (são dor real da landing). Negativar só as variantes informacionais — já cobertas acima.

---

## 4. Anúncios responsivos (RSA)

Limites: títulos ≤ 30 caracteres (até 15), descrições ≤ 90 caracteres (até 4).
Tom honesto, **sem promessa de resultado** (política de serviços financeiros do Google).

### RSA — Grupos 1 e 2 (dor / parcela / atraso)
**Títulos:**
```
Parcela do Carro Pesando?
Análise Grátis do Contrato
Entenda Sua Parcela
Revisão de Contrato Bancário
Juros, Tarifas e CET
Análise Técnica Gratuita
Sem Compromisso
Resposta em até 1h
Atendimento pelo WhatsApp
Veja o que Você Paga
Especialistas em Contratos
Análise Sem Custo
Atendimento em Todo Brasil
Fale com um Especialista
GRS Soluções
```
**Descrições:**
```
Analisamos juros, tarifas e cláusulas do seu financiamento. Grátis e sem compromisso.
Entenda cada cobrança da sua parcela em linguagem simples, sem juridiquês.
Retorno em até 1h no horário comercial pelo WhatsApp. Atendimento humano.
Orientação honesta sobre seu contrato bancário. Sem promessa, sem pressão.
```

### RSA — Grupo 3 (revisão de juros)
**Títulos:**
```
Revisão de Juros Abusivos?
Análise Grátis do Contrato
Juros do Financiamento Altos?
Verificação Técnica de Juros
Revisão de Contrato Bancário
Entenda Seu CET e Tarifas
Sem Compromisso
Resposta em até 1h
Especialistas em Contratos
Análise Sem Custo
Atendimento pelo WhatsApp
Veja se Há Cobrança Indevida
Fale com um Especialista
Atendimento em Todo Brasil
GRS Soluções
```
**Descrições:**
```
Verificamos se há juros ou tarifas fora do padrão no seu contrato. Grátis.
Análise técnica do CET, juros e cláusulas em linguagem simples.
Retorno em até 1h no horário comercial pelo WhatsApp. Sem pressão.
Diagnóstico honesto: dizemos se vale ou não questionar o contrato.
```

---

## 5. Extensões (recursos)

- **Sitelinks:** Como funciona · Contratos analisados · Dúvidas frequentes · Fale no WhatsApp
- **Frases de destaque:** 100% Gratuito · Sem Compromisso · Resposta em até 1h · Atendimento Nacional · Linguagem Simples
- **Snippets estruturados** (Tipos): Veículos, Imobiliário, Consignado, Empréstimo pessoal
- **Chamada/telefone:** o número do WhatsApp comercial (se atender ligação)

---

## 6. Conversões (depende do tracking corrigido)

1. **Conversão primária (agora):** ação de conversão de site "Lead Form Submit"
   - ID já no código: `AW-18177854451`
   - Falta definir o **label** em `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_LEAD` (Vercel)
   - Contagem: "Uma" (1 lead por pessoa)
2. **Conversão de qualidade (próximo passo — o pulo do gato):**
   - Criar ação de conversão **por importação** ("Cliente qualificado")
   - Quando um lead da planilha vira cliente, importar `gclid` + data
   - Tornar essa a conversão **primária de otimização** → a IA passa a buscar cliente, não só preenchimento
3. **Enhanced Conversions for Leads** (opcional): enviar telefone com hash para recuperar atribuição perdida.

---

## 7. Cronograma de otimização

| Semana | Ação |
|---|---|
| 0 | Subir campanha (Max cliques, CPC R$3,50), negativas aplicadas, tracking validado |
| 1 | Revisar **Termos de pesquisa** a cada 2–3 dias; negativar lixo novo |
| 2 | Pausar keywords com gasto e 0 conversão; subir lance nas que convertem |
| 3–4 | Com ~15–30 conversões válidas → trocar para Maximizar conversões |
| 5+ | Ativar importação de conversão offline (cliente) → CPA desejado |
