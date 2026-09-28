import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProduct } from '../api.js';
import { useCart } from '../context/CartContext.jsx';

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState('loading');
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    setStatus('loading');
    getProduct(id)
      .then((data) => {
        setProduct(data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, [id]);

  if (status === 'loading') return <p className="status-msg">Loading product…</p>;
  if (status === 'error' || !product) return <p className="status-msg">Product not found.</p>;

  // Order via WhatsApp must go through the cart checkout so the order is persisted to the DB.
  function handleOrderViaWhatsApp() {
    addItem(product, qty);
    navigate('/cart');
  }

  return (
    <div className="prod-detail">
      <div className="gallery-main">
        <img src={product.image_url || 'https://placehold.co/600x800/f5e8ef/8b2252?text=Baby+Hub'} alt={product.name}/>
      </div>
      <div className="prod-info">
        <Link to="/" className="prod-back">← Back to Products</Link>
        <h1>{product.name}</h1>
        <div className="prod-price-big">Rs. {Number(product.price).toLocaleString()}.00</div>
        {product.description && <p className="prod-desc">{product.description}</p>}

        <div className="qty-row">
          <span className="variant-lbl">Quantity</span>
          <div className="qty-ctrl">
            <button className="qty-btn" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
            <span className="qty-val">{qty}</span>
            <button className="qty-btn" onClick={() => setQty((q) => q + 1)}>+</button>
          </div>
        </div>

        <div className="prod-cta">
          <button className="btn-atc" onClick={() => addItem(product, qty)}>Add to Cart</button>
          <button className="btn-wa-order" onClick={handleOrderViaWhatsApp}>Order via WhatsApp</button>
        </div>
      </div>
    </div>
  );
}
