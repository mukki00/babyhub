const FAQ_DATA = [
  { cat: 'orders', title: 'Orders', items: [
    ['How do I place an order?', "Browse our store, select your items and sizes, and add them to your cart. When you're ready, proceed to checkout. We accept all major credit/debit cards, online banking, and cash on delivery."],
    ['Can I modify or cancel my order after placing it?', 'Orders can be modified or cancelled within 2 hours of placement. Please contact us immediately via phone (+94 72 226 4444) or email (online@shopbabyhub.lk).'],
    ['How do I track my order?', "Once your order is dispatched, you'll receive a confirmation email with a tracking link. You can also log into your account to view your order status."],
    ['Can I shop online and pick up in store?', 'Yes! We offer Click & Collect at all 3 stores. Select "Store Pickup" at checkout and your order will be ready within 1–4 business days.'],
  ]},
  { cat: 'shipping', title: 'Shipping', items: [
    ['How much does delivery cost?', 'Delivery starts from Rs. 400 island-wide. Orders above Rs. 15,000 qualify for FREE delivery.'],
    ['How long will my order take to arrive?', 'Standard delivery takes 2–7 business days depending on your location. Colombo orders typically arrive within 2–3 business days.'],
    ['Do you ship internationally?', 'Yes! We ship to Australia, Canada, India, Malaysia, Maldives, Singapore, Sweden, UAE, UK, and USA. International orders take 7–10 business days. See our International Shipping page for rates.'],
  ]},
  { cat: 'returns', title: 'Returns & Exchanges', items: [
    ['What is your return policy?', 'We accept returns within 14 days of purchase. We offer store credit or exchange only — no cash refunds. Items must be unused, unworn, with original tags attached.'],
    ['What items cannot be returned?', 'We cannot accept returns on: personalised/monogrammed items, baby care products, sale/clearance items, and gift cards.'],
    ['How do I make a return or exchange?', 'Contact our team at online@shopbabyhub.lk or +94 72 226 4444 within 14 days. You can also exchange in any of our 3 stores with your receipt.'],
  ]},
  { cat: 'sizing', title: 'Sizing', items: [
    ['How do I know which size to choose?', "Each product page includes a detailed size guide. We recommend measuring your child's chest, length, and weight and comparing with our size chart. When in between sizes, we suggest sizing up."],
    ['Do your sizes run small or large?', 'Our clothing is true to size. Smocked garments may have some give in the chest area due to the elastic smocking. If your child is between sizes, we recommend going up a size for comfortable wear.'],
  ]},
  { cat: 'products', title: 'Products', items: [
    ['Where are your smocked dresses made?', 'Our signature smocked garments are proudly made in Sri Lanka by our skilled local artisans using 100% premium cotton fabric. Each piece is individually hand-smocked and embroidered.'],
    ['How should I wash smocked garments?', 'Machine wash cold on a gentle cycle. We recommend using a mild detergent and turning garments inside out. Do not tumble dry — lay flat to air dry to preserve the smocking.'],
    ['Can I do personalisation/monogramming?', 'Yes! Many of our garments can be personalised with your child\'s name or initials. Please contact us before placing your order to arrange this. Note: personalised items cannot be returned.'],
  ]},
];

export default function Faq() {
  return (
    <>
      <div className="breadcrumb-bar"><a href="/">Home</a> <span>›</span> <span>FAQ</span></div>

      <div style={{ background: 'linear-gradient(135deg,#1a2340 0%,#2e3f6f 100%)', color: 'white', textAlign: 'center', padding: '70px 40px' }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 42, fontWeight: 400, marginBottom: 10 }}>Frequently Asked Questions</h1>
        <p style={{ opacity: 0.75 }}>Can't find an answer? <a href="/pages/contact" style={{ color: '#c9973c', textDecoration: 'underline' }}>Contact us</a> and we'll be happy to help.</p>
      </div>

      <div className="faq-wrap page-body" style={{ paddingTop: 60, paddingBottom: 80, maxWidth: 860, margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 44 }}>
          <button className="faq-cat-btn on" data-cat="all">All</button>
          <button className="faq-cat-btn" data-cat="orders">Orders</button>
          <button className="faq-cat-btn" data-cat="shipping">Shipping</button>
          <button className="faq-cat-btn" data-cat="returns">Returns</button>
          <button className="faq-cat-btn" data-cat="sizing">Sizing</button>
          <button className="faq-cat-btn" data-cat="products">Products</button>
        </div>

        {FAQ_DATA.map(section => (
          <div key={section.cat}>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 500, margin: '40px 0 16px', paddingBottom: 8, borderBottom: '2px solid #c9973c', color: '#1a2340' }}>{section.title}</h3>
            {section.items.map(([q, a], idx) => (
              <div className="faq-item" data-cat={section.cat} key={idx}>
                <div className="faq-q">{q}</div>
                <div className="faq-a">{a}</div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={{ background: '#faf6f1', padding: '60px 40px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 30, fontWeight: 400, marginBottom: 12 }}>Still have questions?</h2>
        <p style={{ color: '#888', marginBottom: 28 }}>Our team is available Mon–Sun, 9:30am–9:00pm.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          <a href="/pages/contact" style={{ padding: '14px 36px', background: '#1a2340', color: 'white', fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', borderRadius: 4 }}>Contact Us</a>
          <a href="https://wa.me/94722264444" style={{ padding: '14px 36px', background: '#25d366', color: 'white', fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', borderRadius: 4 }} target="_blank" rel="noopener noreferrer">WhatsApp Chat</a>
        </div>
      </div>
    </>
  );
}
