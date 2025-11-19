import { Routes, Route, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import FeaturedProperties from './components/FeaturedProperties'
import Footer from './components/Footer'
import Listings from './pages/Listings'
import Property from './pages/Property'
import About from './pages/About'
import Contact from './pages/Contact'

function Home(){
  const navigate = useNavigate()
  const onSearch = (params)=>{
    const qs = new URLSearchParams(params).toString()
    navigate(`/listings?${qs}`)
  }
  return (
    <>
      <Hero onSearch={onSearch} />
      <div className="-mt-12 relative z-10 bg-white rounded-t-3xl">
        <FeaturedProperties />
      </div>
    </>
  )
}

function App(){
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/property/:id" element={<Property />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
