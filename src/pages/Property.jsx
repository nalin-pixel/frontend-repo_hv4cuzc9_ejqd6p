import { useEffect, useState } from 'react'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function MortgageCalculator({ price }){
  const [down, setDown] = useState(20)
  const [rate, setRate] = useState(6.5)
  const [term, setTerm] = useState(30)

  const principal = Math.max(0, (price||0) * (1 - down/100))
  const monthlyRate = rate/100/12
  const n = term*12
  const monthly = monthlyRate === 0 ? principal/n : principal * (monthlyRate*Math.pow(1+monthlyRate,n))/(Math.pow(1+monthlyRate,n)-1)

  return (
    <div className="border border-slate-200 rounded-xl p-4 bg-white">
      <h3 className="text-lg font-semibold text-slate-900 mb-3">Mortgage Calculator</h3>
      <div className="grid grid-cols-3 gap-3">
        <label className="text-sm text-slate-600">Down %
          <input type="number" value={down} onChange={e=>setDown(Number(e.target.value))} className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-200" />
        </label>
        <label className="text-sm text-slate-600">Rate %
          <input type="number" step="0.01" value={rate} onChange={e=>setRate(Number(e.target.value))} className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-200" />
        </label>
        <label className="text-sm text-slate-600">Term (yrs)
          <input type="number" value={term} onChange={e=>setTerm(Number(e.target.value))} className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-200" />
        </label>
      </div>
      <p className="mt-3 text-slate-700"><span className="font-semibold">Estimated monthly:</span> ${'{'}monthly.toFixed(0){'}'}</p>
    </div>
  )
}

function InquiryForm({ propertyId }){
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    const data = Object.fromEntries(new FormData(e.currentTarget).entries())
    data.property_id = propertyId
    try{
      const res = await fetch(`${BACKEND}/api/inquiries`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data) })
      const j = await res.json()
      if(res.ok){ setStatus({ ok:true, id:j.id }) }
      else{ setStatus({ ok:false, error:j.detail || 'Failed'}) }
    }catch(err){ setStatus({ ok:false, error: err.message }) }
    finally{ setLoading(false) }
  }

  return (
    <div className="border border-slate-200 rounded-xl p-4 bg-white">
      <h3 className="text-lg font-semibold text-slate-900 mb-3">Request Info</h3>
      <form onSubmit={submit} className="grid gap-3">
        <input name="name" required placeholder="Your name" className="px-3 py-2 rounded-lg border border-slate-200"/>
        <input name="email" required type="email" placeholder="Your email" className="px-3 py-2 rounded-lg border border-slate-200"/>
        <input name="phone" placeholder="Phone (optional)" className="px-3 py-2 rounded-lg border border-slate-200"/>
        <textarea name="message" rows="3" placeholder="Message" className="px-3 py-2 rounded-lg border border-slate-200"/>
        <button disabled={loading} className="px-4 py-2 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 disabled:opacity-60">{loading?'Sending...':'Send Inquiry'}</button>
        {status && (
          status.ok ? <p className="text-green-600 text-sm">Thanks! We will be in touch. Ref: {status.id}</p> : <p className="text-red-600 text-sm">{status.error}</p>
        )}
      </form>
    </div>
  )
}

function Property(){
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const id = window.location.pathname.split('/').pop()
    const load = async () => {
      try{
        const res = await fetch(`${BACKEND}/api/properties/${id}`)
        const j = await res.json()
        setData(j)
      }catch(e){ console.error(e) }
      finally{ setLoading(false) }
    }
    load()
  }, [])

  if(loading) return <div className="pt-24 text-center text-slate-600">Loading...</div>
  if(!data) return <div className="pt-24 text-center text-slate-600">Property not found.</div>

  return (
    <div className="pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white">
              <div className="aspect-[16/9] bg-slate-100">
                {data.media?.cover_image ? (
                  <img src={data.media.cover_image} alt={data.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">No image</div>
                )}
              </div>
              <div className="p-6">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{data.title}</h1>
                <p className="mt-1 text-slate-600">{data.location?.street}, {data.location?.city}, {data.location?.state} {data.location?.postal_code}</p>
                <p className="mt-3 text-2xl font-semibold text-slate-900">${'{'}data.price?.toLocaleString(){'}'} <span className="text-base font-medium text-slate-600">{data.status}</span></p>
                <div className="mt-3 text-slate-700">{data.beds || 0} bd • {data.baths || 0} ba • {data.area_sqft || 0} sqft</div>
                <div className="mt-6 prose max-w-none">
                  <p className="text-slate-700">{data.description || 'No description provided.'}</p>
                </div>
                {data.amenities?.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Amenities</h3>
                    <div className="flex flex-wrap gap-2">
                      {data.amenities.map((a, idx)=> (
                        <span key={idx} className="text-sm px-2 py-1 rounded bg-slate-100 text-slate-700">{a}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="lg:col-span-1 space-y-6">
            <MortgageCalculator price={data.price} />
            <InquiryForm propertyId={data.id} />
          </div>
        </div>

        {data.media?.virtual_tour_url && (
          <div className="mt-10">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Virtual Tour</h3>
            <div className="aspect-[16/9] rounded-xl overflow-hidden border border-slate-200 bg-black">
              <iframe src={data.media.virtual_tour_url} title="Virtual Tour" className="w-full h-full" allow="xr-spatial-tracking; fullscreen; vr" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Property
