import sqlite3
from csv import reader

# Database filepath
DATABASE_FILE = '../database.db'
# Input data, please provide filepath in 'file' and table name to insert data from file to as 'table'
INPUT = [
    {
        'file': 'units.csv',
        'table': 'Unit'
    },
    {
        'file': 'shops.csv',
        'table': 'Shop'
    },
    {
        'file': 'products.csv',
        'table': 'Product'
    },
    {
        'file': 'items.csv',
        'table': 'Item'
    }
]
# Delimiter separating values in csv files
DELIMITER = ';'

conn = sqlite3.connect(DATABASE_FILE)
cur = conn.cursor()
for data in INPUT:
    with open(data['file'], encoding='utf-8') as script_file:
        content = reader(script_file, delimiter=DELIMITER)
        header = next(content)

        for row in content:
            cur.execute(
                f"INSERT OR REPLACE INTO {data['table']} ({','.join(header)}) VALUES ({','.join(row)});"
            )
conn.commit()

cur.close()
conn.close()
