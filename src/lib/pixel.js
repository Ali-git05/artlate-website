export const pixelTrack = (event, params = {}) => {
  if (typeof window.fbq !== 'function') {
    console.warn('[Pixel] fbq not loaded — skipped event:', event)
    return
  }
  window.fbq('track', event, params)
}
