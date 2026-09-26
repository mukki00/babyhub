export default function Shipping() {
  return (
    <>
      <div className="breadcrumb-bar"><a href="/">Home</a> <span>›</span> <span>Shipping Policy</span></div>

      <div style={{ background: '#1a2340', color: 'white', textAlign: 'center', padding: '70px 40px' }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 42, fontWeight: 400, marginBottom: 10 }}>Shipping &amp; Delivery</h1>
        <p style={{ opacity: 0.75 }}>Everything you need to know about getting your Baby Hub order.</p>
      </div>

      <div className="page-body" style={{ maxWidth: 860, margin: '0 auto', paddingTop: 60, paddingBottom: 80 }}>
        <div style={{ background: '#faf6f1', borderRadius: 12, padding: 28, marginBottom: 40, display: 'flex', gap: 20, alignItems: 'center' }}>
          <div style={{ fontSize: 36 }}>🎉</div>
          <div>
            <strong style={{ fontSize: 16, color: '#1a2340' }}>Free Delivery on orders above Rs. 15,000</strong>
            <p style={{ marginTop: 6, color: '#888', fontSize: 13.5 }}>Shop Rs. 15,000 or more and enjoy complimentary island-wide delivery — no promo code needed!</p>
          </div>
        </div>

        <h2>Domestic Delivery</h2>
        <table className="policy-table" style={{ marginBottom: 40 }}>
          <thead><tr><th>Delivery Type</th><th>Rate</th><th>Estimated Time</th></tr></thead>
          <tbody>
            <tr><td><strong>Standard Delivery</strong><br/><span style={{ fontSize: 12, color: '#888' }}>Orders below Rs. 15,000</span></td><td>From Rs. 400</td><td>2–7 business days</td></tr>
            <tr><td><strong>Free Delivery</strong><br/><span style={{ fontSize: 12, color: '#888' }}>Orders Rs. 15,000 and above</span></td><td style={{ color: '#1e7d46', fontWeight: 600 }}>FREE</td><td>2–7 business days</td></tr>
            <tr><td><strong>Store Pickup</strong><br/><span style={{ fontSize: 12, color: '#888' }}>All 3 store locations</span></td><td style={{ color: '#1e7d46', fontWeight: 600 }}>FREE</td><td>1–4 business days</td></tr>
          </tbody>
        </table>

        <h2>Order Processing</h2>
        <p>Orders are processed and dispatched within <strong>1–2 business days</strong> of placement (excluding weekends and public holidays). You will receive an email confirmation once your order has been dispatched, including a tracking reference.</p>
        <p style={{ marginBottom: 40 }}>Orders placed on weekends or public holidays will be processed on the next business day.</p>

        <h2>Store Pickup</h2>
        <p>Select <strong>Store Pickup</strong> at checkout. Your order will be ready for collection within 1–4 business days. We'll notify you by email and/or SMS when your order is ready.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16, marginBottom: 40 }}>
          <div style={{ border: '1px solid #e4ddd5', borderRadius: 8, padding: 20, fontSize: 13.5 }}>
            <div style={{ fontWeight: 700, marginBottom: 6, color: '#1a2340' }}>📍 Colombo 04</div>
            <p style={{ color: '#888' }}>137 Bauddhaloka Mawatha<br/>011-255-2829</p>
          </div>
          <div style={{ border: '1px solid #e4ddd5', borderRadius: 8, padding: 20, fontSize: 13.5 }}>
            <div style={{ fontWeight: 700, marginBottom: 6, color: '#1a2340' }}>📍 One Galle Face</div>
            <p style={{ color: '#888' }}>Level 4-59, 1 Galle Road<br/>072-221-2228</p>
          </div>
          <div style={{ border: '1px solid #e4ddd5', borderRadius: 8, padding: 20, fontSize: 13.5 }}>
            <div style={{ fontWeight: 700, marginBottom: 6, color: '#1a2340' }}>📍 Kandy City Centre</div>
            <p style={{ color: '#888' }}>Level 3-10, 5 Dalada Veediya<br/>081-222-0001</p>
          </div>
        </div>

        <h2>Order Tracking</h2>
        <p>Once your order is dispatched, you will receive a tracking link via email. You can also check your order status by logging into your <a href="/account/login" style={{ color: '#1a2340', fontWeight: 600 }}>Baby Hub account</a>.</p>
        <p style={{ marginBottom: 40 }}>For any tracking queries, contact us at <strong>online@shopbabyhub.lk</strong> or call <strong>+94 72 226 4444</strong>.</p>

        <h2>International Shipping</h2>
        <p>We ship to 10+ countries worldwide. Please see our dedicated <a href="/pages/international-shipping" style={{ color: '#1a2340', fontWeight: 600 }}>International Shipping page</a> for full details, country-specific rates, and estimated delivery times.</p>

        <div style={{ background: '#faf6f1', borderRadius: 8, padding: 28, marginTop: 40 }}>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 500, marginBottom: 12 }}>Have a question about your delivery?</h3>
          <p style={{ fontSize: 14, color: '#4a4a6a', marginBottom: 16 }}>Our team is happy to help — Mon to Sun, 9:30am to 9:00pm.</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="/pages/contact" style={{ padding: '12px 28px', background: '#1a2340', color: 'white', fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', borderRadius: 4 }}>Contact Us</a>
            <a href="https://wa.me/94722264444" style={{ padding: '12px 28px', background: '#25d366', color: 'white', fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', borderRadius: 4 }} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>
      </div>
    </>
  );
}
