import { Fragment, useEffect, useState } from 'react';
import { adminListOrders } from '../../api.js';
import AdminNav from '../../components/AdminNav.jsx';

function formatDate(value) {
  return new Date(value).toLocaleString('en-LK', { dateStyle: 'medium', timeStyle: 'short' });
}

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState('loading');
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    adminListOrders()
      .then((data) => {
        setOrders(data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <div className="admin-wrap">
      <AdminNav />
      <div className="admin-head">
        <h1>Orders</h1>
      </div>

      {status === 'loading' && <p className="status-msg">Loading orders…</p>}
      {status === 'error' && <p className="status-msg">Could not load orders.</p>}
      {status === 'ready' && orders.length === 0 && <p className="status-msg">No orders yet.</p>}

      {status === 'ready' && orders.length > 0 && (
        <table className="admin-table">
          <thead><tr><th>Date</th><th>Customer</th><th>Phone</th><th>Total</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {orders.map((order) => (
              <Fragment key={order.id}>
                <tr>
                  <td>{formatDate(order.created_at)}</td>
                  <td>{order.customer_name}</td>
                  <td>{order.customer_phone}</td>
                  <td>Rs. {Number(order.total).toLocaleString()}.00</td>
                  <td><span className={`status-pill status-${order.status?.toLowerCase()}`}>{order.status}</span></td>
                  <td>
                    <button className="btn-link" onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}>
                      {expandedId === order.id ? 'Hide' : 'View'} Items
                    </button>
                  </td>
                </tr>
                {expandedId === order.id && (
                  <tr>
                    <td colSpan={6}>
                      <ul className="order-items-list">
                        {(Array.isArray(order.items) ? order.items : []).map((item, idx) => (
                          <li key={idx}>{item.qty} × {item.name} — Rs. {Number(item.price * item.qty).toLocaleString()}.00</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
