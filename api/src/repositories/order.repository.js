const oracledb = require('oracledb');
const { withConnection } = require('../config/db');
const { normalizeRow, normalizeRows } = require('../utils/normalizeRow');

// Orders are persisted for record-keeping; the actual confirmation happens over WhatsApp.
const orderRepository = {
  async create({ customerName, customerPhone, items, total }) {
    return withConnection(async (conn) => {
      const result = await conn.execute(
        `INSERT INTO orders (customer_name, customer_phone, items, total, status)
         VALUES (:customerName, :customerPhone, :items, :total, 'PENDING')
         RETURNING id INTO :id`,
        {
          customerName,
          customerPhone,
          items: JSON.stringify(items),
          total,
          id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
        }
      );
      return result.outBinds.id[0];
    });
  },

  async findAll() {
    return withConnection(async (conn) => {
      const result = await conn.execute(
        `SELECT id, order_id, customer_name, customer_phone, items, total, status, paid, delivered, received, created_at
         FROM orders
         ORDER BY created_at DESC`
      );
      return normalizeRows(result.rows).map(parseItems);
    });
  },

  async findById(id) {
    return withConnection(async (conn) => {
      const result = await conn.execute(
        `SELECT id, order_id, customer_name, customer_phone, items, total, status, paid, delivered, received, created_at
         FROM orders
         WHERE id = :id`,
        { id }
      );
      const row = normalizeRow(result.rows[0]);
      return row ? parseItems(row) : null;
    });
  },

  async markShipped(id) {
    return withConnection(async (conn) => {
      const result = await conn.execute(
        `UPDATE orders SET status = 'SHIPPED', delivered = 1 WHERE id = :id`,
        { id }
      );
      return result.rowsAffected > 0;
    });
  },

  async setDelivered(id, delivered) {
    return withConnection(async (conn) => {
      const result = await conn.execute(
        `UPDATE orders SET delivered = :delivered WHERE id = :id`,
        { id, delivered: delivered ? 1 : 0 }
      );
      return result.rowsAffected > 0;
    });
  },

  async setPaid(id, paid) {
    return withConnection(async (conn) => {
      const result = await conn.execute(
        `UPDATE orders SET paid = :paid
         WHERE id = :id AND status = 'REFUNDED'`,
        { id, paid: paid ? 1 : 0 }
      );
      return result.rowsAffected > 0;
    });
  },

  async markReturned(id) {
    return withConnection(async (conn) => {
      const result = await conn.execute(
        `UPDATE orders
         SET status = 'RETURNED'
         WHERE id = :id AND status = 'SHIPPED' AND delivered = 1`,
        { id }
      );
      return result.rowsAffected > 0;
    });
  },

  async setReceived(id, received) {
    return withConnection(async (conn) => {
      const result = await conn.execute(
        `UPDATE orders SET received = :received
         WHERE id = :id AND status = 'RETURNED'`,
        { id, received: received ? 1 : 0 }
      );
      return result.rowsAffected > 0;
    });
  },

  async reshipReturned(id) {
    return withConnection(async (conn) => {
      const result = await conn.execute(
        `UPDATE orders
         SET status = 'SHIPPED', delivered = 0, received = 0
         WHERE id = :id AND status = 'RETURNED' AND received = 1`,
        { id }
      );
      return result.rowsAffected > 0;
    });
  },

  async refundReturned(id) {
    return withConnection(async (conn) => {
      const result = await conn.execute(
        `UPDATE orders SET status = 'REFUNDED'
         WHERE id = :id AND status = 'RETURNED' AND received = 1`,
        { id }
      );
      return result.rowsAffected > 0;
    });
  },
};

function parseItems(row) {
  if (typeof row.items !== 'string') return row;
  try {
    return { ...row, items: JSON.parse(row.items) };
  } catch {
    return row;
  }
}

module.exports = orderRepository;
