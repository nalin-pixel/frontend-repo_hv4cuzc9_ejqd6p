import { useEffect, useMemo, useState } from 'react'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Listings(){
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ q:'', status:'', beds:'', property_type:'', min_price:'', max_price:'', city:'' })
  const [view, setView] = useState('grid')

  const queryString = useMemo(() => {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([k,v])=>{ if(v) params.set(k, v) })
    params.set('limit','24')
    return params.toString()
  }, [filters])

  useEffect(()=>{
    const load = async () => {
      setLoading(true)
      try{
        const res = await fetch(`${BACKEND}/api/properties?${queryString}`)
        const data = await res.json()
        setItems(data.items || [])
        setTotal(data.total || 0)
      }catch(e){ console.error(e) }
      finally{ setLoading(false) }
    }
    load()
  }, [queryString])

  const onChange = (e)=> setFilters(prev=>({...prev, [e.target.name]: e.target.value}))
  const reset = ()=> setFilters({ q:'', status:'', beds:'', property_type:'', min_price:'', max_price:'', city:'' })

  return (
    <div className="pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Browse Properties</h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1">
            <div className="sticky top-20 border border-slate-200 rounded-xl p-4 bg-white">
              <div className="grid gap-3">
                <input name="q" value={filters.q} onChange={onChange} placeholder="Search keywords" className="px-3 py-2 rounded-lg border border-slate-200" />
                <input name="city" value={filters.city} onChange={onChange} placeholder="City" className="px-3 py-2 rounded-lg border border-slate-200" />
                <select name="status" value={filters.status} onChange={onChange} className="px-3 py-2 rounded-lg border border-slate-200">
                  <option value="">Any Status</option>
                  <option>For Sale</option>
                  <option>For Rent</option>
                </select>
                <select name="beds" value={filters.beds} onChange={onChange} className="px-3 py-2 rounded-lg border border-slate-200">
                  <option value="">Any Beds</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
                <select name="property_type" value={filters.property_type} onChange={onChange} className="px-3 py-2 rounded-lg border border-slate-200">
                  <option value="">Any Type</option>
                  <option>House</option>
                  <option>Condo</option>
                  <option>Townhouse</option>
                  <option>Apartment</option>
                </select>
                <div className="grid grid-cols-2 gap-2">
                  <input name="min_price" value={filters.min_price} onChange={onChange} placeholder="Min $" className="px-3 py-2 rounded-lg border border-slate-200" />
                  <input name="max_price" value={filters.max_price} onChange={onChange} placeholder="Max $" className="px-3 py-2 rounded-lg border border-slate-200" />
                </div>
                <button onClick={reset} className="px-3 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200">Reset</button>
              </div>
            </div>
          </aside>
          <main className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <p className="text-slate-600">{total} results</p>
              <div className="flex items-center gap-2">
                <button onClick={()=>setView('grid')} className={`px-3 py-1.5 rounded-lg border ${view==='grid'?'bg-slate-900 text-white border-slate-900':'border-slate-200'}`}>Grid</button>
                <button onClick={()=>setView('list')} className={`px-3 py-1.5 rounded-lg border ${view==='list'?'bg-slate-900 text-white border-slate-900':'border-slate-200'}`}>List</button>
              </div>
            </div>

            {loading ? (
              <p className="text-slate-600">Loading...</p>
            ) : items.length === 0 ? (
              <p className="text-slate-600">No properties match your filters.</p>
            ) : (
              <div className={view==='grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'grid grid-cols-1 gap-4'}>
                {items.map((p)=> (
                  <a key={p.id} href={`/property/${p.id}`} className="group rounded-xl overflow-hidden border border-slate-200 bg-white hover:shadow-lg transition">
                    <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
                      {p.media?.cover_image ? (
                        <img src={p.media.cover_image} alt={p.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">No image</div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-slate-900">${'{'}p.price?.toLocaleString(){'}'}</p>
                        {p.status && <span className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-700">{p.status}</span>}
                      </div>
                      <p className="mt-1 text-slate-700 line-clamp-1">{p.title}</p>
                      <p className="text-sm text-slate-500 line-clamp-1">{p.location?.city}, {p.location?.state}</p>
                      <div className="mt-3 text-sm text-slate-600">{p.beds || 0} bd • {p.baths || 0} ba • {p.area_sqft || 0} sqft</div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Listings
