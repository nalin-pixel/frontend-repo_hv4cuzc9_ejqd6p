import { Link, NavLink } from 'react-router-dom'

function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/favicon.svg" alt="Logo" className="h-8 w-8" />
          <span className="font-semibold text-slate-900">Skyline Realty</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-slate-700">
          <NavLink to="/listings" className={({isActive})=>`hover:text-slate-900 ${isActive?'text-slate-900':''}`}>Browse</NavLink>
          <NavLink to="/about" className={({isActive})=>`hover:text-slate-900 ${isActive?'text-slate-900':''}`}>About</NavLink>
          <NavLink to="/contact" className={({isActive})=>`hover:text-slate-900 ${isActive?'text-slate-900':''}`}>Contact</NavLink>
        </nav>
        <div className="md:hidden">
          <a href="/listings" className="inline-flex items-center rounded-lg bg-slate-900 text-white px-3 py-2 text-sm">Browse</a>
        </div>
      </div>
    </header>
  )
}

export default Header
