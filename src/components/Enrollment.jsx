import React, { useEffect, useMemo, useState } from 'react'

const plans = {
  session: { label: '1:1 session', amount: 999 },
  program: { label: 'Complete learning program', amount: 20000 },
}
const scriptUrl = 'https://script.google.com/macros/s/AKfycbyxcuqksJXEKSlTMpji1_5Bhcn8VMTuiGm0gxgCRuo4eCiTmisYfmHr8MEU4DtGwP0MkA/exec'
const razorpayKey = 'rzp_live_6dRNBP2vQ2b7hK' || ''

function jsonp(params) {
  return new Promise((resolve, reject) => {
    if (!scriptUrl) return reject(new Error('Booking payments are not configured yet.'))
    const callback = `hsCallback${Date.now()}${Math.floor(Math.random() * 1000)}`
    const script = document.createElement('script')
    const timeout = window.setTimeout(() => finish(new Error('Booking service timed out.')), 15000)
    function finish(error, data) {
      window.clearTimeout(timeout)
      delete window[callback]
      script.remove()
      error ? reject(error) : resolve(data)
    }
    window[callback] = (data) => finish(null, data)
    script.onerror = () => finish(new Error('Could not reach the booking service.'))
    script.src = `${scriptUrl}${scriptUrl.includes('?') ? '&' : '?'}${new URLSearchParams({ ...params, callback })}`
    document.body.appendChild(script)
  })
}

function localIsoDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

export default function Enrollment() {
  const [plan, setPlan] = useState('session')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [holidays, setHolidays] = useState([])
  const [status, setStatus] = useState('')
  const [busy, setBusy] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const openModal = () => setIsOpen(true)
    const closeModal = (event) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    window.addEventListener('open-enrollment', openModal)
    window.addEventListener('keydown', closeModal)

    jsonp({ action: 'holidays' }).then((result) => setHolidays(result.holidays || [])).catch(() => { })

    return () => {
      window.removeEventListener('open-enrollment', openModal)
      window.removeEventListener('keydown', closeModal)
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  const dates = useMemo(() => {
    const list = []
    const blocked = new Set(holidays)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    for (let day = 1; day <= 90; day += 1) {
      const candidate = new Date(today)
      candidate.setDate(today.getDate() + day)
      const iso = localIsoDate(candidate)
      if (candidate.getDay() !== 0 && !blocked.has(iso)) list.push({ iso, label: candidate.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }) })
    }
    return list
  }, [holidays])

  const slots = ['10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00']

  async function loadRazorpay() {
    if (window.Razorpay) return
    await new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = resolve
      script.onerror = () => reject(new Error('Payment checkout could not be loaded.'))
      document.body.appendChild(script)
    })
  }

  async function submit(event) {
    event.preventDefault()
    setStatus('')
    if (plan === 'session' && (!date || !time)) return setStatus('Choose an available session date and time.')
    if (!scriptUrl || !razorpayKey) return setStatus('Booking is not active yet. Configure the Google Sheets and Razorpay settings first.')
    setBusy(true)
    try {
      await loadRazorpay()
      const order = await jsonp({ action: 'createOrder', plan, date: plan === 'session' ? date : '', time: plan === 'session' ? time : '' })
      if (!order.id) throw new Error(order.error || 'Could not create the payment order.')
      const checkout = new window.Razorpay({
        key: razorpayKey,
        amount: order.amount,
        currency: 'INR',
        name: 'HedgeScience',
        description: plans[plan].label,
        order_id: order.id,
        prefill: { name, email, contact: phone },
        theme: { color: '#7dd3fc' },
        handler: (payment) => {
          const booking = { ...payment, name, phone, email, plan, date: plan === 'session' ? date : '', time: plan === 'session' ? time : '' }
          fetch(scriptUrl, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(booking) })
          setStatus('Payment complete. Your booking is being verified and recorded in the booking sheet.')
          setBusy(false)
        },
        modal: { ondismiss: () => setBusy(false) },
      })
      checkout.on('payment.failed', (failure) => {
        setStatus(failure.error?.description || 'Payment did not complete. Please try again.')
        setBusy(false)
      })
      checkout.open()
    } catch (error) {
      setStatus(error.message || 'Unable to start checkout.')
      setBusy(false)
    }
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-2 backdrop-blur-sm sm:p-4" onClick={() => setIsOpen(false)}>
          <div role="dialog" aria-modal="true" aria-labelledby="enrollment-modal-title" className="relative max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-3xl border border-white/10 bg-[#171a20] shadow-[0_30px_90px_rgba(15,23,42,0.5)]" onClick={(event) => event.stopPropagation()}>
            <button type="button" aria-label="Close enrollment form" onClick={() => setIsOpen(false)} className="focus-ring absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-white transition hover:bg-white/10 sm:right-4 sm:top-4">×</button>
            <div className="p-2 pt-11 sm:p-5 md:p-8 lg:p-10">
              <div className="mb-3 pt-0 md:mb-5 md:pt-2">
                <span className="inline-flex rounded-full border border-lime/30 bg-lime/[.06] px-3 py-1.5 text-[9px] font-bold tracking-[.2em] text-lime sm:px-4 sm:py-2 sm:text-[10px]">BOOK YOUR LEARNING</span>
                <h2 id="enrollment-modal-title" className="mt-3 font-display text-2xl text-white sm:mt-4 sm:text-3xl md:text-4xl">Choose your next step.</h2>
              </div>

              <form onSubmit={submit} className="rounded-2xl border border-white/15 bg-[#22262d] p-2.5 shadow-xl sm:p-6">
                <fieldset>
                  <legend className="mb-3 text-sm font-semibold text-white">Select an option</legend>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {Object.entries(plans).map(([key, item]) => (
                      <label key={key} className={`cursor-pointer rounded-xl border p-4 transition ${plan === key ? 'border-sky-300 bg-sky-300/10' : 'border-white/15 bg-black/10'}`}>
                        <span className="flex items-start gap-3">
                          <input type="radio" name="plan" value={key} checked={plan === key} onChange={() => { setPlan(key); setStatus('') }} className="mt-1 accent-sky-400" />
                          <span>
                            <span className="block font-semibold text-white">{item.label}</span>
                            <span className="mt-1 block text-lg font-bold text-sky-300">₹{item.amount.toLocaleString('en-IN')}</span>
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="mt-4 grid gap-3 sm:grid-cols-2 sm:gap-4">
                  <label className="text-xs font-semibold text-white/75">Full name<input required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-2 w-full rounded-lg border border-white/15 bg-[#15181e] px-3 py-2.5 text-sm text-white outline-none focus:border-sky-300" /></label>
                  <label className="text-xs font-semibold text-white/75">Phone number<input required type="tel" autoComplete="tel" pattern="[0-9+() .-]{8,20}" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-2 w-full rounded-lg border border-white/15 bg-[#15181e] px-3 py-2.5 text-sm text-white outline-none focus:border-sky-300" /></label>
                  <label className="text-xs font-semibold text-white/75 sm:col-span-2">Email address<input required type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-lg border border-white/15 bg-[#15181e] px-3 py-2.5 text-sm text-white outline-none focus:border-sky-300" /></label>

                  {plan === 'session' && (
                    <>
                      <label className="text-xs font-semibold text-white/75">Session date<select required value={date} onChange={(e) => { setDate(e.target.value); setTime('') }} className="mt-2 w-full rounded-lg border border-white/15 bg-[#15181e] px-3 py-2.5 text-sm text-white outline-none focus:border-sky-300"><option value="">Choose a date</option>{dates.map((day) => <option key={day.iso} value={day.iso}>{day.label}</option>)}</select></label>
                      <label className="text-xs font-semibold text-white/75">Start time (1 hour)<select required value={time} onChange={(e) => setTime(e.target.value)} className="mt-2 w-full rounded-lg border border-white/15 bg-[#15181e] px-3 py-2.5 text-sm text-white outline-none focus:border-sky-300"><option value="">Choose a time</option>{slots.map((slot) => <option key={slot} value={slot}>{new Date(`2000-01-01T${slot}:00`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</option>)}</select></label>
                    </>
                  )}
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <button type="submit" disabled={busy} className="focus-ring button-primary w-full px-6 text-sm disabled:cursor-wait disabled:opacity-60">{busy ? 'CONNECTING TO CHECKOUT…' : `PAY ₹${plans[plan].amount.toLocaleString('en-IN')} & BOOK`}</button>
                  <button type="button" onClick={() => setIsOpen(false)} className="focus-ring w-full rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto">Cancel</button>
                </div>
                <p aria-live="polite" className="mt-3 min-h-5 text-sm text-sky-200">{status}</p>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
