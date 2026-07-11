import { createContext, useContext, useState, useCallback } from 'react'
import { createCart, addToCart } from '../lib/shopify'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cartId, setCartId] = useState(() => localStorage.getItem('artlate_cart_id'))
  const [totalQuantity, setTotalQuantity] = useState(0)
  const [loading, setLoading] = useState(false)

  const addItem = useCallback(async (variantId, quantity = 1) => {
    if (!variantId) return
    setLoading(true)
    console.log('[Cart] addItem called — variantId:', variantId, 'quantity:', quantity)
    try {
      let cart
      if (cartId) {
        cart = await addToCart(cartId, variantId, quantity)
      } else {
        cart = await createCart(variantId, quantity)
        localStorage.setItem('artlate_cart_id', cart.id)
        setCartId(cart.id)
      }
      console.log('[Cart] cart response:', cart)
      console.log('[Cart] checkoutUrl:', cart.checkoutUrl)
      setTotalQuantity(cart.totalQuantity ?? quantity)
      if (!cart.checkoutUrl) {
        console.error('[Cart] checkoutUrl is missing — cart object:', cart)
        alert('Checkout URL missing. Please try again.')
        return
      }
      window.location.href = cart.checkoutUrl
    } catch (err) {
      console.error('[Cart] Cart error:', err)
      // cart may be stale — reset and retry once
      localStorage.removeItem('artlate_cart_id')
      setCartId(null)
      try {
        const cart = await createCart(variantId, quantity)
        console.log('[Cart] retry cart response:', cart)
        console.log('[Cart] retry checkoutUrl:', cart.checkoutUrl)
        localStorage.setItem('artlate_cart_id', cart.id)
        setCartId(cart.id)
        setTotalQuantity(quantity)
        if (!cart.checkoutUrl) {
          console.error('[Cart] retry checkoutUrl is missing:', cart)
          alert('Checkout URL missing. Please try again.')
          return
        }
        window.location.href = cart.checkoutUrl
      } catch {
        alert('Could not add to cart. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }, [cartId])

  return (
    <CartContext.Provider value={{ totalQuantity, loading, addItem }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
