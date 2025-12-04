// Google Apps Script to accept POST and append lead rows to a Google Sheet
// 1) Create a new Google Sheets file and open Apps Script Editor (Extensions -> Apps Script)
// 2) Replace Code.gs with this content, and update SHEET_NAME
// 3) Deploy -> New deployment -> Web app -> Execute as: Me; Who has access: Anyone (or Anyone with link)
// 4) Copy the web app URL and put it in the meta tag 'sheets-webhook-url' in index.html

const SHEET_NAME = 'Leads'; // Tab name

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    var payload = JSON.parse(e.postData.contents);
    // Attempt to normalize
    var row = [ new Date().toISOString(), payload.email || '', payload.would_buy || '', payload.calls_per_month || '', payload.budget || '', payload.page || '' ];
    sheet.appendRow(row);
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: err.message })).setMimeType(ContentService.MimeType.JSON);
  }
}
