const SECRET = "";

const COLUMNS = [
  "date",
  "orderid",
  "country",
  "name",
  "phone",
  "product",
  "sku",
  "quantity",
  "total price",
  "currency",
  "status"
];

function doPost(e) {
  try {
    if (SECRET) {
      const secret = e.parameter.secret || "";
      if (secret !== SECRET) {
        return jsonResponse({ ok: false, error: "unauthorized" }, 401);
      }
    }

    const payload = JSON.parse(e.postData.contents || "{}");
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheets()[0];
    ensureHeader(sheet);

    const rowData = mapPayload(payload);
    const row = COLUMNS.map((column) => valueForCell(rowData[column]));
    sheet.appendRow(row);

    return jsonResponse({
      ok: true,
      row: sheet.getLastRow(),
      order_number: rowData["orderid"] || "",
    });
  } catch (error) {
    return jsonResponse({ ok: false, error: String(error) }, 500);
  }
}

function mapPayload(payload) {
  let items = [];
  try {
    items = JSON.parse(payload.items_json || "[]");
  } catch (error) {
    items = [];
  }

  const skus = items
    .map((item) => item.sku || "")
    .filter(Boolean)
    .join("/"); // separated by /

  const quantities = items
    .map((item) => {
        const qty = Number(item.qty || item.quantity || 0);
        return Number.isFinite(qty) ? qty : 0;
    })
    .join("/"); // separated by /

  return {
    date: formatDate(payload.created_at),
    "orderid": payload.order_number || "",
    country: "KSA",
    name: payload.customer_name || "",
    phone: payload.phone_e164 ? payload.phone_e164.replace('+', '') : (payload.phone_local || ""), // 966... format
    product: payload.items_summary || "",
    sku: skus,
    quantity: quantities,
    status: "", // empty as requested
    "total price": payload.total_sar || "",
    currency: "SAR",
  };
}

function formatDate(value) {
  if (!value) {
    return Utilities.formatDate(new Date(), "Asia/Riyadh", "yyyy-MM-dd HH:mm");
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return String(value);
  }

  return Utilities.formatDate(parsed, "Asia/Riyadh", "yyyy-MM-dd HH:mm");
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
