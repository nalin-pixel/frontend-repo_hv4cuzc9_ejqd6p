function Footer(){
  return (
    <footer className="border-t border-slate-200 py-10 mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-600">
        <p>&copy; {new Date().getFullYear()} Skyline Realty. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-slate-900">Privacy</a>
          <a href="#" className="hover:text-slate-900">Terms</a>
          <a href="#" className="hover:text-slate-900">Contact</a>
        </div>
      </div>
    </footer>
  )
}
export default Footer
