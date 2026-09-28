import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { createOrder } from '../api.js';

const WHATSAPP_NUMBER = '+94789299383';

export default function Cart() {
  const { items, total, changeQty, removeItem, clear } = useCart();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState('');

  function buildWhatsAppMessage(orderNumber) {
    const lines = items.map((i) => `${i.qty} × ${i.name} — Rs. ${(i.price * i.qty).toLocaleString()}.00`);
    const reference = orderNumber ? `Order ID: ${orderNumber}\n\n` : '';
    return `Hello Baby Hub! I'd like to place an order:\n\n${reference}${lines.join('\n')}\n\nTotal: Rs. ${total.toLocaleString()}.00\n\nName: ${name}\nPhone: ${phone}`;
  }

  async function handleCheckout() {
    if (!name.trim() || !phone.trim()) {
      setError('Please enter your name and phone number.');
      return;
    }
    setError('');
    setPlacing(true);
    // Open the tab synchronously on the click so browsers don't treat it as a blocked popup.
    // 'noopener' would make window.open return null, so we can't use it here — we navigate
    // this same trusted tab to the WhatsApp link ourselves once the order is created.
    const waTab = window.open('', '_blank');
    if (waTab) {
      // Some browsers block a delayed navigation of a still-blank tab as a popup workaround;
      // writing real content immediately avoids that and gives the user feedback meanwhile.
      waTab.document.write('<title>Redirecting…</title><body style="font-family:sans-serif;text-align:center;padding-top:3rem">Preparing your WhatsApp message…</body>');
    }
    let orderNumber;
    try {
      const order = await createOrder({
        customerName: name,
        customerPhone: phone,
        items: items.map((i) => ({ productId: i.id, name: i.name, qty: i.qty, price: i.price })),
        total,
      });
      orderNumber = order.id;
    } catch (err) {
      console.error('Failed to persist order:', err);
      setError('Could not save your order. Please try again.');
      if (waTab) waTab.close();
      setPlacing(false);
      return;
    }
    const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage(orderNumber))}`;
    if (waTab) waTab.location.href = waLink;
    else window.open(waLink, '_blank', 'noopener,noreferrer');
    clear();
    setPlacing(false);
  }

  if (items.length === 0) {
    return (
      <div className="cart-page-wrap">
        <h1 className="cart-page-title">Your Cart</h1>
        <div className="cart-empty-msg">
          <p>Your cart is empty</p>
          <Link to="/">Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page-wrap">
      <h1 className="cart-page-title">Your Cart</h1>
      <div className="cart-layout">
        <div>
          {items.map((item) => (
            <div className="cart-item-row" key={item.id}>
              <img src={item.image || 'https://placehold.co/120x120/f5e6ef/5a2040?text=Baby+Hub'} alt={item.name} className="cart-item-img"/>
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-price-row">
                  <span className="cart-item-price">Rs. {(item.price * item.qty).toLocaleString()}.00</span>
                  <div className="cart-item-qty-ctrl">
                    <button className="c-qty-btn" onClick={() => changeQty(item.id, -1)}>−</button>
                    <span className="c-qty-num">{item.qty}</span>
                    <button className="c-qty-btn" onClick={() => changeQty(item.id, 1)}>+</button>
                  </div>
                </div>
                <span className="cart-item-remove" onClick={() => removeItem(item.id)}>Remove</span>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summ-total"><span>Total</span><span>Rs. {total.toLocaleString()}.00</span></div>

          <div className="form-grp">
            <label>Your Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name"/>
          </div>
          <div className="form-grp">
            <label>Phone Number</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+94 7X XXX XXXX"/>
          </div>
          {error && <p className="form-error">{error}</p>}

          <button className="cart-checkout-btn" onClick={handleCheckout} disabled={placing}>
            {placing ? 'Placing Order…' : 'Checkout via WhatsApp'}
          </button>
        </div>
      </div>
    </div>
  );
}
