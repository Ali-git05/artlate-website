import { useState } from 'react'
import { CartProvider } from './context/CartContext'
import Splash from './components/Splash'
import CurrencyBar from './components/CurrencyBar'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Collection from './components/Collection'
import Editorial from './components/Editorial'
import Feature from './components/Feature'
import Accessories from './components/Accessories'
import BigStatement from './components/BigStatement'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'

export default function App() {
  const [currency, setCurrency] = useState('usd')

  return (
    <CartProvider>
      <Splash />
      <CurrencyBar currency={currency} setCurrency={setCurrency} />
      <Nav />
      <CartDrawer />
      <Hero currency={currency} />
      <Marquee />
      <Collection currency={currency} />
      <Accessories currency={currency} />
      <Editorial />
      <Feature />
      <BigStatement />
      <Footer />
    </CartProvider>
  )
}
