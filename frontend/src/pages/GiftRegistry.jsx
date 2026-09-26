export default function GiftRegistry() {
  return (
    <>
      <div className="breadcrumb-bar"><a href="/">Home</a> <span>›</span> <span>Gift Registry</span></div>

      <div style={{ background: 'linear-gradient(135deg,#c0a0b5 0%,#8b2252 100%)', color: 'white', textAlign: 'center', padding: '100px 40px' }}>
        <p style={{ fontFamily: "'Dancing Script',cursive", fontSize: 20, letterSpacing: 3, opacity: 0.85, marginBottom: 14 }}>The Perfect Gift, Every Time</p>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 50, fontWeight: 400, marginBottom: 16 }}>Baby Hub Gift Registry</h1>
        <p style={{ fontSize: 16, opacity: 0.85, maxWidth: 520, margin: '0 auto 40px' }}>Create your wish list for baby showers, christenings, or birthdays. Share with friends and family so they can give exactly what you need.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          <button className="reg-opt" style={{ padding: '16px 48px', background: 'white', color: '#8b2252', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', borderRadius: 4, border: 'none' }}>Create Registry</button>
          <button style={{ padding: '16px 48px', background: 'transparent', color: 'white', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', borderRadius: 4, border: '2px solid white' }}>Find a Registry</button>
        </div>
      </div>

      <div style={{ padding: '80px 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <span className="section-eyebrow">Why Choose Baby Hub</span>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 38, fontWeight: 400, marginTop: 14 }}>Registry Benefits</h2>
        </div>
        <div className="registry-features">
          {[
            ['🎁','Free Service','Creating and managing your registry is completely free of charge.'],
            ['💻','Online & In-Store', "Add items from our website or visit any store with our team's help."],
            ['🔄','Easy Completion Discount', 'After the event, receive a special discount to complete your registry yourself.'],
            ['📦','Gift Packaging', 'All registry gifts can be beautifully wrapped in our signature packaging.'],
            ['🚀','Island-Wide Delivery', 'Registry gifts can be delivered to any address across Sri Lanka.'],
            ['🌍','International Gifting', 'Family abroad can shop and send gifts internationally to Sri Lanka.'],
          ].map(([icon, title, text]) => (
            <div className="registry-feature" key={title}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>{icon}</div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: '#faf6f1', padding: '80px 40px', textAlign: 'center' }}>
        <span className="section-eyebrow">Simple Steps</span>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 38, fontWeight: 400, margin: '14px 0 50px' }}>How It Works</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 36, maxWidth: 900, margin: '0 auto' }}>
          {[
            ['1','Create Account','Sign up or log in to your Baby Hub account.'],
            ['2','Add Items','Browse our full collection and add your wishlist items.'],
            ['3','Share Your List','Share your unique registry link with friends and family.'],
            ['4','Receive Gifts','Gifts can be delivered to your door or collected in store.'],
          ].map(([n, title, text]) => (
            <div key={n}>
              <div style={{ width: 56, height: 56, background: '#1a2340', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, margin: '0 auto 18px' }}>{n}</div>
              <h3 style={{ fontSize: 17, marginBottom: 10 }}>{title}</h3>
              <p style={{ fontSize: 13.5, color: '#888' }}>{text}</p>
            </div>
          ))}
        </div>
        <a href="/account/login" style={{ display: 'inline-block', marginTop: 44, padding: '16px 48px', background: '#1a2340', color: 'white', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', borderRadius: 4 }}>Get Started Now</a>
      </div>
    </>
  );
}
