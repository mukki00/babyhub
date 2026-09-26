const COUNTRIES = ['🇦🇺 Australia','🇨🇦 Canada','🇮🇳 India','🇲🇾 Malaysia','🇲🇻 Maldives','🇸🇬 Singapore','🇸🇪 Sweden','🇦🇪 UAE','🇬🇧 United Kingdom','🇺🇸 United States'];

export default function InternationalShipping() {
  return (
    <>
      <div className="breadcrumb-bar"><a href="/">Home</a> <span>›</span> <span>International Shipping</span></div>

      <div style={{ background: 'linear-gradient(135deg,#1a2340 0%,#2e3f6f 100%)', color: 'white', textAlign: 'center', padding: '80px 40px' }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 42, fontWeight: 400, marginBottom: 10 }}>International Shipping</h1>
        <p style={{ opacity: 0.75, fontSize: 15 }}>Bringing Baby Hub to families around the world.</p>
      </div>

      <div className="page-body" style={{ maxWidth: 860, margin: '0 auto', paddingTop: 60, paddingBottom: 80 }}>
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <p style={{ fontSize: 16, color: '#4a4a6a', lineHeight: 1.8, maxWidth: 620, margin: '0 auto' }}>We are proud to ship our premium baby and children's clothing to families around the world. Whether you're a Sri Lankan living abroad or buying a gift for someone special, we've got you covered.</p>
        </div>

        <h2>Countries We Ship To</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 16, marginBottom: 50 }}>
          {COUNTRIES.map(c => <div key={c} style={{ border: '1px solid #e4ddd5', borderRadius: 8, padding: 18, textAlign: 'center', fontSize: 14 }}>{c}</div>)}
        </div>

        <h2>Shipping Rates &amp; Delivery</h2>
        <table className="policy-table" style={{ marginBottom: 40 }}>
          <thead><tr><th>Region</th><th>Estimated Time</th><th>Rate</th></tr></thead>
          <tbody>
            <tr><td>India, Maldives</td><td>7–10 business days</td><td>Calculated at checkout</td></tr>
            <tr><td>UAE, Singapore, Malaysia</td><td>7–10 business days</td><td>Calculated at checkout</td></tr>
            <tr><td>Australia, UK, USA, Canada, Sweden</td><td>10–14 business days</td><td>Calculated at checkout</td></tr>
          </tbody>
        </table>

        <h2>Important Information</h2>
        <ul style={{ marginBottom: 40 }}>
          <li>International shipping rates are calculated based on parcel weight and destination at checkout.</li>
          <li>All orders are carefully packed in our signature Baby Hub packaging.</li>
          <li>The recipient may be liable for import duties and taxes charged by their country's customs. Baby Hub is not responsible for these charges.</li>
          <li>A tracking number will be provided once your order has been dispatched.</li>
          <li>International orders are not eligible for return or exchange due to shipping costs. Please check sizing carefully before ordering.</li>
        </ul>

        <h2>Want to Ship to Another Country?</h2>
        <p style={{ marginBottom: 28 }}>If your country is not listed, please contact us and we'll do our best to arrange shipping to your location.</p>

        <div style={{ background: '#faf6f1', borderRadius: 8, padding: 28 }}>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 500, marginBottom: 12 }}>Enquire About International Shipping</h3>
          <p style={{ fontSize: 14, color: '#4a4a6a', marginBottom: 16 }}>Contact us with your country and item details and we'll get back to you with a quote.</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="/pages/contact" style={{ padding: '12px 28px', background: '#1a2340', color: 'white', fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', borderRadius: 4 }}>Contact Us</a>
            <a href="https://wa.me/94722264444" style={{ padding: '12px 28px', background: '#25d366', color: 'white', fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', borderRadius: 4 }} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>
      </div>
    </>
  );
}
