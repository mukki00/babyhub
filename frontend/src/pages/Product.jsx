import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct } from '../api.js';
import { useCart } from '../context/CartContext.jsx';

const WHATSAPP_NUMBER = '94XXXXXXXXXX';

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState('loading');
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();

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

  const message = `Hello Baby Hub! I'd like to order:\n${qty} × ${product.name} (Rs. ${Number(product.price).toLocaleString()}.00)`;
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

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
          <a className="btn-wa-order" href={waLink} target="_blank" rel="noopener noreferrer">Order via WhatsApp</a>
        </div>
      </div>
    </div>
  );
}
