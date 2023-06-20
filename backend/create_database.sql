CREATE TABLE IF NOT EXISTS Units (
    unit_id INTEGER PRIMARY KEY AUTOINCREMENT,
    unit_display_name TEXT NOT NULL UNIQUE,
    unit_name TEXT NOT NULL,
    unit_num REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS Shops (
    shop_id INTEGER PRIMARY KEY AUTOINCREMENT,
    shop_display_name TEXT NOT NULL UNIQUE,
    shop_name TEXT NOT NULL,
    shop_description TEXT NULL,
    shop_address TEXT NULL
);

CREATE TABLE IF NOT EXISTS Products (
    product_id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_name TEXT NOT NULL,
    product_description TEXT NULL
);

CREATE TABLE IF NOT EXISTS Items (
    item_id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_unit INTEGER REFERENCES Units(unit_id),
    item_shop INTEGER REFERENCES Shops(shop_id),
    item_product INTEGER REFERENCES Product(product_id),
    item_quantity REAL NOT NULL,
    item_price REAL NOT NULL,
    item_date TEXT NULL
);
