export default function Returns() {
  return (
    <>
      <div className="breadcrumb-bar"><a href="/">Home</a> <span>›</span> <span>Returns &amp; Exchanges</span></div>

      <div style={{ background: '#1a2340', color: 'white', textAlign: 'center', padding: '70px 40px' }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 42, fontWeight: 400, marginBottom: 10 }}>Returns &amp; Exchanges</h1>
        <p style={{ opacity: 0.75 }}>We want you to love every Baby Hub purchase.</p>
      </div>

      <div className="page-body" style={{ maxWidth: 860, margin: '0 auto', paddingTop: 60, paddingBottom: 80 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 20, marginBottom: 50 }}>
          {[['📅','14 Days','Return Window'],['🏷️','Store Credit','or Exchange Only'],['🏪','3 Stores','In-store exchange']].map(([icon, big, small]) => (
            <div key={big} style={{ background: '#faf6f1', borderRadius: 8, padding: 24, textAlign: 'center' }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>{icon}</div>
              <div style={{ fontWeight: 700, fontSize: 22, color: '#1a2340' }}>{big}</div>
              <div style={{ fontSize: 13, color: '#888', marginTop: 4 }}>{small}</div>
            </div>
          ))}
        </div>

        <h2>Return Policy</h2>
        <p>We have a <strong>14-day return policy</strong>. We offer <strong>store credit or exchange only</strong> — we do not offer cash refunds. Your satisfaction is our priority and our team will do their best to find the right solution for you.</p>
        <p style={{ marginBottom: 40 }}>To be eligible for a return, your item must be unused, unworn, and in the same condition that you received it, with all original tags attached. You must also present your original receipt or proof of purchase.</p>

        <h2>Non-Returnable Items</h2>
        <p>The following items <strong>cannot be returned or exchanged</strong>:</p>
        <ul style={{ marginBottom: 40 }}>
          <li>Personalised or monogrammed items</li>
          <li>Baby care &amp; health products (e.g. skincare, hygiene items)</li>
          <li>Sale, clearance, and heavily discounted items</li>
          <li>Gift cards and vouchers</li>
          <li>Items that have been worn, washed, or have tags removed</li>
        </ul>

        <h2>How to Return or Exchange</h2>
        <div style={{ marginBottom: 28 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 10, color: '#1a2340' }}>Online Returns</h3>
          <ol style={{ paddingLeft: 20, lineHeight: 2, fontSize: 14, color: '#4a4a6a' }}>
            <li>Contact us within 14 days of delivery at <strong>online@shopbabyhub.lk</strong> or call <strong>+94 72 226 4444</strong></li>
            <li>Provide your order number, item details, and reason for return</li>
            <li>Our team will respond within 1–2 business days with instructions</li>
            <li>Return the item(s) to our Colombo 04 store or arrange courier delivery</li>
            <li>Upon receipt and inspection, we will issue store credit or process the exchange</li>
          </ol>
        </div>
        <div style={{ marginBottom: 40 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 10, color: '#1a2340' }}>In-Store Returns</h3>
          <p style={{ lineHeight: 1.85, fontSize: 14, color: '#4a4a6a' }}>Visit any of our 3 store locations within 14 days of purchase with the item(s) and your original receipt. Our store team will assist you with a direct exchange or store credit.</p>
        </div>

        <h2>Faulty or Damaged Items</h2>
        <p style={{ marginBottom: 40 }}>If you receive a faulty or damaged item, please contact us within <strong>48 hours</strong> of receipt at <strong>online@shopbabyhub.lk</strong> with photos and your order number. We will arrange a replacement or full store credit as quickly as possible.</p>

        <div style={{ background: '#faf6f1', borderRadius: 8, padding: 28 }}>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 500, marginBottom: 12 }}>Need help with a return?</h3>
          <p style={{ fontSize: 14, color: '#4a4a6a', marginBottom: 16 }}>We're here to help Monday to Sunday, 9:30am to 9:00pm.</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="/pages/contact" style={{ padding: '12px 28px', background: '#1a2340', color: 'white', fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', borderRadius: 4 }}>Contact Us</a>
            <a href="https://wa.me/94722264444" style={{ padding: '12px 28px', background: '#25d366', color: 'white', fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', borderRadius: 4 }} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>
      </div>
    </>
  );
}
