import React, { useEffect, useMemo, useState } from 'react'

const plans = {
  session: { label: '1:1 session', amount: 999 },
  program: { label: 'Complete learning program', amount: 24999 },
}

// Deployed Apps Script Web App URL (must end in /exec).
const scriptUrl =
  'https://script.google.com/macros/s/AKfycbyp7NMlBqM1XzTjgrYqcQYfrS3hFdt5FWu_o5GKpHWOr5_K1QNS9givyRO3zZuuLfy1/exec'

// Public Razorpay links, matched to the selected enrollment plan.
const paymentLinks = {
  session: 'https://rzp.io/rzp/XBXA26SC',
  program: 'https://rzp.io/rzp/tMIpWJ6F',
}

const SLOTS = ['10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00']
const HOLIDAYS = [] // add 'YYYY-MM-DD' strings to block specific dates

const inr = (amount) => `₹${amount.toLocaleString('en-IN')}`

const slotLabel = (slot) =>
  new Date(`2000-01-01T${slot}:00`).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' })

function localIsoDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function paymentUrl(plan, reference) {
  const base = paymentLinks[plan]
  return `${base}${base.includes('?') ? '&' : '?'}reference_id=${encodeURIComponent(reference)}`
}

/**
 * JSONP call to the Apps Script web app (avoids CORS problems).
 * The script must respond with: callbackName({...json...})
 */
function jsonp(params, { timeoutMs, timeoutMessage, networkMessage }) {
  return new Promise((resolve, reject) => {
    const callback = `hs${params.action}${Date.now()}${Math.floor(Math.random() * 100000)}`
    const query = new URLSearchParams({ ...params, callback })
    const script = document.createElement('script')
    let timer

    const cleanup = () => {
      window.clearTimeout(timer)
      script.remove()
    }

    window[callback] = (result) => {
      cleanup()
      delete window[callback]
      if (!result || result.error) reject(new Error(result?.error || 'Unexpected response from booking service.'))
      else resolve(result)
    }

    script.onerror = () => {
      cleanup()
      delete window[callback]
      reject(new Error(networkMessage))
    }

    timer = window.setTimeout(() => {
      cleanup()
      // Keep a harmless no-op so a late response doesn't throw a ReferenceError.
      window[callback] = () => { delete window[callback] }
      reject(new Error(timeoutMessage))
    }, timeoutMs)

    script.src = `${scriptUrl}?${query}`
    document.body.appendChild(script)
  })
}

function saveEnrollment(booking) {
  return jsonp(
    { ...booking, action: 'saveEnrollment' },
    {
      timeoutMs: 20000,
      timeoutMessage: 'Booking service timed out. Please try again.',
      networkMessage:
        'Could not reach the Google Sheets service. Check that the Apps Script web app is deployed for anyone and that you are using its current /exec URL.',
    },
  )
}

function getAvailability() {
  return jsonp(
    { action: 'getAvailability' },
    {
      timeoutMs: 12000,
      timeoutMessage: 'Could not load available session times.',
      networkMessage: 'Could not load available session times.',
    },
  ).then((result) => result.slots || [])
}

const inputClass =
  'mt-2 w-full rounded-lg border border-white/15 bg-[#15181e] px-3 py-2.5 text-sm text-white outline-none focus:border-sky-300'

export default function Enrollment() {
  const [isOpen, setIsOpen] = useState(false)
  const [plan, setPlan] = useState('session')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [bookedSlots, setBookedSlots] = useState([])
  const [availability, setAvailability] = useState('idle') // idle | loading | ready | error
  const [reloadKey, setReloadKey] = useState(0)
  const [status, setStatus] = useState('')
  const [busy, setBusy] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [bookingReference, setBookingReference] = useState('')

  // Open / close handling
  useEffect(() => {
    const openModal = () => {
      // Always start from a clean state when the modal opens.
      setSubmitted(false)
      setBusy(false)
      setStatus('')
      setBookingReference('')
      setDate('')
      setTime('')
      setIsOpen(true)
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    window.addEventListener('open-enrollment', openModal)
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('open-enrollment', openModal)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  // Lock page scroll while the modal is open
  useEffect(() => {
    if (!isOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  // Load booked slots (only needed for the 1:1 session plan)
  useEffect(() => {
    if (!isOpen || plan !== 'session' || !scriptUrl) return
    let cancelled = false
    setAvailability('loading')
    getAvailability()
      .then((slots) => {
        if (cancelled) return
        setBookedSlots(slots)
        setAvailability('ready')
      })
      .catch(() => {
        if (cancelled) return
        setAvailability('error')
      })
    return () => {
      cancelled = true
    }
  }, [isOpen, plan, reloadKey])

  const bookedSet = useMemo(() => new Set(bookedSlots.map((b) => `${b.date}|${b.time}`)), [bookedSlots])

  const dates = useMemo(() => {
    const list = []
    const blocked = new Set(HOLIDAYS)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    for (let day = 1; day <= 90; day += 1) {
      const candidate = new Date(today)
      candidate.setDate(today.getDate() + day)
      const iso = localIsoDate(candidate)
      const fullyBooked = SLOTS.every((slot) => bookedSet.has(`${iso}|${slot}`))
      if (candidate.getDay() !== 0 && !blocked.has(iso) && !fullyBooked) {
        list.push({
          iso,
          label: candidate.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' }),
        })
      }
    }
    return list
  }, [bookedSet])

  const freeSlots = useMemo(() => SLOTS.filter((slot) => !bookedSet.has(`${date}|${slot}`)), [bookedSet, date])

  // If the chosen date/time got booked (or disappeared) after availability refreshed, clear it.
  useEffect(() => {
    if (date && !dates.some((d) => d.iso === date)) {
      setDate('')
      setTime('')
    } else if (time && bookedSet.has(`${date}|${time}`)) {
      setTime('')
    }
  }, [dates, bookedSet, date, time])

  async function submit(event) {
    event.preventDefault()
    if (busy) return
    setStatus('')

    if (plan === 'session' && (!date || !time)) {
      setStatus('Choose an available session date and time.')
      return
    }

    setBusy(true)
    try {
      if (!scriptUrl || scriptUrl.includes('REPLACE_WITH_DEPLOYMENT_ID')) {
        throw new Error(
          'Booking form is not connected to Google Sheets yet. Add your deployed Apps Script /exec URL in Enrollment.jsx and restart or redeploy the site.',
        )
      }
      const saved = await saveEnrollment({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        plan,
        date: plan === 'session' ? date : '',
        time: plan === 'session' ? time : '',
      })
      if (!saved.ok || !saved.reference) throw new Error('Enrollment could not be saved. Please try again.')
      window.location.href = paymentUrl(plan, saved.reference)
    } catch (error) {
      setStatus(error.message || 'Unable to start checkout.')
    } finally {
      setBusy(false)
    }
  }

  if (!isOpen) return null

  const amount = inr(plans[plan].amount)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-2 backdrop-blur-sm sm:p-4"
      onClick={() => setIsOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="enrollment-modal-title"
        className="relative max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-3xl border border-white/10 bg-[#171a20] shadow-[0_30px_90px_rgba(15,23,42,0.5)]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close enrollment form"
          onClick={() => setIsOpen(false)}
          className="focus-ring absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-white transition hover:bg-white/10 sm:right-4 sm:top-4"
        >
          ×
        </button>

        <div className="p-2 pt-11 sm:p-5 md:p-8 lg:p-10">
          <div className="mb-3 pt-0 md:mb-5 md:pt-2">
            <span className="inline-flex rounded-full border border-lime/30 bg-lime/[.06] px-3 py-1.5 text-[9px] font-bold tracking-[.2em] text-lime sm:px-4 sm:py-2 sm:text-[10px]">
              BOOK YOUR LEARNING
            </span>
            <h2 id="enrollment-modal-title" className="mt-3 font-display text-2xl text-white sm:mt-4 sm:text-3xl md:text-4xl">
              Choose your next step.
            </h2>
          </div>

          {submitted ? (
            <div className="rounded-2xl border border-white/15 bg-[#22262d] p-6 shadow-xl sm:p-8">
              <h3 className="text-xl font-bold text-white">Enrollment details saved</h3>
              <p className="mt-2 text-sm text-white/75">
                Your booking is marked as pending payment. Complete your {amount} payment with Razorpay.
              </p>
              <a
                href={paymentUrl(plan, bookingReference)}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring button-primary mt-6 flex w-full items-center justify-center px-6 text-sm"
              >
                CONTINUE TO RAZORPAY — {amount}
              </a>
              <p className="mt-3 text-xs text-white/60">
                After paying, your sheet will show Paid once the payment is confirmed. If you close Razorpay before paying,
                your booking remains Pending.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="rounded-2xl border border-white/15 bg-[#22262d] p-2.5 shadow-xl sm:p-6">
              <fieldset>
                <legend className="mb-3 text-sm font-semibold text-white">Select an option</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {Object.entries(plans).map(([key, item]) => (
                    <label
                      key={key}
                      className={`cursor-pointer rounded-xl border p-4 transition ${plan === key ? 'border-sky-300 bg-sky-300/10' : 'border-white/15 bg-black/10'
                        }`}
                    >
                      <span className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="plan"
                          value={key}
                          checked={plan === key}
                          onChange={() => {
                            setPlan(key)
                            setStatus('')
                          }}
                          className="mt-1 accent-sky-400"
                        />
                        <span>
                          <span className="block font-semibold text-white">{item.label}</span>
                          <span className="mt-1 block text-lg font-bold text-sky-300">{inr(item.amount)}</span>
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="mt-4 grid gap-3 sm:grid-cols-2 sm:gap-4">
                <label className="text-xs font-semibold text-white/75">
                  Full name
                  <input
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                  />
                </label>

                <label className="text-xs font-semibold text-white/75">
                  Phone number
                  <input
                    required
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    minLength={8}
                    maxLength={20}
                    pattern="[0-9+ .\(\)\-]{8,20}"
                    title="8 to 20 characters: digits, +, spaces, dots, parentheses or hyphens"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={inputClass}
                  />
                </label>

                <label className="text-xs font-semibold text-white/75 sm:col-span-2">
                  Email address
                  <input
                    required
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                  />
                </label>

                {plan === 'session' && (
                  <>
                    <label className="text-xs font-semibold text-white/75">
                      Session date
                      <select
                        required
                        value={date}
                        onChange={(e) => {
                          setDate(e.target.value)
                          setTime('')
                        }}
                        className={inputClass}
                      >
                        <option value="">Choose a date</option>
                        {dates.map((day) => (
                          <option key={day.iso} value={day.iso}>
                            {day.label}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="text-xs font-semibold text-white/75">
                      Start time (1 hour)
                      <select required value={time} onChange={(e) => setTime(e.target.value)} className={inputClass}>
                        <option value="">Choose a time</option>
                        {freeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slotLabel(slot)}
                          </option>
                        ))}
                      </select>
                    </label>

                    <div className="min-h-5 text-xs sm:col-span-2" aria-live="polite">
                      {availability === 'loading' && <p className="text-white/60">Loading available times…</p>}
                      {availability === 'error' && (
                        <p className="text-amber-300">
                          Couldn’t load live availability, so all times are shown and some may already be taken.{' '}
                          <button
                            type="button"
                            onClick={() => setReloadKey((k) => k + 1)}
                            className="font-semibold underline underline-offset-2 hover:text-amber-200"
                          >
                            Try again
                          </button>
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={busy}
                  className="focus-ring button-primary w-full px-6 text-sm disabled:cursor-wait disabled:opacity-60"
                >
                  {busy ? 'SAVING YOUR BOOKING…' : `PAY ${amount} & BOOK`}
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="focus-ring w-full rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
                >
                  Cancel
                </button>
              </div>

              <p aria-live="polite" className="mt-3 min-h-5 text-sm text-sky-200">
                {status}
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
