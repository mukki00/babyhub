export default function Contact() {
  return (
    <>
      <div className="breadcrumb-bar"><a href="/">Home</a> <span>›</span> <span>Contact Us</span></div>

      <div style={{ background: 'linear-gradient(135deg,#1a2340 0%,#2e3f6f 100%)', color: 'white', textAlign: 'center', padding: '80px 40px' }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 42, fontWeight: 400, marginBottom: 12 }}>We'd Love to Hear From You</h1>
        <p style={{ opacity: 0.75, fontSize: 15 }}>Our friendly team is here to help — Mon to Sun, 9:30am to 9:00pm.</p>
      </div>

      <div className="contact-layout page-body" style={{ paddingTop: 60, paddingBottom: 80 }}>
        <div className="contact-form-wrap">
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 400, marginBottom: 24 }}>Send Us a Message</h2>
          <form className="contact-form form-contact">
            <div className="field-row">
              <div className="field-group">
                <label>Full Name *</label>
                <input type="text" name="name" placeholder="Your full name" required/>
              </div>
              <div className="field-group">
                <label>Email *</label>
                <input type="email" name="email" placeholder="your@email.com" required/>
              </div>
            </div>
            <div className="field-row">
              <div className="field-group">
                <label>Phone</label>
                <input type="tel" name="phone" placeholder="+94 77 XXX XXXX"/>
              </div>
              <div className="field-group">
                <label>Subject</label>
                <select name="subject" defaultValue="">
                  <option value="">Select a topic…</option>
                  <option>Order Enquiry</option>
                  <option>Returns &amp; Exchanges</option>
                  <option>Product Information</option>
                  <option>Shipping &amp; Delivery</option>
                  <option>Gift Registry</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div className="field-group">
              <label>Message *</label>
              <textarea name="message" rows={5} placeholder="How can we help you?" required></textarea>
            </div>
            <button type="submit" className="btn-contact-submit">Send Message</button>
          </form>
        </div>

        <div className="contact-info-wrap">
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 400, marginBottom: 28 }}>Get in Touch</h2>

          <div className="contact-info-item">
            <div className="c-icon">📞</div>
            <div><div className="c-label">Phone</div><a href="tel:+94722264444" className="c-val">+94 72 226 4444</a></div>
          </div>
          <div className="contact-info-item">
            <div className="c-icon">✉️</div>
            <div><div className="c-label">Email</div><a href="mailto:online@shopbabyhub.lk" className="c-val">online@shopbabyhub.lk</a></div>
          </div>
          <div className="contact-info-item">
            <div className="c-icon">💬</div>
            <div><div className="c-label">WhatsApp</div><a href="https://wa.me/94722264444" className="c-val" target="_blank" rel="noopener noreferrer">Chat with Us</a></div>
          </div>
          <div className="contact-info-item">
            <div className="c-icon">🕐</div>
            <div><div className="c-label">Hours</div><div className="c-val">Mon – Sun: 9:30am – 9:00pm</div></div>
          </div>

          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 500, margin: '36px 0 18px' }}>Our Stores</h3>
          <div style={{ fontSize: 13.5, color: '#4a4a6a', lineHeight: 2 }}>
            <p><strong>Colombo 04:</strong> 137 Bauddhaloka Mawatha — 011-255-2829</p>
            <p><strong>One Galle Face:</strong> Level 4-59, 1 Galle Road, Colombo 02 — 072-221-2228</p>
            <p><strong>Kandy City Centre:</strong> Level 3-10, 5 Dalada Veediya, Kandy — 081-222-0001</p>
          </div>

          <div style={{ marginTop: 28, background: '#e4ddd5', height: 200, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#888' }}>
            📍 Google Maps — Colombo 04 Store
          </div>
        </div>
      </div>
    </>
  );
}
