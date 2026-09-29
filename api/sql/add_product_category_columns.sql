ALTER TABLE products ADD (
  category_id NUMBER,
  sub_category_id NUMBER
);

ALTER TABLE products ADD CONSTRAINT fk_products_category
  FOREIGN KEY (category_id) REFERENCES product_categories (id);

ALTER TABLE products ADD CONSTRAINT fk_products_sub_category
  FOREIGN KEY (sub_category_id) REFERENCES product_sub_categories (id);