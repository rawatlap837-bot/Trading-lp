# Google Sheets and Razorpay booking setup

The form first saves the enrollment in `Bookings` with payment status `Pending`, then shows a button to open the configured Razorpay Payment Link. Since payment happens on that separate link, automatic Paid updates require a Razorpay webhook. Configure the webhook URL to the deployed Apps Script `/exec` endpoint for the `payment_link.paid` event. The webhook uses the Payment Link reference ID (`HS-rowNumber`) to find and update the booking row and save the captured payment ID.

## Setup

1. Create a Google spreadsheet. Copy its ID from the spreadsheet URL.
2. Open **Extensions → Apps Script**, replace the editor contents with `Code.gs`, save, and run `setupSheets()` once. Approve the requested spreadsheet and external-request permissions. This creates `Bookings` and `Holidays` tabs.
3. In **Project Settings → Script properties**, set `SPREADSHEET_ID`, `RAZORPAY_KEY_ID`, and `RAZORPAY_KEY_SECRET`. Use Razorpay test keys while validating; use live keys only when ready to accept real payments.
4. In the `Holidays` tab, add one row per holiday in column A as `YYYY-MM-DD` (column B is an optional holiday name). Sundays and the 1pm–2pm lunch hour are excluded automatically.
5. Deploy the Apps Script as a **Web app**, execute as **Me**, and allow access to **Anyone**. Copy the `/exec` URL.
6. In `src/components/Enrollment.jsx`, set `scriptUrl` to the deployed `/exec` URL and `paymentLink` to your Razorpay Payment Link. Restart/rebuild and redeploy the Vite app.

The 1:1 form offers one-hour starts from 10am through 9pm, Monday to Saturday, excluding 1pm–2pm and holiday dates. Do not publish the Razorpay secret in the website; it belongs only in Apps Script properties.

Apps Script web apps are publicly callable. Payment signatures, payment status and amount are verified server-side; use a published/controlled spreadsheet and maintain the holiday list before opening bookings.
