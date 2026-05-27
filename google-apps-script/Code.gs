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
  const lock = LockService.getScriptLock();
  let locked = false;

  try {
    lock.waitLock(10000);
    locked = true;

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
    const matchingRows = findLeadRowsByPhone(sheet, lead.whatsapp);

    if (matchingRows.length > 0) {
      const canonicalRowIndex = matchingRows[0];
      const existingRows = matchingRows.map(function (rowIndex) {
        return sheet.getRange(rowIndex, 1, 1, HEADERS.length).getValues()[0];
      });
      const mergedRow = existingRows.concat([row]).reduce(function (current, incoming) {
        return mergeLeadRow(current, incoming);
      });

      sheet.getRange(canonicalRowIndex, 1, 1, HEADERS.length).setValues([mergedRow]);
      deleteDuplicateRows(sheet, matchingRows.slice(1));

      return json({
        ok: true,
        updated: true,
        merged_duplicates: matchingRows.length - 1,
      });
    }

    sheet.appendRow(row);

    return json({ ok: true, inserted: true });
  } catch (error) {
    return json({
      ok: false,
      error: error && error.message ? error.message : String(error),
    });
  } finally {
    if (locked) {
      lock.releaseLock();
    }
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

function findLeadRowsByPhone(sheet, whatsapp) {
  const target = normalizePhone(whatsapp);

  if (!target || sheet.getLastRow() < 2) {
    return [];
  }

  const whatsappValues = sheet.getRange(2, 3, sheet.getLastRow() - 1, 1).getValues();
  const matchingRows = [];

  for (let index = 0; index < whatsappValues.length; index += 1) {
    if (normalizePhone(whatsappValues[index][0]) === target) {
      matchingRows.push(index + 2);
    }
  }

  return matchingRows;
}

function deleteDuplicateRows(sheet, rowIndexes) {
  rowIndexes
    .slice()
    .sort(function (a, b) {
      return b - a;
    })
    .forEach(function (rowIndex) {
      sheet.deleteRow(rowIndex);
    });
}

function deduplicateExistingLeads() {
  const lock = LockService.getScriptLock();
  let locked = false;

  try {
    lock.waitLock(10000);
    locked = true;

    const props = PropertiesService.getScriptProperties();
    const spreadsheetId = props.getProperty("SPREADSHEET_ID");
    const sheetName = props.getProperty("SHEET_NAME") || DEFAULT_SHEET_NAME;
    const spreadsheet = spreadsheetId
      ? SpreadsheetApp.openById(spreadsheetId)
      : SpreadsheetApp.getActiveSpreadsheet();
    const sheet = getOrCreateSheet(spreadsheet, sheetName);

    ensureHeaders(sheet);

    if (sheet.getLastRow() < 2) {
      return;
    }

    const rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, HEADERS.length).getValues();
    const phones = [];
    const mergedByPhone = {};

    rows.forEach(function (row) {
      const phone = normalizePhone(row[2]);

      if (!phone) {
        const missingPhoneKey = "row_without_phone_" + phones.length;
        phones.push(missingPhoneKey);
        mergedByPhone[missingPhoneKey] = row;
        return;
      }

      if (!mergedByPhone[phone]) {
        phones.push(phone);
        mergedByPhone[phone] = row;
        return;
      }

      mergedByPhone[phone] = mergeLeadRow(mergedByPhone[phone], row);
    });

    sheet.getRange(2, 1, sheet.getLastRow() - 1, HEADERS.length).clearContent();

    if (phones.length > 0) {
      sheet.getRange(2, 1, phones.length, HEADERS.length).setValues(
        phones.map(function (phone) {
          return mergedByPhone[phone];
        }),
      );
    }
  } finally {
    if (locked) {
      lock.releaseLock();
    }
  }
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

  sheet.getRange(1, 3, sheet.getMaxRows(), 1).setNumberFormat("@");
}

function json(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
