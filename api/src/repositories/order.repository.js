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
        `SELECT id, customer_name, customer_phone, items, total, status, created_at
         FROM orders
         ORDER BY created_at DESC`
      );
      return normalizeRows(result.rows).map(parseItems);
    });
  },

  async findById(id) {
    return withConnection(async (conn) => {
      const result = await conn.execute(
        `SELECT id, customer_name, customer_phone, items, total, status, created_at
         FROM orders
         WHERE id = :id`,
        { id }
      );
      const row = normalizeRow(result.rows[0]);
      return row ? parseItems(row) : null;
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
