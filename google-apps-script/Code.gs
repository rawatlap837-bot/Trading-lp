/**
 * HedgeScience enrollment endpoint (Google Apps Script web app).
 *
 * Script properties (Project Settings > Script properties):
 *   RAZORPAY_KEY_ID      required, used to verify payments with Razorpay
 *   RAZORPAY_KEY_SECRET  required
 *   WEBHOOK_TOKEN        optional, any random string; if set, the Razorpay webhook
 *                        URL must end with ?token=<that string>
 *   SPREADSHEET_ID       optional, filled in automatically
 *
 * Deploy as a Web App: Execute as "Me", Who has access "Anyone".
 * After every code change: Deploy > Manage deployments > Edit > New version.
 */

const PLANS = {
  session: { label: "1:1 session", amount: 99900 }, // paise
  program: { label: "Complete learning program", amount: 2499900 }, // paise
};
const BOOKINGS_SHEET = "Bookings";
const SLOT_TIMES = [
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
];

const HEADERS = [
  "Submitted at",
  "Name",
  "Phone",
  "Email",
  "Plan",
  "Amount INR",
  "Session date",
  "Session start",
  "Booking reference",
  "Razorpay payment ID",
  "Payment status",
];
// Zero-based column positions in a row array
const COL = {
  SUBMITTED: 0,
  NAME: 1,
  PHONE: 2,
  EMAIL: 3,
  PLAN: 4,
  AMOUNT: 5,
  DATE: 6,
  TIME: 7,
  REF: 8,
  PAYMENT_ID: 9,
  STATUS: 10,
};

/* ------------------------------------------------------------------ */
/* Spreadsheet helpers                                                 */
/* ------------------------------------------------------------------ */

function getSpreadsheet_() {
  const props = PropertiesService.getScriptProperties();
  const savedId = props.getProperty("SPREADSHEET_ID");

  if (savedId && /^[A-Za-z0-9-_]{10,}$/.test(savedId)) {
    return SpreadsheetApp.openById(savedId);
  }

  const active = SpreadsheetApp.getActiveSpreadsheet();
  if (active) {
    props.setProperty("SPREADSHEET_ID", active.getId());
    return active;
  }

  const created = SpreadsheetApp.create("HedgeScience Bookings");
  props.setProperty("SPREADSHEET_ID", created.getId());
  return created;
}

/** Creates / repairs the Bookings sheet. Safe to run more than once. */
function setupSheets() {
  const ss = getSpreadsheet_();
  const sheet =
    ss.getSheetByName(BOOKINGS_SHEET) || ss.insertSheet(BOOKINGS_SHEET);

  if (sheet.getMaxColumns() < HEADERS.length) {
    sheet.insertColumnsAfter(
      sheet.getMaxColumns(),
      HEADERS.length - sheet.getMaxColumns(),
    );
  }
  sheet
    .getRange(1, 1, 1, HEADERS.length)
    .setValues([HEADERS])
    .setFontWeight("bold");
  sheet.setFrozenRows(1);

  // Store these columns as plain text so Sheets never turns "10:00" into a time,
  // "2026-11-05" into a date, "+91..." into a formula, etc.
  sheet.getRange("B:D").setNumberFormat("@"); // name, phone, email
  sheet.getRange("G:J").setNumberFormat("@"); // date, time, reference, payment id
  return sheet;
}

function getBookingsSheet_() {
  const sheet = getSpreadsheet_().getSheetByName(BOOKINGS_SHEET);
  return sheet || setupSheets();
}

function normalizeDate_(value, tz) {
  if (value instanceof Date)
    return Utilities.formatDate(value, tz, "yyyy-MM-dd");
  const match = String(value || "")
    .trim()
    .match(/^\d{4}-\d{2}-\d{2}/);
  return match ? match[0] : "";
}

// Accepts "10:00", "10:00:00", "10:00 AM", "3:00 PM" and returns "HH:mm".
function normalizeTime_(text) {
  const m = String(text || "")
    .trim()
    .match(/^(\d{1,2}):(\d{2})(?::\d{2})?\s*([AaPp][Mm])?$/);
  if (!m) return "";
  let hours = Number(m[1]);
  const suffix = (m[3] || "").toLowerCase();
  if (suffix === "pm" && hours < 12) hours += 12;
  if (suffix === "am" && hours === 12) hours = 0;
  return `${String(hours).padStart(2, "0")}:${m[2]}`;
}

function getBookedSlots_(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  const tz = sheet.getParent().getSpreadsheetTimeZone();
  // Columns G..K: date, time, reference, payment id, status
  const range = sheet.getRange(2, COL.DATE + 1, lastRow - 1, 5);
  const values = range.getValues();
  const shown = range.getDisplayValues();
  const slots = [];
  values.forEach((row, i) => {
    const date = normalizeDate_(row[0], tz);
    const time = normalizeTime_(shown[i][1]);
    const status = String(row[4] || "").trim();
    if (date && time && status !== "Cancelled") slots.push({ date, time });
  });
  return slots;
}

function isSlotTaken_(sheet, date, time) {
  return getBookedSlots_(sheet).some(
    (slot) => slot.date === date && slot.time === time,
  );
}

function newReference_() {
  return (
    "HS-" + Utilities.getUuid().replace(/-/g, "").slice(0, 8).toUpperCase()
  );
}

/* ------------------------------------------------------------------ */
/* Website requests (JSONP over GET)                                   */
/* ------------------------------------------------------------------ */

function doGet(e) {
  const params = (e && e.parameter) || {};
  const callback = (params.callback || "").match(
    /^[A-Za-z_$][\w$]{0,80}$/,
  )?.[0];
  let result;
  try {
    if (params.action === "saveEnrollment") result = saveEnrollment_(params);
    else if (params.action === "getAvailability")
      result = { slots: getBookedSlots_(getBookingsSheet_()) };
    else result = { error: "Unknown action" };
  } catch (err) {
    result = { error: String(err.message || err) };
  }
  const json = JSON.stringify(result);
  return ContentService.createTextOutput(
    callback ? `${callback}(${json});` : json,
  ).setMimeType(
    callback
      ? ContentService.MimeType.JAVASCRIPT
      : ContentService.MimeType.JSON,
  );
}

function saveEnrollment_(params) {
  const booking = {
    name: String(params.name || "")
      .trim()
      .slice(0, 100)
      .replace(/^[=+\-@]+/, ""),
    phone: String(params.phone || "").trim(),
    email: String(params.email || "").trim(),
    plan: String(params.plan || ""),
    date: String(params.date || ""),
    time: String(params.time || ""),
  };
  validateBooking_(booking);

  const plan = PLANS[booking.plan];
  const isSession = booking.plan === "session";
  const sheet = getBookingsSheet_();

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    if (isSession && isSlotTaken_(sheet, booking.date, booking.time)) {
      throw new Error(
        "That session time was just booked. Please choose another time.",
      );
    }
    const reference = newReference_();
    sheet.appendRow([
      new Date(),
      booking.name,
      booking.phone,
      booking.email,
      plan.label,
      plan.amount / 100,
      isSession ? booking.date : "",
      isSession ? booking.time : "",
      reference,
      "",
      "Pending",
    ]);
    return { ok: true, reference };
  } finally {
    lock.releaseLock();
  }
}

function validateBooking_(b) {
  if (!b.name) throw new Error("Please enter your full name.");
  if (!/^[0-9+ .()\-]{8,20}$/.test(b.phone))
    throw new Error("Phone number is invalid.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email) || b.email.length > 120)
    throw new Error("Email address is invalid.");
  if (!Object.keys(PLANS).includes(b.plan))
    throw new Error("Enrollment option is invalid.");
  if (b.plan !== "session") return;

  const tz = Session.getScriptTimeZone();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(b.date))
    throw new Error("Session date is invalid.");
  const date = new Date(`${b.date}T00:00:00`);
  const today = Utilities.formatDate(new Date(), tz, "yyyy-MM-dd");
  if (
    isNaN(date.getTime()) ||
    Utilities.formatDate(date, tz, "yyyy-MM-dd") !== b.date ||
    b.date < today ||
    date.getDay() === 0
  ) {
    throw new Error("Session date is invalid.");
  }
  if (!SLOT_TIMES.includes(b.time)) {
    throw new Error("Session time is outside business hours or lunch break.");
  }
}

/* ------------------------------------------------------------------ */
/* Razorpay webhook (POST)                                             */
/* ------------------------------------------------------------------ */

function doPost(e) {
  try {
    const token =
      PropertiesService.getScriptProperties().getProperty("WEBHOOK_TOKEN");
    if (token && ((e && e.parameter) || {}).token !== token)
      throw new Error("Unauthorized");

    const event = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    if (
      event.event === "payment_link.paid" ||
      event.event === "payment.captured"
    ) {
      return jsonOutput_(handlePaymentPaid_(event));
    }
    return jsonOutput_({ ok: true, ignored: true });
  } catch (err) {
    return jsonOutput_({ ok: false, error: String(err.message || err) });
  }
}

/**
 * Never trusts the webhook body. It re-fetches the payment from Razorpay with
 * your API keys and checks status and amount before marking a row as Paid.
 */
function handlePaymentPaid_(event) {
  const payload = event.payload || {};
  const paymentId = payload.payment?.entity?.id;
  if (!paymentId) throw new Error("Payment details are missing");

  const payment = fetchRazorpayPayment_(paymentId);
  if (payment.status !== "captured" || payment.currency !== "INR") {
    throw new Error("Payment is not captured");
  }

  const link = payload.payment_link?.entity;
  const refs = [
    link?.reference_id,
    link?.notes?.booking_id,
    payment.notes?.reference_id,
    payment.notes?.booking_id,
  ]
    .filter(Boolean)
    .map(String);

  const sheet = getBookingsSheet_();
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const lastRow = sheet.getLastRow();
    if (lastRow < 2) throw new Error("No bookings found");
    const rows = sheet.getRange(2, 1, lastRow - 1, HEADERS.length).getValues();
    const amountOf = (row) => Math.round(Number(row[COL.AMOUNT]) * 100);

    // 1) match by booking reference
    let index = rows.findIndex((row) => refs.includes(String(row[COL.REF])));

    // 2) fallback: newest Pending row with the same email and amount
    if (index < 0) {
      const email = String(payment.email || "")
        .trim()
        .toLowerCase();
      for (let i = rows.length - 1; i >= 0 && email; i--) {
        const row = rows[i];
        if (
          String(row[COL.STATUS]) === "Pending" &&
          String(row[COL.EMAIL]).trim().toLowerCase() === email &&
          amountOf(row) === payment.amount
        ) {
          index = i;
          break;
        }
      }
    }

    if (index < 0) throw new Error("Could not match payment to a booking");
    const row = rows[index];
    if (amountOf(row) !== payment.amount)
      throw new Error("Paid amount does not match the booking");

    if (String(row[COL.STATUS]) !== "Paid") {
      sheet
        .getRange(index + 2, COL.PAYMENT_ID + 1, 1, 2)
        .setValues([[payment.id, "Paid"]]);
    }
    return { ok: true };
  } finally {
    lock.releaseLock();
  }
}

function fetchRazorpayPayment_(paymentId) {
  const props = PropertiesService.getScriptProperties();
  const keyId = props.getProperty("RAZORPAY_KEY_ID");
  const keySecret = props.getProperty("RAZORPAY_KEY_SECRET");
  if (!keyId || !keySecret)
    throw new Error("Razorpay keys are not set in Script properties");

  const response = UrlFetchApp.fetch(
    `https://api.razorpay.com/v1/payments/${encodeURIComponent(paymentId)}`,
    {
      headers: {
        Authorization:
          "Basic " + Utilities.base64Encode(`${keyId}:${keySecret}`),
      },
      muteHttpExceptions: true,
    },
  );
  const body = JSON.parse(response.getContentText() || "{}");
  if (response.getResponseCode() >= 300) {
    throw new Error(
      body.error?.description || "Could not verify payment with Razorpay",
    );
  }
  return body;
}

function jsonOutput_(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
