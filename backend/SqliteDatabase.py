import sqlite3

class SqliteContext:
    def __init__(self, dbpath : str) -> None:
        self.dbpath = dbpath
    
    def __enter__(self):
        try:
            self.conn = sqlite3.connect(self.dbpath)
            if not self.conn:
                raise Exception("Unable to connect to database, check connection parameters.")
            self.cursor = self.conn.cursor()
            return [self.conn, self.cursor]
        except sqlite3.Error as error:
            raise Exception(f"Unable to connect to database, error: {error}")
    
    def __exit__(self, type, value, callback):
        self.cursor.close()
        self.conn.close()
    
class SqliteDatabase:
    def __init__(self, dbpath : str) -> None:
        self.dbpath = dbpath
    
    def execute_script(self, script_path : str) -> None:
        with SqliteContext(self.dbpath) as [conn, cur]:
            with open(script_path) as script:
                cur.executescript(script.read())
            conn.commit()
    
    def get_update_query(self, table : str, fields : list, data : dict, id_field : str):
        values = []
        update_query = f"UPDATE {table} SET "
        for field in fields:
            if field != id_field:
                update_query += f"{field} = ?,"
                values.append(data[field])
        update_query = update_query[:-1] + f" WHERE {id_field} = ?"
        values.append(data[id_field])
        return update_query, values

    def get_insert_query(self, table : str, fields : list, data : dict):
        values = []
        insert_query = f"INSERT INTO {table} ("
        for field in fields:
            insert_query += f"{field},"
            values.append(data[field])
        insert_query = f"{insert_query[:-1]}) VALUES ({'?,' * (len(values)-1)}?)"
        return insert_query, values

    def get_items(self) -> list:
        with SqliteContext(self.dbpath) as [_, cur]:
            cur.execute("SELECT i.item_id, i.item_quantity, i.item_price, i.item_product, p.product_name, "
                        "i.item_unit, u.unit_display_name, i.item_shop, s.shop_display_name "
                        "FROM Items i, Products p, Units u, Shops s "
                        "WHERE i.item_product = p.product_id AND i.item_unit = u.unit_id "
                        "AND i.item_shop = s.shop_id")
            result = []
            for row in cur.fetchall():
                result.append(dict(zip([
                    "item_id", "item_quantity", "item_price", "item_product",
                    "product_name", "item_unit", "unit_name", "item_shop", "shop_name"
                ], row)))
            return result

    def get_shops(self) -> list:
        with SqliteContext(self.dbpath) as [_, cur]:
            cur.execute("SELECT * FROM Shops")
            result = []
            for row in cur.fetchall():
                result.append(dict(zip(["shop_id", "shop_display_name", "shop_name",
                                        "shop_description", "shop_address"], row)))
            return result
    
    def add_shop(self, shop_data : dict) -> list:
        fields = ["shop_display_name", "shop_name", "shop_description", "shop_address"]
        with SqliteContext(self.dbpath) as [conn, cur]:
            query, values = self.get_insert_query("Shops", fields, shop_data)
            cur.execute(query, values)
            conn.commit()
        return self.get_shops()
    
    def edit_shop(self, shop_id : int, shop_data : dict) -> list:
        fields = ["shop_id", "shop_display_name", "shop_name", "shop_description",
                  "shop_address"]
        shop_data["shop_id"] = shop_id
        with SqliteContext(self.dbpath) as [conn, cur]:
            query, values = self.get_update_query("Shops", fields, shop_data, "shop_id")
            cur.execute(query, values)
            conn.commit()
        return self.get_shops()
    
    def delete_shop(self, shop_id : int) -> bool:
        with SqliteContext(self.dbpath) as [conn, cur]:
            cur.execute("DELETE FROM Shops WHERE shop_id = ?", [shop_id])
            conn.commit()
        return True

    def get_units(self) -> list:
        with SqliteContext(self.dbpath) as [_, cur]:
            cur.execute("SELECT unit_id, unit_display_name FROM Units")
            result = []
            for row in cur.fetchall():
                result.append(dict(zip(["id", "name"], row)))
            return result
    
    def get_products(self) -> list:
        with SqliteContext(self.dbpath) as [_, cur]:
            cur.execute("SELECT product_id, product_name FROM Products")
            result = []
            for row in cur.fetchall():
                result.append(dict(zip(["id", "name"], row)))
            return result
    
    def edit_item(self, item_id : int, item_data : dict) -> list:
        fields = ["item_id", "item_price", "item_product", "item_quantity", "item_shop", "item_unit"]
        item_data["item_id"] = item_id
        with SqliteContext(self.dbpath) as [conn, cur]:
            query, values = self.get_update_query("Items", fields, item_data, "item_id")
            cur.execute(query, values)
            conn.commit()
        return self.get_items()
    
    def add_item(self, item_data : dict) -> list:
        fields = ["item_price", "item_product", "item_quantity", "item_shop", "item_unit"]
        with SqliteContext(self.dbpath) as [conn, cur]:
            query, values = self.get_insert_query("Items", fields, item_data)
            cur.execute(query, values)
            conn.commit()
        return self.get_items()
    
    def delete_item(self, item_id : int) -> bool:
        with SqliteContext(self.dbpath) as [conn, cur]:
            cur.execute("DELETE FROM Items WHERE item_id = ?", [item_id])
            conn.commit()
        return True
