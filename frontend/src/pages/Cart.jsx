import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function readCart() {
  try {
    return JSON.parse(localStorage.getItem('bh_cart') || '[]');
  } catch {
    return [];
  }
}

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(readCart());
  }, []);

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = total >= 15000 ? 0 : 400;

  function handleRemove(id, size) {
    window.bhRemove?.(id, size);
    setCart(readCart());
  }

  return (
    <>
      <div className="breadcrumb-bar" style={{ padding: '16px 40px' }}>
        <Link to="/">Home</Link> <span>›</span> <span>Shopping Cart</span>
      </div>

      <div className="cart-page-wrap">
        <h1 className="cart-page-title">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 40px' }}>
            <div style={{ fontSize: 80, marginBottom: 20 }}>🛒</div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, marginBottom: 12 }}>Your cart is empty</h2>
            <p style={{ color: '#888', marginBottom: 28 }}>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/collection?c=new-arrivals" style={{ display: 'inline-block', padding: '14px 36px', background: '#1a2340', color: 'white', fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', borderRadius: 4 }}>Start Shopping</Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div>
              <table className="cart-tbl">
                <thead><tr><th>Product</th><th>Price</th><th>Qty</th><th>Total</th></tr></thead>
                <tbody>
                  {cart.map(item => (
                    <tr key={item.id + (item.size || '')}>
                      <td>
                        <div className="cart-tbl-prod">
                          <img src={item.img} alt={item.name} className="cart-tbl-img"/>
                          <div>
                            <div className="cart-tbl-name">{item.name}</div>
                            <div className="cart-tbl-var">{item.size ? 'Size: ' + item.size : ''}</div>
                            <span className="cart-tbl-remove" onClick={() => handleRemove(item.id, item.size)}>Remove</span>
                          </div>
                        </div>
                      </td>
                      <td>Rs. {item.price.toLocaleString()}.00</td>
                      <td>{item.qty}</td>
                      <td><strong>Rs. {(item.price * item.qty).toLocaleString()}.00</strong></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="cart-summary">
              <h3>Order Summary</h3>
              <div className="summ-row"><span>Subtotal</span><span>Rs. {total.toLocaleString()}.00</span></div>
              <div className="summ-row"><span>Shipping</span><span>{shipping === 0 ? <span style={{ color: '#1e7d46' }}>FREE</span> : 'Rs. ' + shipping.toLocaleString() + '.00'}</span></div>
              <div className="summ-row"><span>Tax (incl.)</span><span>—</span></div>
              <div className="summ-total"><span>Total</span><span>Rs. {(total + shipping).toLocaleString()}.00</span></div>
              <div className="promo-row"><input className="promo-in" type="text" placeholder="Promo code…"/><button className="promo-btn">Apply</button></div>
              <button className="cart-checkout-btn">Proceed to Checkout</button>
              <Link to="/" style={{ display: 'block', textAlign: 'center', marginTop: 12, fontSize: 13, color: '#1a2340' }}>← Continue Shopping</Link>
            </div>
          </div>
        )}
      </div>

      {/* UPSELL / RECENTLY VIEWED */}
      <section className="section" style={{ borderTop: '1px solid #e4ddd5' }}>
        <div className="section-hd">
          <span className="section-eyebrow">You May Also Like</span>
          <h2 className="section-title">Popular This Week</h2>
        </div>
        <div className="products-grid">
          {[
            { id: 'up001', img: 'https://placehold.co/400x533/f5e8ef/8b2252?text=Smocked+Dress', imgAlt: 'https://placehold.co/400x533/ffe0f0/8b2252?text=Alt', badge: true, name: 'Fairy Garden Smocked Girls Dress', price: 'Rs. 2,500.00' },
            { id: 'up002', img: 'https://placehold.co/400x533/f8f0ff/3a1060?text=Gift+Hamper', imgAlt: 'https://placehold.co/400x533/f0e0ff/3a1060?text=Alt', badge: false, name: 'Luxury Baby Gift Hamper', price: 'Rs. 8,500.00' },
            { id: 'up003', img: 'https://placehold.co/400x533/fff8e8/604010?text=Bedding+Set', imgAlt: 'https://placehold.co/400x533/fff0d0/604010?text=Alt', badge: true, name: 'Eden Pink Cot Bedding Bundle', price: 'Rs. 12,500.00' },
            { id: 'up004', img: 'https://placehold.co/400x533/fdf0e0/60300a?text=Boys+Set', imgAlt: 'https://placehold.co/400x533/f5e0c0/60300a?text=Alt', badge: false, name: 'Little Adventure Boys Bloomer Set', price: 'Rs. 1,950.00' },
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
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="newsletter-bar">
        <div className="newsletter-inner">
          <h2 className="newsletter-title">Join the Baby Hub Family</h2>
          <p className="newsletter-sub">Get exclusive offers and new arrivals delivered to your inbox.</p>
          <form className="newsletter-form form-newsletter">
            <input type="email" placeholder="Your email address…" required/>
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
    </>
  );
}
