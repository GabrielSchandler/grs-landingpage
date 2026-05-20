# Guia de Setup & Conversão - GRS Landing Page

Este documento descreve como configurar e otimizar a landing page para receber tráfego pago do Google Ads.

## 1. Setup Inicial

### 1.1 Clonar e instalar dependências
```bash
git clone <seu-repo>
cd grs-landingpage
npm install
```

### 1.2 Configurar variáveis de ambiente
Copie `.env.example` para `.env.local` e preencha:

```bash
cp .env.example .env.local
```

**Obrigatório:**
- `NEXT_PUBLIC_SUPABASE_URL` — URL do seu projeto Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Chave anon do Supabase
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — Seu número (formato: 55119876543)

**Recomendado para tráfego pago:**
- `NEXT_PUBLIC_GTM_ID` — Seu Google Tag Manager ID (GTM-XXXXX)
- `NEXT_PUBLIC_GA4_ID` — Seu Google Analytics 4 ID (G-XXXXX)
- `NEXT_PUBLIC_META_PIXEL_ID` — Seu Meta Pixel ID (opcional)

### 1.3 Rodar localmente
```bash
npm run dev
```
Acesse `http://localhost:3000` no navegador.

---

## 2. Configurar Rastreamento de Conversão

### 2.1 Google Analytics 4 (GA4)

1. Acesse [analytics.google.com](https://analytics.google.com)
2. Crie uma nova propriedade (se não houver) ou use a existente
3. Copie o **Measurement ID** (formato: `G-XXXXXXX`)
4. Cole em `NEXT_PUBLIC_GA4_ID` no `.env.local`
5. **Configurar evento de conversão:**
   - Em GA4 > Admin > Conversões > Criar conversão
   - Nome: `lead_form_submit`
   - Tipo: Evento
   - Marcar caixa para "Contar cada evento como uma conversão"

### 2.2 Google Tag Manager (GTM)

1. Acesse [tagmanager.google.com](https://tagmanager.google.com)
2. Crie um novo container (se não houver) — Tipo: Web
3. Copie o **GTM ID** (formato: `GTM-XXXXX`)
4. Cole em `NEXT_PUBLIC_GTM_ID` no `.env.local`
5. Dentro do GTM:
   - Crie um trigger para "evento_lead_form_submit"
   - Crie uma tag para enviar evento ao GA4

### 2.3 Meta Pixel (Opcional, mas recomendado para retargeting)

1. Acesse [business.facebook.com](https://business.facebook.com)
2. Vá para Eventos > Pixels
3. Copie o **Pixel ID**
4. Cole em `NEXT_PUBLIC_META_PIXEL_ID` no `.env.local`
5. Configure evento de conversão: Lead (lead)

---

## 3. Configurar Google Ads

### 3.1 Criar conversão no Google Ads

1. Acesse [ads.google.com](https://ads.google.com)
2. Vá para Ferramentas > Conversões
3. Clique em "+ Conversão"
4. Selecione "Website"
5. **Nome:** "Lead Form Submit"
6. **Categoria:** "Contato" ou "Geração de leads"
7. **Valor da conversão:** Deixar "Usar valores de conversão diferentes" ou fixar em R$ 100 (ajustar conforme LTV)
8. **Contagem:** "Cada conversão"
9. Copie o código de rastreamento — use em sua conta do GTM ou adicione script direto

### 3.2 Usar Google Tag Manager ou conectar diretamente

**Opção A: Via GTM (recomendado)**
- Crie uma tag no GTM que envia evento "lead_form_submit" ao Google Ads
- Use o conversion ID e label fornecidos

**Opção B: Direto via Google Analytics 4**
- GA4 envia eventos automaticamente ao Google Ads se conectado

### 3.3 Criar campanhas de anúncios

**Tipo de campanha:** Pesquisa ou Rede de Display
**Público-alvo:**
- Palavras-chave: "análise contrato bancário", "revisão juros", "financiamento caro", etc.
- Cidades: Brasil inteiro ou regiões específicas
- Interesse: Finanças pessoais, justiça de consumidor

**Página de destino (URL):** `https://seu-dominio.com`

**Rastreamento de conversão:**
- Selecione a conversão "Lead Form Submit" criada acima
- Defina o valor de oferta (CPA ou ROAS)

---

## 4. Otimizações para Conversão (Implementadas)

✅ **Já foi feito:**
1. **Formulário reduzido:** Apenas 5 campos essenciais visíveis (progressive disclosure)
2. **Progressive state do botão:** Ativado quando campos obrigatórios preenchidos
3. **Página de obrigado (`/obrigado`):** Redireciona após sucesso para rastreamento de URL
4. **Eventos de tracking:** Dispara `lead_form_submit` com GA4/GTM
5. **Design sofisticado:** Gradientes, animações sutis, trust badges
6. **Badges de confiança:** "100% Gratuito", "Sem compromisso", "<2 minutos"
7. **Copy persuasivo:** Foco em dor do cliente e urgência

---

## 5. Dicas Adicionais para Conversão

### 5.1 Melhorias possíveis
- [ ] Adicionar limite de rate para form submission (previne spam)
- [ ] Implementar reCAPTCHA v3 (veja `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`)
- [ ] Criar variante sem imagem hero para teste A/B
- [ ] Testar headline diferente (veja landing-content.ts)
- [ ] Adicionar "oferta limitada" ou urgência temporal (se aplicável)
- [ ] Expandir social proof com mais depoimentos

### 5.2 Mobile first
- Página está otimizada para mobile
- Testou em celular? Abra `http://localhost:3000` no seu mobile

### 5.3 Performance
- Imagens usam `next/image` (otimizado)
- CSS é minificado (TailwindCSS)
- Scripts de rastreamento carregam com `strategy="afterInteractive"`

---

## 6. Build & Deploy

### 6.1 Build local
```bash
npm run build
```

### 6.2 Deploy (Vercel recomendado para Next.js)

**Opção A: Vercel (1-click)**
1. Push do código para GitHub
2. Acesse [vercel.com](https://vercel.com) e importe o repositório
3. Configure variáveis de ambiente na seção "Environment Variables"
4. Deploy automático feito

**Opção B: Outro host**
- Exportar com `npm run build` e `npm run start`
- Certifique-se de que o servidor Node.js está rodando

### 6.3 Domínio customizado
- Aponte seu domínio (DNS) para o servidor do Vercel
- Configure SSL/HTTPS (automático no Vercel)

---

## 7. Monitoramento & Analytics

### 7.1 Métricas importantes
- **Taxa de conversão:** Visitantes → Leads
- **Custo por lead (CPL):** Gasto / Leads capturados
- **Retorno sobre ad spend (ROAS):** Valor da conversão / Gasto
- **Bounce rate:** Pessoas saindo sem converter
- **Tempo na página:** Indicador de engajamento

### 7.2 Onde acompanhar
- **GA4:** Dashboard padrão (Aquisição > Campanhas)
- **Google Ads:** Colunas de conversão na campanha
- **Supabase:** Tabela `leads_landing_page` (dados brutos)

---

## 8. Segurança & Conformidade

✅ **Já implementado:**
- RLS (Row Level Security) no Supabase
- Policy que permite insert anônimo apenas de landing_page
- Aviso de LGPD no formulário e página de obrigado

**Adicionar futuramente:**
- [ ] reCAPTCHA v3 para prevenção de bots
- [ ] Rate limit de 1 submissão por IP/hora
- [ ] Validação de email (verificar se existe)
- [ ] Endpoint server-side (API Route) em vez de direto no browser

---

## 9. Troubleshooting

### Problema: Formulário não envia
- Verifique `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Verifique policy no Supabase: `select * from leads_landing_page;`
- Abra DevTools (F12) > Console para ver erro exato

### Problema: Não aparecem conversões no GA4
- Aguarde 24h (GA4 leva tempo para registrar)
- Verifique se `NEXT_PUBLIC_GA4_ID` está correto
- Use DebugView do GA4 para testar em tempo real

### Problema: WhatsApp não abre
- Verifique format do `NEXT_PUBLIC_WHATSAPP_NUMBER` (sem símbolos, começa com 55)
- Teste em navegador mobile

---

## 10. Próximos Passos (Road Map)

1. **Server-side form handler:** Criar API route (`/api/leads`) para segurança
2. **Email confirmation:** Enviar confirmação por email após submissão
3. **CRM integration:** Conectar com CRM (ex: RD Station, Pipedrive)
4. **Chatbot:** Adicionar chat de pré-atendimento (ex: Intercom)
5. **Retargeting dinâmico:** Mostrar anúncios específicos por tipo de contrato
6. **A/B testing framework:** Sistema para testar múltiplas variantes

---

**Dúvidas?** Consulte a documentação do:
- Supabase: https://supabase.com/docs
- Next.js: https://nextjs.org/docs
- Google Analytics: https://support.google.com/analytics
- Google Ads: https://support.google.com/google-ads
