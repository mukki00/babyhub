export default function Product() {
  return (
    <>
      {/* BREADCRUMB */}
      <div className="breadcrumb-bar">
        <a href="/">Home</a> <span>›</span>
        <a href="/collection?c=girls-clothing">Girls Clothing</a> <span>›</span>
        <a href="/collection?c=smocked-dresses">Smocked Dresses</a> <span>›</span>
        <span>Fairy Garden Pastel Smocked Dress</span>
      </div>

      {/* PRODUCT DETAIL */}
      <div className="prod-detail">
        <div className="gallery-area">
          <div className="gallery-main">
            <img src="https://placehold.co/600x800/f5e8ef/8b2252?text=Main+View" alt="Fairy Garden Smocked Dress" id="mainProductImg"/>
          </div>
          <div className="gallery-thumbs">
            <div className="g-thumb on"><img src="https://placehold.co/200x267/f5e8ef/8b2252?text=View+1" alt="View 1"/></div>
            <div className="g-thumb"><img src="https://placehold.co/200x267/ffe0f5/8b2252?text=View+2" alt="View 2"/></div>
            <div className="g-thumb"><img src="https://placehold.co/200x267/f0d8e8/8b2252?text=View+3" alt="View 3"/></div>
            <div className="g-thumb"><img src="https://placehold.co/200x267/e8c0d8/8b2252?text=View+4" alt="View 4"/></div>
          </div>
        </div>

        <div className="prod-info-wrap">
          <div className="prod-breadcrumb"><a href="/collection?c=smocked-dresses">Smocked Dresses</a> / Girls Clothing</div>
          <h1>Fairy Garden Pastel Stripe Smocked Girls Dress</h1>
          <div className="prod-price-big">From Rs. 2,500.00</div>
          <div className="prod-install">Or 3 × <strong>Rs. 833.33</strong> interest-free with <span style={{ background: '#000', color: '#fff', padding: '2px 8px', borderRadius: 3, fontSize: 11, fontWeight: 700 }}>MintPay</span></div>
          <p className="prod-desc">A whimsical pastel stripe smocked dress that celebrates the joy of childhood. Expertly hand-smocked by our skilled artisans with delicate floral embroidery at the yoke. Features flutter sleeves, a peter pan collar and a full skirt with gentle A-line silhouette. Made from 100% premium cotton for breathable, gentle comfort.</p>

          <span className="variant-lbl">Size — <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0, color: '#888' }}>Select a size</span></span>
          <div className="size-sel">
            {['0-3M','3-6M','6-9M','9-12M','12-18M','18-24M','2-3Y','3-4Y'].map(s => (
              <button className="sz" data-size={s} key={s}>{s.replace('-', '–')}</button>
            ))}
          </div>

          <span className="variant-lbl">Colour — Pastel Stripe</span>
          <div className="color-sel">
            <span className="c-swatch on" style={{ background: 'linear-gradient(135deg,#ffc0cb,#87ceeb,#98fb98)' }} title="Pastel Stripe"></span>
            <span className="c-swatch" style={{ background: '#ffc0cb' }} title="Blush Pink"></span>
            <span className="c-swatch" style={{ background: '#87ceeb' }} title="Sky Blue"></span>
            <span className="c-swatch" style={{ background: '#90ee90' }} title="Mint Green"></span>
          </div>

          <div className="qty-row">
            <span className="variant-lbl" style={{ marginBottom: 0 }}>Quantity</span>
            <div className="qty-ctrl">
              <button className="qty-btn" data-dir="down">−</button>
              <input className="qty-val" type="number" defaultValue={1} min={1} readOnly/>
              <button className="qty-btn" data-dir="up">+</button>
            </div>
          </div>

          <div className="prod-cta">
            <button className="btn-atc" data-id="prod-fairy-garden">Add to Cart</button>
            <button className="btn-wish" title="Add to Wishlist">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
            </button>
          </div>

          <button style={{ width: '100%', padding: 15, border: '2px solid #1a2340', background: 'white', color: '#1a2340', fontSize: 13.5, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', borderRadius: 4, cursor: 'pointer', marginBottom: 20, transition: 'all 0.3s' }}>Buy It Now</button>

          <div className="prod-meta">
            <div><strong>SKU:</strong> BH-GIRLS-SMOCK-001</div>
            <div><strong>Availability:</strong> <span style={{ color: '#1e7d46' }}>In Stock</span></div>
            <div><strong>Material:</strong> 100% Premium Cotton</div>
            <div><strong>Care:</strong> Machine wash cold, gentle cycle</div>
            <div><strong>Made in:</strong> Sri Lanka</div>
          </div>

          <div className="prod-tabs">
            <div className="tab-btns">
              <button className="tab-btn on" data-tab="desc-panel">Description</button>
              <button className="tab-btn" data-tab="size-panel">Size Guide</button>
              <button className="tab-btn" data-tab="shipping-panel">Shipping</button>
              <button className="tab-btn" data-tab="returns-panel">Returns</button>
            </div>
            <div className="tab-panel on" id="desc-panel">
              <p>The Fairy Garden Pastel Stripe Smocked Girls Dress is a celebration of artisan craft and playful childhood charm. Each dress is individually hand-smocked by our skilled artisans, ensuring no two pieces are exactly alike — making each dress a truly unique garment.</p>
              <ul style={{ margin: '14px 0', paddingLeft: 0 }}>
                <li style={{ paddingLeft: 20, position: 'relative', marginBottom: 6, fontSize: 14, color: '#4a4a6a' }}>✓ 100% Premium Cotton — breathable and soft</li>
                <li style={{ paddingLeft: 20, position: 'relative', marginBottom: 6, fontSize: 14, color: '#4a4a6a' }}>✓ Hand-smocked with floral embroidery detail</li>
                <li style={{ paddingLeft: 20, position: 'relative', marginBottom: 6, fontSize: 14, color: '#4a4a6a' }}>✓ Peter Pan collar with flutter sleeves</li>
                <li style={{ paddingLeft: 20, position: 'relative', marginBottom: 6, fontSize: 14, color: '#4a4a6a' }}>✓ Full A-line skirt</li>
                <li style={{ paddingLeft: 20, position: 'relative', marginBottom: 6, fontSize: 14, color: '#4a4a6a' }}>✓ Back zip closure</li>
                <li style={{ paddingLeft: 20, position: 'relative', marginBottom: 6, fontSize: 14, color: '#4a4a6a' }}>✓ Available in 8 size options</li>
              </ul>
            </div>
            <div className="tab-panel" id="size-panel">
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <tbody>
                  <tr style={{ background: '#1a2340', color: 'white' }}><th style={{ padding: 10, textAlign: 'left' }}>Size</th><th style={{ padding: 10 }}>Age</th><th style={{ padding: 10 }}>Chest (cm)</th><th style={{ padding: 10 }}>Length (cm)</th></tr>
                  <tr style={{ background: '#faf6f1' }}><td style={{ padding: 10 }}>0–3M</td><td style={{ padding: 10, textAlign: 'center' }}>0–3 months</td><td style={{ padding: 10, textAlign: 'center' }}>42</td><td style={{ padding: 10, textAlign: 'center' }}>46</td></tr>
                  <tr><td style={{ padding: 10 }}>3–6M</td><td style={{ padding: 10, textAlign: 'center' }}>3–6 months</td><td style={{ padding: 10, textAlign: 'center' }}>45</td><td style={{ padding: 10, textAlign: 'center' }}>50</td></tr>
                  <tr style={{ background: '#faf6f1' }}><td style={{ padding: 10 }}>6–9M</td><td style={{ padding: 10, textAlign: 'center' }}>6–9 months</td><td style={{ padding: 10, textAlign: 'center' }}>48</td><td style={{ padding: 10, textAlign: 'center' }}>54</td></tr>
                  <tr><td style={{ padding: 10 }}>9–12M</td><td style={{ padding: 10, textAlign: 'center' }}>9–12 months</td><td style={{ padding: 10, textAlign: 'center' }}>50</td><td style={{ padding: 10, textAlign: 'center' }}>58</td></tr>
                  <tr style={{ background: '#faf6f1' }}><td style={{ padding: 10 }}>12–18M</td><td style={{ padding: 10, textAlign: 'center' }}>12–18 months</td><td style={{ padding: 10, textAlign: 'center' }}>52</td><td style={{ padding: 10, textAlign: 'center' }}>62</td></tr>
                  <tr><td style={{ padding: 10 }}>18–24M</td><td style={{ padding: 10, textAlign: 'center' }}>18–24 months</td><td style={{ padding: 10, textAlign: 'center' }}>54</td><td style={{ padding: 10, textAlign: 'center' }}>66</td></tr>
                  <tr style={{ background: '#faf6f1' }}><td style={{ padding: 10 }}>2–3Y</td><td style={{ padding: 10, textAlign: 'center' }}>2–3 years</td><td style={{ padding: 10, textAlign: 'center' }}>56</td><td style={{ padding: 10, textAlign: 'center' }}>72</td></tr>
                  <tr><td style={{ padding: 10 }}>3–4Y</td><td style={{ padding: 10, textAlign: 'center' }}>3–4 years</td><td style={{ padding: 10, textAlign: 'center' }}>58</td><td style={{ padding: 10, textAlign: 'center' }}>78</td></tr>
                </tbody>
              </table>
            </div>
            <div className="tab-panel" id="shipping-panel">
              <p><strong>Island-Wide Delivery</strong> — Rs. 400 onwards. Free delivery on orders above Rs. 15,000.</p>
              <p><strong>Estimated Delivery:</strong> 2–7 business days depending on location.</p>
              <p><strong>Store Pickup:</strong> Available at all 3 branches within 1–4 business days.</p>
              <p><strong>International Shipping:</strong> Available to 10+ countries. Rates calculated at checkout.</p>
              <p>For assistance: <strong>+94 72 226 4444</strong> | <strong>online@shopbabyhub.lk</strong></p>
            </div>
            <div className="tab-panel" id="returns-panel">
              <p>We have a <strong>14-day return policy</strong>. We offer store credit or exchange only — no cash refunds.</p>
              <p>Items must be unused, unworn, with original tags and receipt. Personalised items cannot be returned.</p>
              <p>Contact us at <strong>online@shopbabyhub.lk</strong> or <strong>0722264444</strong> to initiate a return.</p>
              <a href="/pages/returns" style={{ color: '#1a2340', fontWeight: 600, fontSize: 13 }}>View Full Returns Policy →</a>
            </div>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <section className="section">
        <div className="section-hd">
          <span className="section-eyebrow">You May Also Like</span>
          <h2 className="section-title">Related Products</h2>
        </div>
        <div className="products-grid">
          {[
            { id: 'rel001', img: 'https://placehold.co/400x533/fff0f5/6b1a3a?text=Rose+Dress', imgAlt: 'https://placehold.co/400x533/ffe8f2/6b1a3a?text=Rose+Alt', badge: true, name: 'Enchanted Rose Garden Smocked Dress', price: 'Rs. 3,300.00', installment: 'Rs. 1,100.00' },
            { id: 'rel002', img: 'https://placehold.co/400x533/eefaee/1a5030?text=Mint+Dress', imgAlt: 'https://placehold.co/400x533/d0f5d0/1a5030?text=Mint+Alt', badge: true, name: 'Summer Sun Mint Green Smocked Dress', price: 'Rs. 2,500.00', installment: 'Rs. 833.33' },
            { id: 'rel003', img: 'https://placehold.co/400x533/f8e8f8/6a0050?text=Blossom', imgAlt: 'https://placehold.co/400x533/f0d0f0/6a0050?text=Alt', badge: false, name: 'Blossom Garden Puff Sleeve Smocked Dress', price: 'Rs. 2,950.00', installment: 'Rs. 983.33' },
            { id: 'rel004', img: 'https://placehold.co/400x533/f0f0ff/1a0a60?text=Lavender', imgAlt: 'https://placehold.co/400x533/e0e0ff/1a0a60?text=Alt', badge: false, name: 'Lavender Dream Bishop Smocked Dress', price: 'Rs. 3,100.00', installment: 'Rs. 1,033.33' },
          ].map(p => (
            <div className="product-card" key={p.id}>
              <div className="product-img-wrap">
                <img src={p.img} alt="" className="product-img-main"/>
                <img src={p.imgAlt} alt="" className="product-img-alt"/>
                {p.badge && <span className="product-badge badge-new">New Arrival</span>}
                <button className="product-wishlist"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg></button>
                <button className="product-quick-add" data-id={p.id}>Add to Cart</button>
              </div>
              <div className="product-info">
                <div className="product-name">{p.name}</div>
                <div className="product-price"><span className="price-from">From</span><span className="price-now">{p.price}</span></div>
                <div className="price-installment">3 × <strong>{p.installment}</strong> with MintPay</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
