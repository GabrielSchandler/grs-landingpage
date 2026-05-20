# Setup Google Sheets para Leads

Este projeto salva os leads em uma planilha usando:

```text
Formulario -> /api/leads -> Google Apps Script -> Google Sheets
```

## 1. Preparar a planilha

1. Abra a planilha criada no Google Sheets.
2. Renomeie a aba que recebera os leads para `Leads`.
3. Copie o ID da planilha pela URL:

```text
https://docs.google.com/spreadsheets/d/ID_DA_PLANILHA/edit
```

O ID fica entre `/d/` e `/edit`.

## 2. Configurar o Apps Script

1. Na planilha, clique em `Extensoes > Apps Script`.
2. Apague o conteudo padrao do arquivo `Code.gs`.
3. Cole o conteudo de `google-apps-script/Code.gs`.
4. Abra `Configuracoes do projeto`.
5. Em `Propriedades do script`, adicione:

```text
SPREADSHEET_ID=ID_DA_PLANILHA
SHEET_NAME=Leads
WEBHOOK_SECRET=crie-uma-senha-longa-aqui
```

Use o mesmo valor de `WEBHOOK_SECRET` em `GOOGLE_SHEETS_WEBHOOK_SECRET` na Vercel.

## 3. Publicar como Web App

1. Clique em `Implantar > Nova implantacao`.
2. Selecione o tipo `App da Web`.
3. Em `Executar como`, escolha `Eu`.
4. Em `Quem pode acessar`, escolha `Qualquer pessoa`.
5. Clique em `Implantar`.
6. Autorize o acesso quando o Google pedir.
7. Copie a URL terminada em `/exec`.

## 4. Configurar a Vercel

No projeto da Vercel, va em `Settings > Environment Variables` e adicione:

```text
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
GOOGLE_SHEETS_WEBHOOK_SECRET=o-mesmo-segredo-do-apps-script
NEXT_PUBLIC_WHATSAPP_NUMBER=5511940394084
```

Depois faca um novo deploy.

## 5. Testar

1. Abra a landing page publicada.
2. Envie um lead de teste.
3. Confirme se apareceu uma nova linha na aba `Leads`.
4. Confirme se a pagina redirecionou para `/obrigado`.

Se o formulario nao enviar, confira:

- A URL do Web App termina com `/exec`.
- O Apps Script esta publicado como `Qualquer pessoa`.
- O segredo e identico na Vercel e nas propriedades do Apps Script.
- A planilha permite que sua conta edite o arquivo.

## Origens dos leads

Na coluna `origem`, voce pode separar:

- `landing_page`: pessoa enviou o formulario principal.
- `whatsapp_popup`: pessoa clicou em WhatsApp, preencheu o popup e foi redirecionada.
- `form_autosave`: pessoa digitou um WhatsApp valido no formulario, mas ainda nao clicou em enviar.
