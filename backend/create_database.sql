CREATE TABLE IF NOT EXISTS Products (
    product_id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_name TEXT NOT NULL,
    product_unit TEXT NOT NULL,
    product_shop TEXT NOT NULL,
    product_price REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS Items (
    item_id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER REFERENCES Products(product_id),
    item_quantity TEXT NOT NULL
);
