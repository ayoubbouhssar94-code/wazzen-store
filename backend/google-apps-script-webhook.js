// Paste this into Google Apps Script (script.google.com)
// Attached to your Google Sheet.
// Deploy as Web App (Anyone, even anonymous).
// Set SECRET to match GOOGLE_SHEETS_WEBHOOK_SECRET env var.

const SHEET_NAME = "Orders";
const SECRET = "CHANGE_ME_TO_THE_SAME_VALUE_AS_GOOGLE_SHEETS_WEBHOOK_SECRET";

const COLUMNS = [
  "order_id",
  "order_number",
  "created_at",
  "status",
  "customer_name",
  "phone_local",
  "phone_e164",
  "city",
  "items_summary",
  "items_json",
  "upsell_accepted",
  "upsell_product",
  "subtotal_sar",
  "upsell_sar",
  "total_sar",
  "payment_method",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
  "ttclid",
  "snap_click_id",
  "landing_page",
  "referrer",
  "user_agent",
  "ip_address",
  "meta_event_id",
  "tiktok_event_id",
  "snap_event_id",
  "notes",
];

function doPost(e) {
  try {
    const secret = e.parameter.secret || "";
    if (secret !== SECRET) {
      return jsonResponse({ ok: false, error: "unauthorized" }, 401);
    }

    const payload = JSON.parse(e.postData.contents || "{}");
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = getOrCreateSheet(spreadsheet);
    ensureHeader(sheet);

    const row = COLUMNS.map((column) => valueForCell(payload[column]));
    sheet.appendRow(row);

    return jsonResponse({
      ok: true,
      row: sheet.getLastRow(),
      order_number: payload.order_number || "",
    });
  } catch (error) {
    return jsonResponse({ ok: false, error: String(error) }, 500);
  }
}

function getOrCreateSheet(spreadsheet) {
  return spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
}

function ensureHeader(sheet) {
  const existingHeader = sheet.getRange(1, 1, 1, COLUMNS.length).getValues()[0];
  const hasHeader = existingHeader.some((cell) => String(cell || "").trim() !== "");

  if (!hasHeader) {
    sheet.getRange(1, 1, 1, COLUMNS.length).setValues([COLUMNS]);
    sheet.setFrozenRows(1);
  }
}

function valueForCell(value) {
  if (value === null || value === undefined) return "";
  if (typeof value === "object") return JSON.stringify(value);
  return value;
}

function jsonResponse(body, statusCode) {
  const output = ContentService
    .createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);

  body.statusCode = statusCode || 200;
  output.setContent(JSON.stringify(body));
  return output;
}
