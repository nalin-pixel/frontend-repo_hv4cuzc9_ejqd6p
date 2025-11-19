import { useEffect, useState } from 'react'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function FeaturedProperties() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const load = async () => {
      try {
        const res = await fetch(`${BACKEND}/api/properties?limit=8&sort=newest`)
        const data = await res.json()
        setItems(data.items || [])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Featured Properties</h2>
          <a href="/listings" className="text-slate-700 hover:text-slate-900">See all</a>
        </div>

        {loading ? (
          <p className="text-slate-600">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
      </div>
    </section>
  )
}

export default FeaturedProperties
