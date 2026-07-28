import { Link } from 'react-router-dom'

export default function RefundPolicy() {
  return (
    <div className="policy-page">
      <div className="policy-inner">
        <Link to="/" className="policy-back">← Back</Link>
        <h1 className="policy-title">Refund Policy</h1>
        <p className="policy-updated">Last updated: July 2026</p>

        <section className="policy-section">
          <h2>Returns</h2>
          <p>We accept returns within <strong>14 days</strong> of delivery. Items must be unworn, unwashed, and in original condition with tags attached.</p>
          <p>Final sale items, accessories, and items marked as sold out are not eligible for return.</p>
        </section>

        <section className="policy-section">
          <h2>How to Start a Return</h2>
          <p>Email us at <a href="mailto:artlateclothes@gmail.com">artlateclothes@gmail.com</a> with your order number and reason for return. We'll respond within 2 business days with instructions.</p>
          <p>Return shipping costs are the responsibility of the customer unless the item arrived damaged or incorrect.</p>
        </section>

        <section className="policy-section">
          <h2>Refunds</h2>
          <p>Once your return is received and inspected, we'll notify you by email. If approved, your refund will be processed to your original payment method within <strong>5–10 business days</strong>.</p>
          <p>Original shipping fees are non-refundable.</p>
        </section>

        <section className="policy-section">
          <h2>Exchanges</h2>
          <p>We do not offer direct exchanges. If you need a different size, return your item and place a new order.</p>
        </section>

        <section className="policy-section">
          <h2>Damaged or Wrong Items</h2>
          <p>If you received a damaged or incorrect item, email us at <a href="mailto:artlateclothes@gmail.com">artlateclothes@gmail.com</a> within 7 days of delivery. Include your order number and a photo and we'll make it right at no cost to you.</p>
        </section>

        <section className="policy-section">
          <h2>Egypt Orders</h2>
          <p>For orders shipped within Egypt, returns must be initiated within <strong>7 days</strong> of delivery. The same condition requirements apply. Refunds for EGP orders are issued in EGP to the original payment method.</p>
        </section>
      </div>
    </div>
  )
}
