export default function CurrencyBar({ currency, setCurrency }) {
  return (
    <div className="currency-bar">
      <button
        className={`cur-btn${currency === 'usd' ? ' active' : ''}`}
        onClick={() => setCurrency('usd')}
      >
        🇺🇸 USD
      </button>
      <span>|</span>
      <button
        className={`cur-btn${currency === 'egp' ? ' active' : ''}`}
        onClick={() => setCurrency('egp')}
      >
        🇪🇬 EGP
      </button>
    </div>
  )
}
