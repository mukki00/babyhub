import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../api.js';
import { useCart } from '../context/CartContext.jsx';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading');
  const { addItem } = useCart();

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <span className="hero-eyebrow">Baby Hub Sri Lanka</span>
          <h1 className="hero-title">Everything Your Little One Needs</h1>
          <p className="hero-desc">Browse our collection and order online — we'll confirm your order over WhatsApp.</p>
        </div>
      </section>

      <section className="section">
        <div className="section-hd">
          <h2 className="section-title">Our Products</h2>
        </div>

        {status === 'loading' && <p className="status-msg">Loading products…</p>}
        {status === 'error' && <p className="status-msg">Could not load products. Please try again later.</p>}
        {status === 'ready' && products.length === 0 && <p className="status-msg">No products available yet.</p>}

        <div className="products-grid">
          {products.map((p) => (
            <div className="product-card" key={p.id}>
              <Link to={`/product/${p.id}`} className="product-img-wrap">
                <img src={p.image_url || 'https://placehold.co/400x533/f5e6ef/5a2040?text=Baby+Hub'} alt={p.name} className="product-img-main"/>
              </Link>
              <div className="product-info">
                <Link to={`/product/${p.id}`} className="product-name">{p.name}</Link>
                <div className="product-price">Rs. {Number(p.price).toLocaleString()}.00</div>
                <button className="btn-add-cart" onClick={() => addItem(p, 1)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
