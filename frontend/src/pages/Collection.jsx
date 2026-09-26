import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function titleize(slug) {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

export default function Collection() {
  const [params] = useSearchParams();
  const c = params.get('c') || 'all';
  const title = titleize(c);

  useEffect(() => {
    document.title = title + ' | Baby Hub Sri Lanka';
  }, [title]);

  return (
    <>
      {/* COLLECTION HERO */}
      <div className="coll-hero">
        <h1 id="collTitle">{title}</h1>
        <p>Discover our carefully curated selection</p>
      </div>

      {/* BREADCRUMB */}
      <div className="breadcrumb-bar">
        <a href="/">Home</a> <span>›</span>
        <span id="collBreadcrumb">{title}</span>
      </div>

      {/* TOOLBAR */}
      <div className="coll-toolbar">
        <div className="toolbar-l">
          <button className="filter-toggle-btn" id="filterToggle">⊟ Hide Filters</button>
          <span className="prod-count">48 products</span>
        </div>
        <select className="sort-sel" defaultValue="Date, new to old">
          <option>Date, new to old</option>
          <option>Date, old to new</option>
          <option>Price, low to high</option>
          <option>Price, high to low</option>
          <option>Best Selling</option>
          <option>Alphabetically, A–Z</option>
        </select>
      </div>

      {/* COLLECTION LAYOUT */}
      <div className="coll-layout">
        <aside className="filter-panel" id="filterPanel">
          <div className="filter-group">
            <h4>Availability</h4>
            <label className="filter-opt"><input type="checkbox" defaultChecked/> In Stock</label>
            <label className="filter-opt"><input type="checkbox"/> Out of Stock</label>
          </div>
          <div className="filter-group">
            <h4>Size</h4>
            <div className="size-chips">
              {['NB','0–3M','3–6M','6–9M','9–12M','12–18M','18–24M','2–3Y','3–4Y','4–5Y','5–6Y','6–7Y'].map(s => (
                <span className="s-chip" key={s}>{s}</span>
              ))}
            </div>
          </div>
          <div className="filter-group">
            <h4>Colour</h4>
            <div className="swatches">
              <span className="swatch" style={{ background: '#fff', border: '2px solid #ddd' }} title="White"></span>
              <span className="swatch" style={{ background: '#f5c2d0' }} title="Pink"></span>
              <span className="swatch" style={{ background: '#b8d4f5' }} title="Blue"></span>
              <span className="swatch" style={{ background: '#c8f0c0' }} title="Green"></span>
              <span className="swatch" style={{ background: '#f5e8a0' }} title="Yellow"></span>
              <span className="swatch" style={{ background: '#e8c0f0' }} title="Lilac"></span>
              <span className="swatch" style={{ background: '#f0d0b8' }} title="Peach"></span>
              <span className="swatch" style={{ background: '#d0e8d0' }} title="Mint"></span>
              <span className="swatch" style={{ background: '#1a2340' }} title="Navy"></span>
              <span className="swatch" style={{ background: '#555' }} title="Grey"></span>
              <span className="swatch" style={{ background: '#c8a060' }} title="Gold"></span>
              <span className="swatch" style={{ background: '#e84545' }} title="Red"></span>
            </div>
          </div>
          <div className="filter-group">
            <h4>Price Range</h4>
            <label className="filter-opt"><input type="checkbox"/> Under Rs. 1,000</label>
            <label className="filter-opt"><input type="checkbox"/> Rs. 1,000 – Rs. 2,500</label>
            <label className="filter-opt"><input type="checkbox"/> Rs. 2,500 – Rs. 5,000</label>
            <label className="filter-opt"><input type="checkbox"/> Rs. 5,000 – Rs. 10,000</label>
            <label className="filter-opt"><input type="checkbox"/> Above Rs. 10,000</label>
          </div>
          <div className="filter-group">
            <h4>Category</h4>
            <label className="filter-opt"><input type="checkbox"/> Smocked Dresses</label>
            <label className="filter-opt"><input type="checkbox"/> Party Wear</label>
            <label className="filter-opt"><input type="checkbox"/> Casual Wear</label>
            <label className="filter-opt"><input type="checkbox"/> Sleepwear</label>
            <label className="filter-opt"><input type="checkbox"/> Christening Robes</label>
          </div>
        </aside>

        <div>
          <div className="products-grid">
            {COLLECTION_PRODUCTS.map(p => (
              <div className="product-card" key={p.id}>
                <div className="product-img-wrap">
                  <img src={p.img} alt="Product" className="product-img-main"/>
                  <img src={p.imgAlt} alt="" className="product-img-alt"/>
                  {p.badge && <span className={`product-badge ${p.badge === 'Sale' ? 'badge-sale' : 'badge-new'}`}>{p.badge}</span>}
                  <button className="product-wishlist"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg></button>
                  <button className="product-quick-add" data-id={p.id}>Add to Cart</button>
                </div>
                <div className="product-info">
                  <div className="product-name">{p.name}</div>
                  <div className="product-price">
                    {p.was ? <><span className="price-now">{p.price}</span><span className="price-was">{p.was}</span></> : <><span className="price-from">From</span><span className="price-now">{p.price}</span></>}
                  </div>
                  <div className="price-installment">3 × <strong>{p.installment}</strong> with MintPay</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', padding: '40px 0', display: 'flex', justifyContent: 'center', gap: 8, alignItems: 'center' }}>
            <span style={{ padding: '8px 14px', border: '1px solid #1a2340', borderRadius: 4, background: '#1a2340', color: 'white', fontSize: 13 }}>1</span>
            <a href="#" style={{ padding: '8px 14px', border: '1px solid #e4ddd5', borderRadius: 4, fontSize: 13, color: '#1a2340' }}>2</a>
            <a href="#" style={{ padding: '8px 14px', border: '1px solid #e4ddd5', borderRadius: 4, fontSize: 13, color: '#1a2340' }}>3</a>
            <span style={{ fontSize: 13, color: '#888' }}>…</span>
            <a href="#" style={{ padding: '8px 14px', border: '1px solid #e4ddd5', borderRadius: 4, fontSize: 13, color: '#1a2340' }}>6</a>
            <a href="#" style={{ padding: '8px 16px', border: '1px solid #1a2340', borderRadius: 4, fontSize: 13, color: '#1a2340' }}>Next →</a>
          </div>
        </div>
      </div>
    </>
  );
}

const COLLECTION_PRODUCTS = [
  { id: 'c001', img: 'https://placehold.co/400x533/f5e8ef/8b2252?text=Dress+1', imgAlt: 'https://placehold.co/400x533/ffe0f0/8b2252?text=Alt+1', badge: 'New Arrival', name: 'Fairy Garden Pastel Stripe Smocked Girls Dress', price: 'Rs. 2,500.00', installment: 'Rs. 833.33' },
  { id: 'c002', img: 'https://placehold.co/400x533/fff0f5/6b1a3a?text=Dress+2', imgAlt: 'https://placehold.co/400x533/ffe8f2/6b1a3a?text=Alt+2', badge: 'New Arrival', name: 'Enchanted Rose Garden Smocked Girls Dress', price: 'Rs. 3,300.00', installment: 'Rs. 1,100.00' },
  { id: 'c003', img: 'https://placehold.co/400x533/e8f4ff/1a3a6b?text=Dress+3', imgAlt: 'https://placehold.co/400x533/d0eaff/1a3a6b?text=Alt+3', badge: 'New Arrival', name: 'Cloudline Classic Smocked Girls Dress', price: 'Rs. 2,750.00', installment: 'Rs. 916.66' },
  { id: 'c004', img: 'https://placehold.co/400x533/eefaee/1a5030?text=Dress+4', imgAlt: 'https://placehold.co/400x533/d0f5d0/1a5030?text=Alt+4', badge: 'New Arrival', name: 'Summer Sun Mint Green Stripe Smocked Dress', price: 'Rs. 2,500.00', installment: 'Rs. 833.33' },
  { id: 'c005', img: 'https://placehold.co/400x533/f8e8f8/6a0050?text=Dress+5', imgAlt: 'https://placehold.co/400x533/f0d0f0/6a0050?text=Alt+5', badge: null, name: 'Blossom Garden Puff Sleeve Smocked Dress', price: 'Rs. 2,950.00', installment: 'Rs. 983.33' },
  { id: 'c006', img: 'https://placehold.co/400x533/fdf8e8/604010?text=Dress+6', imgAlt: 'https://placehold.co/400x533/f5ecd0/604010?text=Alt+6', badge: 'Sale', name: 'Sunflower Field Yellow Smocked Girls Dress', price: 'Rs. 1,900.00', was: 'Rs. 2,800.00', installment: 'Rs. 633.33' },
  { id: 'c007', img: 'https://placehold.co/400x533/f0f0ff/1a0a60?text=Dress+7', imgAlt: 'https://placehold.co/400x533/e0e0ff/1a0a60?text=Alt+7', badge: null, name: 'Lavender Dream Smocked Bishop Dress', price: 'Rs. 3,100.00', installment: 'Rs. 1,033.33' },
  { id: 'c008', img: 'https://placehold.co/400x533/fff5f5/8b0000?text=Dress+8', imgAlt: 'https://placehold.co/400x533/ffe8e8/8b0000?text=Alt+8', badge: null, name: 'Cherry Blossom Red Smocked Collar Dress', price: 'Rs. 2,800.00', installment: 'Rs. 933.33' },
];
