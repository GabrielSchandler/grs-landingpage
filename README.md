# GRS Solucoes Landing Page

Landing page em Next.js App Router para captacao de leads de analise revisional de juros.

## Rodar localmente

```bash
npm install
npm run dev
```

Crie um arquivo `.env.local` a partir de `.env.example`:

```bash
GOOGLE_SHEETS_WEBHOOK_URL=
GOOGLE_SHEETS_WEBHOOK_SECRET=
NEXT_PUBLIC_WHATSAPP_NUMBER=
```

## Google Sheets

Os leads sao enviados para a rota server-side `POST /api/leads`, que valida os dados com Zod e repassa a solicitacao para um Web App do Google Apps Script.

Veja o passo a passo completo em `GOOGLE_SHEETS_SETUP.md`.

1. Abra a planilha de leads no Google Sheets.
2. Va em `Extensoes > Apps Script`.
3. Cole o conteudo de `google-apps-script/Code.gs`.
4. Configure as propriedades do script:
   - `SPREADSHEET_ID`
   - `SHEET_NAME`
   - `WEBHOOK_SECRET`
5. Publique como Web App e copie a URL `/exec`.
6. Configure essa URL em `GOOGLE_SHEETS_WEBHOOK_URL`.
7. Use o mesmo segredo em `GOOGLE_SHEETS_WEBHOOK_SECRET`.

## Tracking

O carregamento de GTM, GA4 e Meta Pixel fica em `src/app/layout.tsx`. Mantenha IDs publicos em variaveis `NEXT_PUBLIC_*`.
