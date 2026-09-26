export default function About() {
  return (
    <>
      <div className="breadcrumb-bar"><a href="/">Home</a> <span>›</span> <span>About Us</span></div>

      <div style={{ background: 'linear-gradient(135deg,#1a2340 0%,#2e3f6f 100%)', color: 'white', textAlign: 'center', padding: '100px 40px' }}>
        <p style={{ fontFamily: "'Dancing Script',cursive", fontSize: 18, letterSpacing: 3, opacity: 0.75, marginBottom: 14 }}>SMALL JOYS, WITH LOVE</p>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 48, fontWeight: 400, marginBottom: 16 }}>Everything You Need<br/>for the Magic of Early Years</h1>
        <p style={{ fontSize: 15, opacity: 0.75, maxWidth: 500, margin: '0 auto' }}>Sri Lanka's most loved specialist retailer for babies, toddlers and young children.</p>
      </div>

      <div style={{ background: '#c9973c', color: 'white', padding: 40 }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 80, flexWrap: 'wrap', maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          {[['20+','Years of Joy'],['3','Stores'],['10+','Countries'],['500+','Products']].map(([n,l]) => (
            <div key={l}><div style={{ fontFamily: "'Playfair Display',serif", fontSize: 42, fontWeight: 700, lineHeight: 1 }}>{n}</div><div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', marginTop: 4, opacity: 0.85 }}>{l}</div></div>
          ))}
        </div>
      </div>

      <div className="about-split page-body">
        <div className="about-img">
          <img src="https://placehold.co/600x500/f5e8ef/8b2252?text=Our+Story" alt="Our Story" style={{ width: '100%', borderRadius: 8 }}/>
        </div>
        <div className="about-text">
          <span className="section-eyebrow">Our Story</span>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 36, fontWeight: 400, margin: '12px 0 20px' }}>Born from a Mother's Love</h2>
          <p style={{ marginBottom: 16, lineHeight: 1.8, color: '#4a4a6a' }}>Baby Hub was born from a simple but powerful idea — that every child deserves beautiful, high-quality clothing and accessories that celebrate the magic of early childhood.</p>
          <p style={{ marginBottom: 16, lineHeight: 1.8, color: '#4a4a6a' }}>Founded over 20 years ago, we started as a small boutique in Colombo with a passion for smocked dresses and premium baby essentials. Today, we have grown into Sri Lanka's most trusted destination for parents who want only the best for their little ones.</p>
          <p style={{ lineHeight: 1.8, color: '#4a4a6a' }}>Our artisan-made smocked clothing is crafted by skilled local artisans, blending traditional hand-smocking techniques with contemporary designs. Every piece is made with love, care and exceptional attention to detail.</p>
        </div>
      </div>

      <div style={{ background: '#faf6f1', padding: '80px 40px', textAlign: 'center' }}>
        <span className="section-eyebrow">Our Mission</span>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 38, fontWeight: 400, margin: '14px auto 20px', maxWidth: 600 }}>"To celebrate the wonder of early childhood through exceptional products and heartfelt care."</h2>
        <p style={{ color: '#888', maxWidth: 560, margin: '0 auto', lineHeight: 1.8 }}>We believe that dressing your child should be a joyful, effortless experience. That's why we bring together the world's best baby and kids brands alongside our own exclusive collections — all curated with Sri Lankan parents in mind.</p>
      </div>

      <div className="page-body" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <span className="section-eyebrow">Where to Find Us</span>
          <h2 className="section-title">Our Stores</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 28 }}>
          {[
            ['Colombo 04', '137 Bauddhaloka Mawatha,<br/>Colombo 04', '011-255-2829', 'Mon–Sun: 9:30am – 9:00pm'],
            ['One Galle Face', 'Level 4-59, 1 Galle Road,<br/>Colombo 02', '072-221-2228', 'Mon–Sun: Mall Hours'],
            ['Kandy City Centre', 'Level 3-10, 5 Dalada Veediya,<br/>Kandy', '081-222-0001', 'Mon–Sun: Mall Hours'],
          ].map(([name, addr, tel, hours]) => (
            <div key={name} style={{ border: '1px solid #e4ddd5', borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ background: '#1a2340', padding: 30, textAlign: 'center', color: 'white' }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>📍</div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 500, fontSize: 20 }}>{name}</h3>
              </div>
              <div style={{ padding: 28 }}>
                <p style={{ marginBottom: 10, fontSize: 14, color: '#4a4a6a' }} dangerouslySetInnerHTML={{ __html: addr }}/>
                <p style={{ marginBottom: 8, fontSize: 13.5 }}><strong>📞</strong> {tel}</p>
                <p style={{ fontSize: 13, color: '#888' }}>{hours}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="newsletter-bar"><div className="newsletter-inner"><h2 className="newsletter-title">Join the Baby Hub Family</h2><p className="newsletter-sub">Get exclusive offers, new arrivals and parenting tips delivered to your inbox.</p><form className="newsletter-form form-newsletter"><input type="email" placeholder="Your email address…" required/><button type="submit">Subscribe</button></form></div></div>
    </>
  );
}
