# Google Sheets and Razorpay booking setup

When checkout starts, `Code.gs` creates a Razorpay order and immediately saves the enrollment in `Bookings` with payment status `Pending`. After checkout, it verifies the signature and confirms the captured amount with Razorpay, then updates that same row to `Paid` and stores the payment ID. Abandoned checkouts remain visible as pending.

## Setup

1. Create a Google spreadsheet. Copy its ID from the spreadsheet URL.
2. Open **Extensions → Apps Script**, replace the editor contents with `Code.gs`, save, and run `setupSheets()` once. Approve the requested spreadsheet and external-request permissions. This creates `Bookings` and `Holidays` tabs.
3. In **Project Settings → Script properties**, set `SPREADSHEET_ID`, `RAZORPAY_KEY_ID`, and `RAZORPAY_KEY_SECRET`. Use Razorpay test keys while validating; use live keys only when ready to accept real payments.
4. In the `Holidays` tab, add one row per holiday in column A as `YYYY-MM-DD` (column B is an optional holiday name). Sundays and the 1pm–2pm lunch hour are excluded automatically.
5. Deploy the Apps Script as a **Web app**, execute as **Me**, and allow access to **Anyone**. Copy the `/exec` URL.
6. Copy `.env.example` to `.env.local`, set `VITE_RAZORPAY_KEY_ID` to the matching Razorpay key ID and `VITE_GOOGLE_SCRIPT_URL` to the deployed URL. Restart/redeploy the Vite app after setting environment values. The form uses Razorpay Checkout.js, so users must be able to load Razorpay's checkout script.

The 1:1 form offers one-hour starts from 10am through 9pm, Monday to Saturday, excluding 1pm–2pm and holiday dates. Do not publish the Razorpay secret in the website; it belongs only in Apps Script properties.

Apps Script web apps are publicly callable. Payment signatures, payment status and amount are verified server-side; use a published/controlled spreadsheet and maintain the holiday list before opening bookings.
