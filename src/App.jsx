import { useState } from 'react'
import Splash from './components/Splash'
import CurrencyBar from './components/CurrencyBar'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Collection from './components/Collection'
import Feature from './components/Feature'
import BigStatement from './components/BigStatement'
import Footer from './components/Footer'

export default function App() {
  const [currency, setCurrency] = useState('usd')

  return (
    <>
      <Splash />
      <CurrencyBar currency={currency} setCurrency={setCurrency} />
      <Nav />
      <Hero currency={currency} />
      <Marquee />
      <Collection currency={currency} />
      <Feature />
      <BigStatement />
      <Footer />
    </>
  )
}
