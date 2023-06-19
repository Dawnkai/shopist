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

    def get_items(self) -> list:
        with SqliteContext(self.dbpath) as [conn, cur]:
            cur.execute("SELECT i.item_id, p.product_name, i.item_quantity, p.product_unit, p.product_shop, p.product_price"
                        " FROM Items i, Products p WHERE i.product_id = p.product_id")
            result = []
            for row in cur.fetchall():
                result.append(dict(zip(["id", "name", "quantity", "unit", "shop", "price"], row)))
            return result
