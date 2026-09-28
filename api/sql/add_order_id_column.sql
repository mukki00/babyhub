-- Adds a human-readable order_id (e.g. BH-20260928-9) derived from the existing id + created_at.
ALTER TABLE orders ADD (
  order_id VARCHAR2(32) GENERATED ALWAYS AS (
    'BH-' || TO_CHAR(created_at, 'YYYYMMDD') || '-' || TO_CHAR(id, 'FM99999999')
  ) VIRTUAL
);
