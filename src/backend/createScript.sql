CREATE TABLE IF NOT EXISTS Unit (
    unitId INTEGER PRIMARY KEY AUTOINCREMENT,
    unitDisplayName TEXT NOT NULL UNIQUE,
    unitName TEXT NOT NULL,
    unitNum REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS Shop (
    shopId INTEGER PRIMARY KEY AUTOINCREMENT,
    shopDisplayName TEXT NOT NULL UNIQUE,
    shopName TEXT NOT NULL,
    shopDescription TEXT NULL,
    shopAddress TEXT NULL
);

CREATE TABLE IF NOT EXISTS Product (
    productId INTEGER PRIMARY KEY AUTOINCREMENT,
    productName TEXT NOT NULL,
    productDescription TEXT NULL
);

CREATE TABLE IF NOT EXISTS Item (
    itemId INTEGER PRIMARY KEY AUTOINCREMENT,
    itemUnit INTEGER REFERENCES Units(unit_id),
    itemShop INTEGER REFERENCES Shops(shop_id),
    itemProduct INTEGER REFERENCES Product(product_id),
    itemQuantity REAL NOT NULL,
    itemPrice REAL NOT NULL,
    itemDate TEXT NULL
);
