import splashLogo from '../assets/splash-logo.jpg'
import hero from '../assets/product-1-back.jpg'
import product1 from '../assets/product-1.jpg'
import product3 from '../assets/product-3.jpg'
import product4 from '../assets/product-4.jpg'
import product5 from '../assets/product-5.jpg'

export { splashLogo }

export const heroProduct = {
  image: hero,
  eye: 'Art Late® · Drop 001',
  tag: 'Drop 001 — Hero Piece',
  name: 'Pardon Mademoiselle',
  desc: 'A statement piece for those who arrive on their own terms. 100% combed ring-spun cotton, 260GSM. Oversized boxy fit.',
  priceUSD: '$65 USD',
  priceEGP: '750 EGP',
  sizes: ['S', 'M', 'L', 'XL'],
  defaultSize: 'M',
  handle: 'pardon-mademoiselle',
}

export const collection = [
  {
    id: 1,
    image: product1,
    name: 'Pardon Mademoiselle Tee',
    priceUSD: '$65',
    priceEGP: '750 EGP',
    colors: [{ bg: '#8B1A1A', border: '#e8e8e6' }],
    alt: 'Red Tee',
    handle: 'pardon-mademoiselle',
  },
  {
    id: 3,
    image: product3,
    name: 'Pardon Mademoiselle Tee',
    priceUSD: '$65',
    priceEGP: '750 EGP',
    colors: [{ bg: '#1a2545', border: '#e8e8e6' }],
    alt: 'Navy Tee',
    handle: 'pardon-mademoiselle',
  },
  {
    id: 4,
    image: product4,
    name: 'Bonjour Mademoiselle Muscle Tee',
    priceUSD: '$60',
    priceEGP: '700 EGP',
    colors: [{ bg: '#f0f0f0', border: '#ccc' }],
    alt: 'Muscle Tee',
    handle: 'bonjour-mademoiselle-muscle-tee',
  },
  {
    id: 5,
    image: product5,
    name: 'ARTLATE Crop Top',
    priceUSD: '$55',
    priceEGP: '640 EGP',
    colors: [{ bg: '#f0f0f0', border: '#ccc' }],
    alt: 'ARTLATE Crop Top',
    handle: 'artlate-crop-top',
  },
]

export const featureImage = product3

export const accessories = []

export const marqueeItems = [
  'The Art Of Being Late®',
  'Drop 001 Available Now',
  'Sweet Enough To Steal Your Attention',
  'Crafted in Egypt · Worn Everywhere',
]
