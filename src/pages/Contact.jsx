import { useState } from 'react'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Contact(){
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const submit = async (e)=>{
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    const data = Object.fromEntries(new FormData(e.currentTarget).entries())
    try{
      const res = await fetch(`${BACKEND}/api/leads`,{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data) })
      const j = await res.json()
      if(res.ok) setStatus({ ok:true, id:j.id })
      else setStatus({ ok:false, error:j.detail || 'Failed'})
    }catch(err){ setStatus({ ok:false, error: err.message }) }
    finally{ setLoading(false) }
  }

  return (
    <div className="pt-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Contact Us</h1>
        <form onSubmit={submit} className="grid gap-3 border border-slate-200 rounded-xl p-6 bg-white">
          <input name="name" required placeholder="Your name" className="px-3 py-2 rounded-lg border border-slate-200"/>
          <input name="email" required type="email" placeholder="Your email" className="px-3 py-2 rounded-lg border border-slate-200"/>
          <input name="phone" placeholder="Phone (optional)" className="px-3 py-2 rounded-lg border border-slate-200"/>
          <select name="interest" className="px-3 py-2 rounded-lg border border-slate-200">
            <option value="">I'm interested in...</option>
            <option>Buying</option>
            <option>Selling</option>
            <option>Renting</option>
          </select>
          <input name="preferred_area" placeholder="Preferred area" className="px-3 py-2 rounded-lg border border-slate-200"/>
          <button disabled={loading} className="px-4 py-2 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 disabled:opacity-60">{loading?'Sending...':'Submit'}</button>
          {status && (status.ok ? <p className="text-green-600 text-sm">Thanks! We will follow up shortly. Ref: {status.id}</p> : <p className="text-red-600 text-sm">{status.error}</p>)}
        </form>
      </div>
    </div>
  )
}
export default Contact