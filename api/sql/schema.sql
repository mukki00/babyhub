-- Oracle Autonomous Database schema for Baby Hub

CREATE TABLE admins (
  id            NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username      VARCHAR2(100) UNIQUE NOT NULL,
  password_hash VARCHAR2(255) NOT NULL,
  created_at    TIMESTAMP DEFAULT SYSTIMESTAMP
);

CREATE TABLE products (
  id              NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name            VARCHAR2(255) NOT NULL,
  description     VARCHAR2(2000),
  price           NUMBER(10, 2) NOT NULL,
  image_url       VARCHAR2(1000),
  image_public_id VARCHAR2(255),
  created_at      TIMESTAMP DEFAULT SYSTIMESTAMP
);

CREATE TABLE orders (
  id             NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  order_id       VARCHAR2(32) GENERATED ALWAYS AS (
                   'BH-' || TO_CHAR(created_at, 'YYYYMMDD') || '-' || TO_CHAR(id, 'FM99999999')
                 ) VIRTUAL,
  customer_name  VARCHAR2(255) NOT NULL,
  customer_phone VARCHAR2(50) NOT NULL,
  items          CLOB NOT NULL,       -- JSON array of { productId, name, qty, price }
  total          NUMBER(10, 2),
  status         VARCHAR2(20) DEFAULT 'PENDING',
  paid           NUMBER(1) DEFAULT 0 NOT NULL,
  delivered      NUMBER(1) DEFAULT 0 NOT NULL,
  received       NUMBER(1) DEFAULT 0 NOT NULL,
  created_at     TIMESTAMP DEFAULT SYSTIMESTAMP
);
