import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { createCart, addToCart, updateCartLine, removeCartLine, getCart } from '../lib/shopify'

const CartContext = createContext(null)

export function CartProvider({ children, currency }) {
  const [cartId, setCartId] = useState(() => localStorage.getItem('artlate_cart_id'))
  const [checkoutUrl, setCheckoutUrl] = useState(null)
  const [lines, setLines] = useState([])
  const [totalQuantity, setTotalQuantity] = useState(0)
  const [loading, setLoading] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)

  const countryCode = currency === 'egp' ? 'EG' : 'US'

  // Clear cart when currency changes so next add creates a new cart in the right market
  useEffect(() => {
    localStorage.removeItem('artlate_cart_id')
    setCartId(null)
    setLines([])
    setTotalQuantity(0)
    setCheckoutUrl(null)
  }, [currency])

  // Load existing cart on mount
  useEffect(() => {
    if (!cartId) return
    getCart(cartId)
      .then(cart => {
        if (!cart) { localStorage.removeItem('artlate_cart_id'); return }
        setLines(cart.lines)
        setTotalQuantity(cart.totalQuantity)
        setCheckoutUrl(cart.checkoutUrl)
      })
      .catch(() => localStorage.removeItem('artlate_cart_id'))
  }, [])

  function applyCart(cart) {
    setLines(cart.lines)
    setTotalQuantity(cart.totalQuantity)
    setCheckoutUrl(cart.checkoutUrl)
  }

  const addItem = useCallback(async (variantId, quantity = 1) => {
    if (!variantId) return
    setLoading(true)
    try {
      let cart
      const currentCartId = localStorage.getItem('artlate_cart_id')
      if (currentCartId) {
        cart = await addToCart(currentCartId, variantId, quantity, countryCode)
      } else {
        cart = await createCart(variantId, quantity, countryCode)
        localStorage.setItem('artlate_cart_id', cart.id)
        setCartId(cart.id)
      }
      applyCart(cart)
      setCartOpen(true)
    } catch (err) {
      console.error('addToCart/createCart failed:', err)
      localStorage.removeItem('artlate_cart_id')
      setCartId(null)
      try {
        const cart = await createCart(variantId, quantity, countryCode)
        localStorage.setItem('artlate_cart_id', cart.id)
        setCartId(cart.id)
        applyCart(cart)
        setCartOpen(true)
      } catch (err) {
        console.error('createCart fallback failed:', err)
        alert(`Could not add to cart: ${err?.message || err}`)
      }
    } finally {
      setLoading(false)
    }
  }, [countryCode])

  const removeItem = useCallback(async (lineId) => {
    const currentCartId = localStorage.getItem('artlate_cart_id')
    if (!currentCartId) return
    setLoading(true)
    try {
      const cart = await removeCartLine(currentCartId, lineId)
      applyCart(cart)
    } finally {
      setLoading(false)
    }
  }, [])

  const updateItem = useCallback(async (lineId, quantity) => {
    const currentCartId = localStorage.getItem('artlate_cart_id')
    if (!currentCartId) return
    setLoading(true)
    try {
      const cart = await updateCartLine(currentCartId, lineId, quantity)
      applyCart(cart)
    } finally {
      setLoading(false)
    }
  }, [])

  const goToCheckout = useCallback(() => {
    if (checkoutUrl) window.location.href = checkoutUrl
  }, [checkoutUrl])

  return (
    <CartContext.Provider value={{
      lines, totalQuantity, loading, cartOpen,
      addItem, removeItem, updateItem, goToCheckout,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
