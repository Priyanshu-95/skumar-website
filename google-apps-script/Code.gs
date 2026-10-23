/**
 * ============================================================================
 * S KUMAR CONSTRUCTION & INTERIOR — GOOGLE APPS SCRIPT FORM INTEGRATION
 * ============================================================================
 * Authorized Google Account: infoskumarinterior@gmail.com
 * Target Google Spreadsheet: S Kumar Construction & Interior - Form Responses
 * 
 * Purpose:
 * Saves ALL website enquiries (from both the Contact Page form and the Quick
 * Estimator popup) into ONE single, unified "All Inquiries" sheet tab, row-by-row
 * in chronological order.
 * ============================================================================
 */

var SPREADSHEET_NAME = "S Kumar Construction & Interior - Form Responses";
var MAIN_SHEET_NAME = "All Inquiries";

/**
 * Handle HTTP GET - Health check and status ping
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "ok",
    service: "S Kumar Construction & Interior - Form Submission API",
    account: "infoskumarinterior@gmail.com",
    spreadsheet: SPREADSHEET_NAME,
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Handle HTTP POST - Process incoming submissions and append sequentially
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000);
  } catch (lockErr) {
    return createJsonResponse({
      status: "error",
      message: "Server is currently busy processing another request. Please try again shortly."
    });
  }

  try {
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    // 1. Anti-Spam Honeypot check: reject bots silently
    if (data.website_hp && String(data.website_hp).trim() !== "") {
      return createJsonResponse({
        status: "success",
        message: "Thank you! Your enquiry has been submitted successfully."
      });
    }

    // 2. Server-side Validation of Required Fields
    var name = data.name ? String(data.name).trim() : "";
    var phone = data.phone ? String(data.phone).trim() : "";

    if (!name) {
      return createJsonResponse({
        status: "error",
        message: "Validation failed: Full Name is required."
      });
    }

    if (!phone || phone.length < 6) {
      return createJsonResponse({
        status: "error",
        message: "Validation failed: A valid Phone number is required."
      });
    }

    // 3. Get or automatically create the target Google Spreadsheet
    var spreadsheet = getOrCreateSpreadsheet();

    // 4. Save to the unified "All Inquiries" sheet tab
    var timestampStr = Utilities.formatDate(new Date(), "Asia/Kolkata", "dd/MM/yyyy, hh:mm:ss a");
    saveUnifiedSubmission(spreadsheet, data, timestampStr);

    return createJsonResponse({
      status: "success",
      message: "Thank you! Your enquiry has been submitted successfully.",
      timestamp: timestampStr
    });

  } catch (err) {
    return createJsonResponse({
      status: "error",
      message: "Failed to save submission: " + err.toString()
    });
  } finally {
    lock.releaseLock();
  }
}

/**
 * Finds existing spreadsheet by name; creates it if not found.
 */
function getOrCreateSpreadsheet() {
  var files = DriveApp.getFilesByName(SPREADSHEET_NAME);
  while (files.hasNext()) {
    var file = files.next();
    if (!file.isTrashed() && file.getMimeType() === MimeType.GOOGLE_SHEETS) {
      return SpreadsheetApp.open(file);
    }
  }

  var newSpreadsheet = SpreadsheetApp.create(SPREADSHEET_NAME);
  var defaultSheet = newSpreadsheet.getActiveSheet();
  defaultSheet.setName(MAIN_SHEET_NAME);
  return newSpreadsheet;
}

/**
 * Appends EVERY submission into ONE single unified sheet row-by-row
 */
function saveUnifiedSubmission(spreadsheet, data, timestampStr) {
  var sheet = spreadsheet.getSheetByName(MAIN_SHEET_NAME);
  var headers = [
    "Timestamp (IST)",
    "Form Source",
    "Full Name",
    "Phone / WhatsApp",
    "Email Address",
    "Service Required",
    "Property Type",
    "Approx. Area",
    "Project Location",
    "Budget Range",
    "Requirements / Notes",
    "Submission ID"
  ];

  if (!sheet) {
    sheet = spreadsheet.insertSheet(MAIN_SHEET_NAME, 0);
    setupSheetHeader(sheet, headers);
  } else if (sheet.getLastRow() === 0) {
    setupSheetHeader(sheet, headers);
  }

  // Determine source and normalize fields across both forms
  var formType = (data.formType || "contact").toLowerCase();
  var sourceLabel = formType === "estimator" ? "Estimator Popup Modal" : "Main Contact Page";
  var name = data.name ? String(data.name).trim() : "";
  var phone = data.phone ? String(data.phone).trim() : "";
  var service = data.lookingFor || data.projectType || "Interior Design";
  var property = data.propertyType || "Residential";
  var area = data.areaSqFt || "Not specified";
  var location = data.location || "Ahmedabad";
  var budget = data.budget || "Below ₹10 Lakh";
  var notes = data.notes || data.message || "None";
  var email = data.email ? String(data.email).trim() : "Not provided";
  var submissionId = data.submissionId || (formType === "estimator" ? "EST-" : "CN-") + Utilities.getUuid().substring(0, 8);

  var row = [
    timestampStr,
    sourceLabel,
    name,
    phone,
    email,
    service,
    property,
    area,
    location,
    budget,
    notes,
    submissionId
  ];

  sheet.appendRow(row);
  styleDataRow(sheet, sheet.getLastRow());
}

/**
 * Configures professional header row styling
 */
function setupSheetHeader(sheet, headers) {
  sheet.appendRow(headers);
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground("#171717"); // Premium S Kumar dark slate
  headerRange.setFontColor("#FFFFFF");
  headerRange.setFontWeight("bold");
  headerRange.setFontFamily("Arial");
  headerRange.setFontSize(10);
  headerRange.setHorizontalAlignment("center");
  sheet.setRowHeight(1, 38);
  sheet.setFrozenRows(1);

  // Column widths optimized for readability
  sheet.setColumnWidth(1, 180); // Timestamp
  sheet.setColumnWidth(2, 170); // Source
  sheet.setColumnWidth(3, 180); // Name
  sheet.setColumnWidth(4, 160); // Phone
  sheet.setColumnWidth(5, 200); // Email
  sheet.setColumnWidth(6, 230); // Service
  sheet.setColumnWidth(7, 140); // Property
  sheet.setColumnWidth(8, 140); // Area
  sheet.setColumnWidth(9, 160); // Location
  sheet.setColumnWidth(10, 150); // Budget
  sheet.setColumnWidth(11, 280); // Notes
  sheet.setColumnWidth(12, 140); // ID
}

/**
 * Formats data row for high legibility
 */
function styleDataRow(sheet, rowNum) {
  var numCols = sheet.getLastColumn();
  var range = sheet.getRange(rowNum, 1, 1, numCols);
  range.setFontFamily("Arial");
  range.setFontSize(9);
  range.setVerticalAlignment("middle");
  sheet.setRowHeight(rowNum, 28);

  if (rowNum % 2 === 0) {
    range.setBackground("#FBF9F5"); // Subtle warm tint
  } else {
    range.setBackground("#FFFFFF");
  }
}

/**
 * Creates standard JSON response
 */
function createJsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
