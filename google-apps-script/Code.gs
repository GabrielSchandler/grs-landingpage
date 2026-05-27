const DEFAULT_SHEET_NAME = "Leads";

const HEADERS = [
  "created_at",
  "nome",
  "whatsapp",
  "tipo_contrato",
  "valor_parcela",
  "parcelas_atrasadas",
  "banco",
  "mensagem",
  "origem",
  "page_url",
];

function doPost(e) {
  try {
    const props = PropertiesService.getScriptProperties();
    const webhookSecret = props.getProperty("WEBHOOK_SECRET");
    const spreadsheetId = props.getProperty("SPREADSHEET_ID");
    const sheetName = props.getProperty("SHEET_NAME") || DEFAULT_SHEET_NAME;
    const payload = JSON.parse((e.postData && e.postData.contents) || "{}");

    if (!webhookSecret || payload.secret !== webhookSecret) {
      return json({ ok: false, error: "unauthorized" });
    }

    const lead = payload.lead || {};
    const meta = payload.meta || {};
    const spreadsheet = spreadsheetId
      ? SpreadsheetApp.openById(spreadsheetId)
      : SpreadsheetApp.getActiveSpreadsheet();
    const sheet = getOrCreateSheet(spreadsheet, sheetName);

    ensureHeaders(sheet);
    const row = buildLeadRow(lead, meta);
    const existingRowIndex = findExistingLeadRow(sheet, lead.whatsapp);

    if (existingRowIndex) {
      const current = sheet.getRange(existingRowIndex, 1, 1, HEADERS.length).getValues()[0];
      sheet.getRange(existingRowIndex, 1, 1, HEADERS.length).setValues([
        mergeLeadRow(current, row),
      ]);

      return json({ ok: true, updated: true });
    }

    sheet.appendRow(row);

    return json({ ok: true, inserted: true });
  } catch (error) {
    return json({
      ok: false,
      error: error && error.message ? error.message : String(error),
    });
  }
}

function buildLeadRow(lead, meta) {
  return [
    meta.submitted_at || new Date().toISOString(),
    lead.nome || "",
    lead.whatsapp || "",
    lead.tipo_contrato || "",
    lead.valor_parcela || "",
    formatBoolean(lead.parcelas_atrasadas),
    lead.banco || "",
    lead.mensagem || "",
    lead.origem || "landing_page",
    meta.page_url || "",
  ];
}

function mergeLeadRow(current, incoming) {
  return HEADERS.map(function (_header, index) {
    if (index === 0) {
      return current[index] || incoming[index];
    }

    if (index === 8) {
      return incoming[index] || current[index];
    }

    return incoming[index] !== "" && incoming[index] !== null && incoming[index] !== undefined
      ? incoming[index]
      : current[index];
  });
}

function findExistingLeadRow(sheet, whatsapp) {
  const target = normalizePhone(whatsapp);

  if (!target || sheet.getLastRow() < 2) {
    return null;
  }

  const whatsappValues = sheet.getRange(2, 3, sheet.getLastRow() - 1, 1).getValues();

  for (let index = whatsappValues.length - 1; index >= 0; index -= 1) {
    if (normalizePhone(whatsappValues[index][0]) === target) {
      return index + 2;
    }
  }

  return null;
}

function normalizePhone(value) {
  return String(value || "").replace(/\D/g, "");
}

function formatBoolean(value) {
  if (value === true) {
    return "Sim";
  }

  if (value === false) {
    return "Não";
  }

  return "";
}

function getOrCreateSheet(spreadsheet, sheetName) {
  return spreadsheet.getSheetByName(sheetName) || spreadsheet.insertSheet(sheetName);
}

function ensureHeaders(sheet) {
  const range = sheet.getRange(1, 1, 1, HEADERS.length);
  const currentHeaders = range.getValues()[0];
  const hasHeaders = currentHeaders.some(function (cell) {
    return String(cell).trim() !== "";
  });

  if (!hasHeaders) {
    range.setValues([HEADERS]);
    sheet.setFrozenRows(1);
  }
}

function json(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
