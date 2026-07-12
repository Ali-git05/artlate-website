const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN
const token = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN
const endpoint = `https://${domain}/api/2026-01/graphql.json`

// countryCode: 'US' | 'EG'
export async function shopifyFetch(query, variables = {}, countryCode = 'US') {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
      'Shopify-Storefront-Buyer-IP': '0.0.0.0',
    },
    body: JSON.stringify({ query, variables }),
  })

  if (!res.ok) throw new Error(`Shopify API error: ${res.status}`)

  const { data, errors } = await res.json()
  if (errors) throw new Error(errors[0].message)

  return data
}

export function currencyToCountry(currency) {
  return currency === 'egp' ? 'EG' : 'US'
}

// ─── Queries ────────────────────────────────────────────────────────────────

export const PRODUCTS_QUERY = /* GraphQL */ `
  query Products($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                availableForSale
              }
            }
          }
        }
      }
    }
  }
`

export const PRODUCT_BY_HANDLE_QUERY = /* GraphQL */ `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      descriptionHtml
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 20) {
        edges {
          node {
            id
            title
            availableForSale
            price {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`

// ─── Mutations ───────────────────────────────────────────────────────────────

export const CART_CREATE_MUTATION = `
  mutation CartCreate($lines: [CartLineInput!]!, $countryCode: CountryCode!) @inContext(country: $countryCode) {
    cartCreate(input: { lines: $lines }) {
      cart { ${CART_FIELDS} }
      userErrors { field message }
    }
  }
`

const CART_FIELDS = `
  id
  checkoutUrl
  totalQuantity
  cost { totalAmount { amount currencyCode } }
  lines(first: 20) {
    edges {
      node {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            price { amount currencyCode }
            product { title }
            image { url altText }
          }
        }
      }
    }
  }
`

export const CART_LINES_ADD_MUTATION = `
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ${CART_FIELDS} }
      userErrors { field message }
    }
  }
`

export const CART_LINES_UPDATE_MUTATION = `
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { ${CART_FIELDS} }
      userErrors { field message }
    }
  }
`

export const CART_LINES_REMOVE_MUTATION = `
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { ${CART_FIELDS} }
      userErrors { field message }
    }
  }
`

export const GET_CART_QUERY = `
  query GetCart($cartId: ID!) {
    cart(id: $cartId) { ${CART_FIELDS} }
  }
`

// ─── Helpers ─────────────────────────────────────────────────────────────────

function parseLines(cart) {
  return cart.lines.edges.map(({ node }) => node)
}

export async function getProducts(first = 12) {
  const data = await shopifyFetch(PRODUCTS_QUERY, { first })
  return data.products.edges.map(({ node }) => node)
}

export async function getProductByHandle(handle) {
  const data = await shopifyFetch(PRODUCT_BY_HANDLE_QUERY, { handle })
  return data.product
}

export async function getCart(cartId) {
  const data = await shopifyFetch(GET_CART_QUERY, { cartId })
  if (!data.cart) return null
  return { ...data.cart, lines: parseLines(data.cart) }
}

export async function createCart(variantId, quantity = 1) {
  // Always use US market until Egypt payment provider is configured
  const data = await shopifyFetch(CART_CREATE_MUTATION, {
    lines: [{ merchandiseId: variantId, quantity }],
    countryCode: 'US',
  })
  if (data.cartCreate.userErrors?.length) {
    throw new Error(data.cartCreate.userErrors[0].message)
  }
  const cart = data.cartCreate.cart
  return { ...cart, lines: parseLines(cart) }
}

export async function addToCart(cartId, variantId, quantity = 1) {
  const data = await shopifyFetch(CART_LINES_ADD_MUTATION, {
    cartId,
    lines: [{ merchandiseId: variantId, quantity }],
  })
  if (data.cartLinesAdd.userErrors?.length) {
    throw new Error(data.cartLinesAdd.userErrors[0].message)
  }
  const cart = data.cartLinesAdd.cart
  return { ...cart, lines: parseLines(cart) }
}

export async function updateCartLine(cartId, lineId, quantity) {
  const data = await shopifyFetch(CART_LINES_UPDATE_MUTATION, {
    cartId,
    lines: [{ id: lineId, quantity }],
  })
  const cart = data.cartLinesUpdate.cart
  return { ...cart, lines: parseLines(cart) }
}

export async function removeCartLine(cartId, lineId) {
  const data = await shopifyFetch(CART_LINES_REMOVE_MUTATION, {
    cartId,
    lineIds: [lineId],
  })
  const cart = data.cartLinesRemove.cart
  return { ...cart, lines: parseLines(cart) }
}
