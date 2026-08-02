const fbq = (...args) => typeof window.fbq === 'function' && window.fbq(...args)

export const pixelTrack = (event, params = {}) => fbq('track', event, params)
