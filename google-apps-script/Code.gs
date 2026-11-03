/** HedgeScience enrollment endpoint.
 * Script properties required: SPREADSHEET_ID, RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET.
 * Deploy as a Web App executing as the owner, accessible to anyone.
 */
const PLANS = {
  session: { label: "1:1 session", amount: 99900 },
  program: { label: "Complete learning program", amount: 2000000 },
};
const BOOKINGS_SHEET = "Bookings";

function getSpreadsheet_() {
  let spreadsheetId =
    PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");

  if (!spreadsheetId || !/^[A-Za-z0-9-_]{10,}$/.test(spreadsheetId)) {
    const active = SpreadsheetApp.getActiveSpreadsheet();
    if (active) {
      spreadsheetId = active.getId();
      PropertiesService.getScriptProperties().setProperty(
        "SPREADSHEET_ID",
        spreadsheetId,
      );
      return active;
    }

    const created = SpreadsheetApp.create("HedgeScience Bookings");
    spreadsheetId = created.getId();
    PropertiesService.getScriptProperties().setProperty(
      "SPREADSHEET_ID",
      spreadsheetId,
    );
    return created;
  }

  return SpreadsheetApp.openById(spreadsheetId);
}

function setupSheets() {
  const ss = getSpreadsheet_();
  let bookings =
    ss.getSheetByName(BOOKINGS_SHEET) || ss.insertSheet(BOOKINGS_SHEET);
  if (!bookings.getLastRow())
    bookings.appendRow([
      "Submitted at",
      "Name",
      "Phone",
      "Email",
      "Plan",
      "Amount INR",
      "Session date",
      "Session start",
      "Razorpay order ID",
      "Razorpay payment ID",
      "Payment status",
    ]);
  else {
    const headers = [
      "Submitted at", "Name", "Phone", "Email", "Plan", "Amount INR",
      "Session date", "Session start", "Razorpay order ID", "Razorpay payment ID", "Payment status",
    ];
    if (bookings.getLastColumn() < headers.length) bookings.insertColumnsAfter(bookings.getLastColumn(), headers.length - bookings.getLastColumn());
    bookings.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
}

function doGet(e) {
  const action = e.parameter.action || "";
  const callback = (e.parameter.callback || "").match(
    /^[A-Za-z_$][\w$]{0,80}$/,
  )?.[0];
  let result;
  try {
    if (action === "createOrder") result = createOrder_(e.parameter);
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

function createOrder_(params) {
  const booking = {
    name: String(params.name || "").trim(),
    phone: String(params.phone || "").trim(),
    email: String(params.email || "").trim(),
    plan: params.plan,
    date: params.date || "",
    time: params.time || "",
  };
  validateBooking_(booking);
  const plan = PLANS[booking.plan];
  const props = PropertiesService.getScriptProperties();
  const keyId = props.getProperty("RAZORPAY_KEY_ID");
  const secret = props.getProperty("RAZORPAY_KEY_SECRET");
  if (!keyId || !secret) throw new Error("Payment settings are missing");
  const response = UrlFetchApp.fetch("https://api.razorpay.com/v1/orders", {
    method: "post",
    contentType: "application/json",
    headers: {
      Authorization: "Basic " + Utilities.base64Encode(`${keyId}:${secret}`),
    },
    payload: JSON.stringify({
      amount: plan.amount,
      currency: "INR",
      receipt: `hs_${Date.now()}`,
      notes: {
        plan: booking.plan,
        date: booking.date,
        time: booking.time,
      },
    }),
    muteHttpExceptions: true,
  });
  const order = JSON.parse(response.getContentText());
  if (response.getResponseCode() >= 300 || !order.id)
    throw new Error(
      order.error?.description || "Could not create payment order",
    );
  const sheet = getSpreadsheet_().getSheetByName(BOOKINGS_SHEET);
  if (!sheet) throw new Error("Run setupSheets() before accepting bookings");
  sheet.appendRow([
    new Date(), booking.name, booking.phone, booking.email, plan.label,
    plan.amount / 100, booking.date, booking.time, order.id, "", "Pending",
  ]);
  return { id: order.id, amount: plan.amount, currency: "INR", key: keyId };
}

function doPost(e) {
  try {
    const booking = JSON.parse(e.postData.contents || "{}");
    const verified = verifyPayment_(booking);
    validateBooking_(booking);
    const ss = getSpreadsheet_();
    const sheet = ss.getSheetByName(BOOKINGS_SHEET);
    if (!sheet) throw new Error("Run setupSheets() before accepting bookings");
    const rows = sheet.getLastRow() > 1
      ? sheet.getRange(2, 1, sheet.getLastRow() - 1, 11).getValues() : [];
    const rowIndex = rows.findIndex((row) => row[8] === booking.razorpay_order_id);
    if (rowIndex < 0) throw new Error("Booking order was not found");
    const rowNumber = rowIndex + 2;
    const row = rows[rowIndex];
    if (row[10] !== "Paid") {
      sheet.getRange(rowNumber, 10, 1, 2).setValues([[booking.razorpay_payment_id, verified.status === "captured" ? "Paid" : verified.status]]);
    }
    return jsonOutput_({ ok: true });
  } catch (err) {
    return jsonOutput_({ ok: false, error: String(err.message || err) });
  }
}

function verifyPayment_(booking) {
  const plan = PLANS[booking.plan];
  if (
    !plan ||
    !booking.razorpay_order_id ||
    !booking.razorpay_payment_id ||
    !booking.razorpay_signature
  )
    throw new Error("Payment details are incomplete");
  const secret = PropertiesService.getScriptProperties().getProperty(
    "RAZORPAY_KEY_SECRET",
  );
  const message = `${booking.razorpay_order_id}|${booking.razorpay_payment_id}`;
  const digest = Utilities.computeHmacSha256Signature(message, secret)
    .map((b) => (b + 256).toString(16).slice(-2))
    .join("");
  if (digest !== booking.razorpay_signature)
    throw new Error("Payment signature verification failed");
  const props = PropertiesService.getScriptProperties();
  const response = UrlFetchApp.fetch(
    `https://api.razorpay.com/v1/payments/${encodeURIComponent(booking.razorpay_payment_id)}`,
    {
      headers: {
        Authorization:
          "Basic " +
          Utilities.base64Encode(
            `${props.getProperty("RAZORPAY_KEY_ID")}:${secret}`,
          ),
      },
      muteHttpExceptions: true,
    },
  );
  const payment = JSON.parse(response.getContentText());
  if (
    response.getResponseCode() >= 300 ||
    payment.order_id !== booking.razorpay_order_id ||
    payment.amount !== plan.amount ||
    payment.currency !== "INR" ||
    payment.status !== "captured"
  )
    throw new Error("Payment is not captured for the selected amount");
  const orderResponse = UrlFetchApp.fetch(
    `https://api.razorpay.com/v1/orders/${encodeURIComponent(booking.razorpay_order_id)}`,
    {
      headers: {
        Authorization:
          "Basic " +
          Utilities.base64Encode(
            `${props.getProperty("RAZORPAY_KEY_ID")}:${secret}`,
          ),
      },
      muteHttpExceptions: true,
    },
  );
  const order = JSON.parse(orderResponse.getContentText());
  if (
    orderResponse.getResponseCode() >= 300 ||
    order.notes?.plan !== booking.plan ||
    (booking.plan === "session" &&
      (order.notes?.date !== booking.date ||
        order.notes?.time !== booking.time))
  )
    throw new Error("Booking details do not match the paid order");
  const ss = getSpreadsheet_();
  const sheet = ss.getSheetByName(BOOKINGS_SHEET);
  const rows = sheet && sheet.getLastRow() > 1
    ? sheet.getRange(2, 1, sheet.getLastRow() - 1, 11).getValues() : [];
  const saved = rows.find((row) => row[8] === booking.razorpay_order_id);
  if (!saved || saved[1] !== booking.name || saved[2] !== booking.phone || saved[3] !== booking.email)
    throw new Error("Booking details do not match the saved enrollment");
  return payment;
}

function validateBooking_(booking) {
  if (
    !booking.name ||
    !booking.phone ||
    !booking.email ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.email)
  )
    throw new Error("Contact details are invalid");
  if (!PLANS[booking.plan]) throw new Error("Enrollment option is invalid");
  if (booking.plan !== "session") return;
  const date = new Date(`${booking.date}T00:00:00`);
  const time = booking.time;
  const dateText = Utilities.formatDate(
    date,
    Session.getScriptTimeZone(),
    "yyyy-MM-dd",
  );
  const today = Utilities.formatDate(
    new Date(),
    Session.getScriptTimeZone(),
    "yyyy-MM-dd",
  );
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(booking.date || "") ||
    isNaN(date.getTime()) ||
    dateText !== booking.date ||
    booking.date < today ||
    date.getDay() === 0
  )
    throw new Error("Session date is invalid");
  if (
    ![
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
    ].includes(time)
  )
    throw new Error("Session time is outside business hours or lunch break");
}

function jsonOutput_(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
