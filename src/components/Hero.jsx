import Spline from '@splinetool/react-spline'

function Hero({ onSearch }) {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/1VHYoewWfi45VYZ5/scene.splinecode" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-16 flex flex-col items-center text-center">
        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
          Find your next home in your location
        </h1>
        <p className="mt-4 max-w-2xl text-white/90 text-lg md:text-xl">
          Curated homes for sale and rent across the city. Trusted agents, verified listings.
        </p>

        <div className="mt-8 w-full max-w-3xl bg-white/90 backdrop-blur rounded-2xl border border-white/40 shadow-lg p-3">
          <form
            onSubmit={(e)=>{e.preventDefault(); const data=new FormData(e.currentTarget); onSearch?.(Object.fromEntries(data.entries()))}}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2"
          >
            <input name="q" placeholder="City, neighborhood, ZIP" className="col-span-2 lg:col-span-3 px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900" />
            <select name="status" className="px-4 py-3 rounded-lg border border-slate-200">
              <option value="">Buy or Rent</option>
              <option>For Sale</option>
              <option>For Rent</option>
            </select>
            <select name="beds" className="px-4 py-3 rounded-lg border border-slate-200">
              <option value="">Beds</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
            <select name="property_type" className="px-4 py-3 rounded-lg border border-slate-200">
              <option value="">Type</option>
              <option>House</option>
              <option>Condo</option>
              <option>Townhouse</option>
              <option>Apartment</option>
            </select>
            <button className="col-span-1 lg:col-span-1 inline-flex items-center justify-center px-4 py-3 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 transition">Search</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Hero
