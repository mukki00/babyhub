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
  adminUpdateOrder,
  adminDeleteOrder,
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
  const [confirmation, setConfirmation] = useState(null);
  const [secondsRemaining, setSecondsRemaining] = useState(10);
  const [editingOrder, setEditingOrder] = useState(null);
  const [editSaving, setEditSaving] = useState(false);
  const [editError, setEditError] = useState('');

  useEffect(() => {
    adminListOrders()
      .then((data) => {
        setOrders(data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  useEffect(() => {
    if (confirmation?.phase !== 'countdown') return undefined;

    const deadline = Date.now() + 10000;
    const timer = window.setInterval(() => {
      const seconds = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setSecondsRemaining(seconds);
      if (seconds === 0) {
        window.clearInterval(timer);
        setConfirmation(null);
        updateOrder(confirmation.orderId, confirmation.request, confirmation.successMessage);
      }
    }, 100);

    return () => window.clearInterval(timer);
  }, [confirmation?.phase]);

  const activeOrders = orders.filter((order) => order.status?.toUpperCase() === 'PENDING');
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
      if (updatedOrder) {
        setOrders((current) => current.map((order) => (
          String(order.id) === String(updatedOrder.id) ? updatedOrder : order
        )));
      } else {
        setOrders((current) => current.filter((order) => String(order.id) !== String(orderId)));
      }
      setActionMessage(message);
    } catch {
      setActionError('Could not update the order. Please try again.');
    } finally {
      setUpdatingId(null);
    }
  }

  function askForConfirmation(orderId, orderNumber, title, message, request, successMessage) {
    setConfirmation({ orderId, orderNumber, title, message, request, successMessage, phase: 'confirm' });
    setSecondsRemaining(10);
  }

  function beginCountdown() {
    setSecondsRemaining(10);
    setConfirmation((current) => current ? { ...current, phase: 'countdown' } : current);
  }

  function openEditOrder(order) {
    setEditError('');
    setEditingOrder({
      id: order.id,
      orderNumber: order.order_id,
      customerName: order.customer_name,
      customerPhone: order.customer_phone,
      items: (Array.isArray(order.items) ? order.items : []).map((item) => ({ ...item })),
    });
  }

  function closeEditOrder() {
    setEditingOrder(null);
    setEditError('');
  }

  function updateEditItem(index, field, value) {
    setEditingOrder((current) => ({
      ...current,
      items: current.items.map((item, idx) => (idx === index ? { ...item, [field]: value } : item)),
    }));
  }

  function removeEditItem(index) {
    setEditingOrder((current) => ({
      ...current,
      items: current.items.filter((_, idx) => idx !== index),
    }));
  }

  function editTotal(order) {
    return order.items.reduce((sum, item) => sum + Number(item.qty || 0) * Number(item.price || 0), 0);
  }

  async function saveEditOrder() {
    const { id, customerName, customerPhone, items } = editingOrder;
    if (!customerName.trim() || !customerPhone.trim()) {
      setEditError('Customer name and phone are required.');
      return;
    }
    if (items.length === 0 || items.some((item) => Number(item.qty) <= 0 || Number(item.price) < 0)) {
      setEditError('Each item needs a quantity above 0 and a valid price.');
      return;
    }
    setEditSaving(true);
    setEditError('');
    try {
      const updatedOrder = await adminUpdateOrder(id, {
        customerName,
        customerPhone,
        items,
        total: editTotal(editingOrder),
      });
      setOrders((current) => current.map((order) => (
        String(order.id) === String(updatedOrder.id) ? updatedOrder : order
      )));
      setActionMessage('Order details updated.');
      setEditingOrder(null);
    } catch {
      setEditError('Could not save changes. Please try again.');
    } finally {
      setEditSaving(false);
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
                  <th aria-label="Order items"></th><th>Order ID</th><th>Date</th><th>Customer</th><th>Phone</th>
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
                        <td><span className="order-reference">{order.order_id}</span></td>
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
                            <>
                              <button
                                className="icon-action-btn edit-icon-btn"
                                type="button"
                                disabled={updating}
                                aria-label={`Edit ${order.customer_name}'s order`}
                                title="Edit order"
                                onClick={() => openEditOrder(order)}
                              >
                                <svg viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4z"/></svg>
                              </button>
                              <button
                                className="icon-action-btn delete-icon-btn"
                                type="button"
                                disabled={updating}
                                aria-label={`Delete ${order.customer_name}'s order`}
                                title="Delete order"
                                onClick={() => askForConfirmation(
                                  order.id,
                                  order.order_id,
                                  'Delete this order?',
                                  'This will permanently remove the order. This action cannot be undone.',
                                  () => adminDeleteOrder(order.id),
                                  'Order deleted.'
                                )}
                              >
                                <svg viewBox="0 0 24 24"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                              </button>
                              <button
                                className="btn-secondary ship-order-btn"
                                type="button"
                                disabled={updating}
                                onClick={() => askForConfirmation(
                                  order.id,
                                  order.order_id,
                                  'Mark this order shipped?',
                                  'Please make sure payment is completed. Once shipped, we cannot undo the action.',
                                  () => adminMarkOrderShipped(order.id),
                                  'Order marked shipped and moved to the Shipped tab.'
                                )}
                              >
                                {updating ? 'Updating…' : 'Mark Shipped'}
                              </button>
                            </>
                          )}
                          {activeTab === 'shipped' && delivered && (
                            <button
                              className="btn-secondary ship-order-btn returned-order-btn"
                              type="button"
                              disabled={updating}
                              onClick={() => askForConfirmation(
                                order.id,
                                order.order_id,
                                'Mark this order returned?',
                                'Please make sure the item(s) have been returned. Once returned, we cannot undo the action.',
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
                                onClick={() => askForConfirmation(
                                  order.id,
                                  order.order_id,
                                  'Ship this order again?',
                                  'Do you want to ship it again? Once shipped, we cannot undo the action.',
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
                                onClick={() => askForConfirmation(
                                  order.id,
                                  order.order_id,
                                  'Refund this payment?',
                                  'Do you want to refund the payment? Once it is refunded, we cannot undo the action.',
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
                          <td colSpan={activeTab === 'refund' ? 8 : 9}>
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

      {editingOrder && (
        <div className="confirm-overlay">
          <section
            className="confirm-dialog edit-order-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-order-title"
          >
            <h2 id="edit-order-title">Edit Order</h2>
            <p className="confirm-order-number">Order ID: <strong>{editingOrder.orderNumber}</strong></p>

            <div className="form-grp">
              <label>Customer Name</label>
              <input
                type="text"
                value={editingOrder.customerName}
                onChange={(e) => setEditingOrder((current) => ({ ...current, customerName: e.target.value }))}
              />
            </div>
            <div className="form-grp">
              <label>Phone Number</label>
              <input
                type="tel"
                value={editingOrder.customerPhone}
                onChange={(e) => setEditingOrder((current) => ({ ...current, customerPhone: e.target.value }))}
              />
            </div>

            <label>Items</label>
            <div className="edit-items-list">
              {editingOrder.items.map((item, idx) => (
                <div className="edit-item-row" key={idx}>
                  <span className="edit-item-name">{item.name}</span>
                  <input
                    type="number"
                    min="1"
                    className="edit-item-qty"
                    value={item.qty}
                    onChange={(e) => updateEditItem(idx, 'qty', e.target.value)}
                  />
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className="edit-item-price"
                    value={item.price}
                    onChange={(e) => updateEditItem(idx, 'price', e.target.value)}
                  />
                  <button
                    type="button"
                    className="edit-item-remove"
                    aria-label={`Remove ${item.name || 'item'}`}
                    onClick={() => removeEditItem(idx)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <p className="edit-order-total">Total: Rs. {editTotal(editingOrder).toLocaleString()}.00</p>

            {editError && <p className="form-error" role="alert">{editError}</p>}

            <div className="confirm-actions">
              <button className="btn-secondary" type="button" onClick={closeEditOrder} disabled={editSaving}>
                Cancel
              </button>
              <button className="btn-primary confirm-yes" type="button" onClick={saveEditOrder} disabled={editSaving}>
                {editSaving ? 'Saving…' : 'Save Changes'}
              </button>
            </div>
          </section>
        </div>
      )}

      {confirmation && (
        <div className="confirm-overlay">
          <section
            className="confirm-dialog"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="order-confirm-title"
            aria-describedby="order-confirm-message"
          >
            <h2 id="order-confirm-title">{confirmation.title}</h2>
            <p className="confirm-order-number">Order ID: <strong>{confirmation.orderNumber}</strong></p>
            <p id="order-confirm-message">{confirmation.message}</p>
            {confirmation.phase === 'countdown' ? (
              <>
                <p className="confirm-countdown" role="timer" aria-live="off">
                  Action will proceed in <strong>{secondsRemaining}</strong> seconds.
                </p>
                <div className="confirm-actions">
                  <button
                    className="btn-secondary confirm-cancel"
                    type="button"
                    onClick={() => setConfirmation(null)}
                  >
                    Cancel action
                  </button>
                </div>
              </>
            ) : (
              <div className="confirm-actions">
                <button className="btn-secondary" type="button" onClick={() => setConfirmation(null)}>
                  Cancel
                </button>
                <button className="btn-primary confirm-yes" type="button" onClick={beginCountdown}>
                  Yes
                </button>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
