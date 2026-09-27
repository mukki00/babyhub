import { Fragment, useEffect, useState } from 'react';
import {
  adminListOrders,
  adminMarkOrderShipped,
  adminMarkOrderReturned,
  adminSetOrderReceived,
  adminReshipReturnedOrder,
  adminRefundReturnedOrder,
  adminSetOrderDelivered,
  adminSetOrderPaid,
} from '../../api.js';
import AdminNav from '../../components/AdminNav.jsx';

function formatDate(value) {
  return new Date(value).toLocaleString('en-LK', { dateStyle: 'medium', timeStyle: 'short' });
}

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState('loading');
  const [expandedId, setExpandedId] = useState(null);
  const [activeTab, setActiveTab] = useState('orders');
  const [updatingId, setUpdatingId] = useState(null);
  const [actionMessage, setActionMessage] = useState('');
  const [actionError, setActionError] = useState('');

  useEffect(() => {
    adminListOrders()
      .then((data) => {
        setOrders(data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  const activeOrders = orders.filter((order) => !['SHIPPED', 'RETURNED'].includes(order.status?.toUpperCase()));
  const shippedOrders = orders.filter((order) => order.status?.toUpperCase() === 'SHIPPED');
  const returnedOrders = orders.filter((order) => order.status?.toUpperCase() === 'RETURNED');
  const refundedOrders = orders.filter((order) => order.status?.toUpperCase() === 'REFUNDED');
  const visibleOrders = activeTab === 'shipped'
    ? shippedOrders
    : activeTab === 'returned'
      ? returnedOrders
      : activeTab === 'refund' ? refundedOrders : activeOrders;

  async function updateOrder(orderId, request, message) {
    setUpdatingId(orderId);
    setActionMessage('');
    setActionError('');
    try {
      const updatedOrder = await request();
      setOrders((current) => current.map((order) => (
        String(order.id) === String(updatedOrder.id) ? updatedOrder : order
      )));
      setActionMessage(message);
    } catch {
      setActionError('Could not update the order. Please try again.');
    } finally {
      setUpdatingId(null);
    }
  }

  function isDelivered(order) {
    return order.delivered === true || Number(order.delivered) === 1;
  }

  function isReceived(order) {
    return order.received === true || Number(order.received) === 1;
  }

  function isPaid(order) {
    return order.paid === true || Number(order.paid) === 1;
  }

  return (
    <div className="admin-wrap">
      <AdminNav />
      <div className="admin-head">
        <h1>Orders</h1>
      </div>

      {status === 'loading' && <p className="status-msg">Loading orders…</p>}
      {status === 'error' && <p className="status-msg">Could not load orders.</p>}
      {status === 'ready' && (
        <>
          <div className="order-tabs" role="tablist" aria-label="Orders by shipping status">
            <button
              className="order-tab"
              type="button"
              role="tab"
              aria-selected={activeTab === 'orders'}
              onClick={() => setActiveTab('orders')}
            >
              Orders <span className="order-tab-count">{activeOrders.length}</span>
            </button>
            <button
              className="order-tab"
              type="button"
              role="tab"
              aria-selected={activeTab === 'shipped'}
              onClick={() => setActiveTab('shipped')}
            >
              Shipped <span className="order-tab-count">{shippedOrders.length}</span>
            </button>
            <button
              className="order-tab"
              type="button"
              role="tab"
              aria-selected={activeTab === 'returned'}
              onClick={() => setActiveTab('returned')}
            >
              Returned <span className="order-tab-count">{returnedOrders.length}</span>
            </button>
            <button
              className="order-tab"
              type="button"
              role="tab"
              aria-selected={activeTab === 'refund'}
              onClick={() => setActiveTab('refund')}
            >
              Refund <span className="order-tab-count">{refundedOrders.length}</span>
            </button>
          </div>

          {actionMessage && <p className="order-action-message" role="status">{actionMessage}</p>}
          {actionError && <p className="form-error" role="alert">{actionError}</p>}

          {visibleOrders.length === 0 ? (
            <p className="status-msg">
              {activeTab === 'shipped'
                ? 'No shipped orders.'
                : activeTab === 'returned'
                  ? 'No returned orders.'
                  : activeTab === 'refund' ? 'No refunded orders.' : 'No active orders.'}
            </p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th aria-label="Order items"></th><th>Date</th><th>Customer</th><th>Phone</th>
                  <th>Total</th><th>Status</th>
                  {activeTab === 'refund' && <th>Paid</th>}
                  {activeTab === 'shipped' && <th>Delivered</th>}
                  {activeTab === 'returned' && <th>Received</th>}
                  {activeTab !== 'refund' && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {visibleOrders.map((order) => {
                  const shipped = order.status?.toUpperCase() === 'SHIPPED';
                  const delivered = isDelivered(order);
                  const received = isReceived(order);
                  const paid = isPaid(order);
                  const updating = updatingId === order.id;
                  return (
                    <Fragment key={order.id}>
                      <tr>
                        <td>
                          <button
                            className="order-expand-btn"
                            type="button"
                            aria-label={`${expandedId === order.id ? 'Hide' : 'View'} items for ${order.customer_name}`}
                            aria-expanded={expandedId === order.id}
                            onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                          >
                            <span aria-hidden="true">{expandedId === order.id ? '−' : '+'}</span>
                          </button>
                        </td>
                        <td>{formatDate(order.created_at)}</td>
                        <td>{order.customer_name}</td>
                        <td>{order.customer_phone}</td>
                        <td>Rs. {Number(order.total).toLocaleString()}.00</td>
                        <td><span className={`status-pill status-${order.status?.toLowerCase()}`}>{order.status}</span></td>
                        {activeTab === 'refund' && (
                          <td>
                            <label className="order-delivered">
                              <input
                                type="checkbox"
                                checked={paid}
                                disabled={updating}
                                aria-label={`Mark ${order.customer_name}'s order paid`}
                                onChange={(event) => updateOrder(
                                  order.id,
                                  () => adminSetOrderPaid(order.id, event.target.checked),
                                  'Payment status updated.'
                                )}
                              />
                              <span>{paid ? 'Yes' : 'No'}</span>
                            </label>
                          </td>
                        )}
                        {activeTab === 'shipped' && (
                          <td>
                            <label className="order-delivered">
                              <input
                                type="checkbox"
                                checked={delivered}
                                disabled={updating}
                                aria-label={`Mark ${order.customer_name}'s order delivered`}
                                onChange={(event) => updateOrder(
                                  order.id,
                                  () => adminSetOrderDelivered(order.id, event.target.checked),
                                  'Delivery status updated.'
                                )}
                              />
                              <span>{delivered ? 'Yes' : 'No'}</span>
                            </label>
                          </td>
                        )}
                        {activeTab === 'returned' && (
                          <td>
                            <label className="order-delivered">
                              <input
                                type="checkbox"
                                checked={received}
                                disabled={updating}
                                aria-label={`Mark ${order.customer_name}'s return received`}
                                onChange={(event) => updateOrder(
                                  order.id,
                                  () => adminSetOrderReceived(order.id, event.target.checked),
                                  'Return receipt updated.'
                                )}
                              />
                              <span>{received ? 'Yes' : 'No'}</span>
                            </label>
                          </td>
                        )}
                        {activeTab !== 'refund' && <td>
                          {activeTab === 'orders' && !shipped && (
                            <button
                              className="btn-secondary ship-order-btn"
                              type="button"
                              disabled={updating}
                              onClick={() => updateOrder(
                                order.id,
                                () => adminMarkOrderShipped(order.id),
                                'Order marked shipped and moved to the Shipped tab.'
                              )}
                            >
                              {updating ? 'Updating…' : 'Mark Shipped'}
                            </button>
                          )}
                          {activeTab === 'shipped' && delivered && (
                            <button
                              className="btn-secondary ship-order-btn returned-order-btn"
                              type="button"
                              disabled={updating}
                              onClick={() => updateOrder(
                                order.id,
                                () => adminMarkOrderReturned(order.id),
                                'Order marked returned and moved to the Returned tab.'
                              )}
                            >
                              {updating ? 'Updating…' : 'RETURNED'}
                            </button>
                          )}
                          {activeTab === 'returned' && received && (
                            <div className="return-actions">
                              <button
                                className="btn-secondary ship-order-btn"
                                type="button"
                                disabled={updating}
                                onClick={() => updateOrder(
                                  order.id,
                                  () => adminReshipReturnedOrder(order.id),
                                  'Order shipped again and moved to the Shipped tab.'
                                )}
                              >
                                {updating ? 'Updating…' : 'Ship It Again'}
                              </button>
                              <button
                                className="btn-secondary ship-order-btn refund-order-btn"
                                type="button"
                                disabled={updating}
                                onClick={() => updateOrder(
                                  order.id,
                                  () => adminRefundReturnedOrder(order.id),
                                  'Order refunded and moved to the Refund tab.'
                                )}
                              >
                                {updating ? 'Updating…' : 'Refund'}
                              </button>
                            </div>
                          )}
                        </td>}
                      </tr>
                      {expandedId === order.id && (
                        <tr>
                          <td colSpan={activeTab === 'refund' ? 7 : 8}>
                            <ul className="order-items-list">
                              {(Array.isArray(order.items) ? order.items : []).map((item, idx) => (
                                <li key={idx}>{item.qty} × {item.name} — Rs. {Number(item.price * item.qty).toLocaleString()}.00</li>
                              ))}
                            </ul>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}
