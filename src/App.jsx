import { useState } from 'react'
import { Routes, Route, useSearchParams } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Splash from './components/Splash'
import CurrencyBar from './components/CurrencyBar'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Collection from './components/Collection'
import Lookbook from './components/Lookbook'
import Feature from './components/Feature'
import Accessories from './components/Accessories'
import BigStatement from './components/BigStatement'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import ProductPage from './components/ProductPage'
import RefundPolicy from './components/RefundPolicy'

function HomePage({ currency }) {
  return (
    <>
      <Hero currency={currency} />
      <Marquee />
      <Collection currency={currency} />
      <Accessories currency={currency} />
      <Lookbook />
      <Feature />
      <BigStatement />
    </>
  )
}

const REGION_MAP = { eg: 'egp', us: 'usd' }
const STORAGE_KEY = 'artlate_region'

function getInitialCurrency(searchParams) {
  const param = searchParams.get('region')?.toLowerCase()
  if (param && REGION_MAP[param]) {
    const currency = REGION_MAP[param]
    localStorage.setItem(STORAGE_KEY, currency)
    return { currency, skipSplash: true }
  }
  const saved = localStorage.getItem(STORAGE_KEY)
  return { currency: saved || 'usd', skipSplash: !!saved }
}

export default function App() {
  const [searchParams] = useSearchParams()
  const { currency: initial, skipSplash } = getInitialCurrency(searchParams)
  const [currency, setCurrency] = useState(initial)

  const handleSetCurrency = (value) => {
    localStorage.setItem(STORAGE_KEY, value)
    setCurrency(value)
  }

  return (
    <CartProvider currency={currency}>
      <Splash skip={skipSplash} onSelect={handleSetCurrency} />
      <CurrencyBar currency={currency} setCurrency={handleSetCurrency} />
      <Nav />
      <CartDrawer />
      <Routes>
        <Route path="/" element={<HomePage currency={currency} />} />
        <Route path="/products/:handle" element={<ProductPage currency={currency} />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
      </Routes>
      <Footer />
    </CartProvider>
  )
}
