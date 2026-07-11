import { useState, useEffect } from 'react'
import { getProductByHandle } from '../lib/shopify'

export function useShopifyProduct(handle) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!handle) return
    let cancelled = false
    setLoading(true)
    getProductByHandle(handle)
      .then(data => { if (!cancelled) setProduct(data) })
      .catch(() => { if (!cancelled) setProduct(null) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [handle])

  // Returns variants keyed by title (e.g. "S", "M", "L", "XL" or "Black / M")
  const variantMap = {}
  if (product) {
    product.variants.edges.forEach(({ node }) => {
      variantMap[node.title] = node
    })
  }

  return { product, loading, variantMap }
}
