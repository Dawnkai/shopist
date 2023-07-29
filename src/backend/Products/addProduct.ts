import sqlite3 from 'sqlite3';

import { Product } from '../../frontend/types/Product';
import { dbPath } from '../params';

export default async function addProduct(newProduct: Product) {
  const db = new sqlite3.Database(dbPath, (err: any) => {
    if (err) {
      throw new Error(err);
    }
  });

  let newId = -1;

  try {
    newId = await new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO Products(product_name, product_description) VALUES(?,?)',
        Object.values(newProduct),
        // eslint-disable-next-line func-names
        function (this: sqlite3.RunResult, err: any) {
          if (err) reject(err);
          else resolve(this.lastID);
        }
      );
    });
  } catch (err: any) {
    throw new Error(err);
  } finally {
    db.close((err: any) => {
      if (err) throw new Error(err);
    });
  }

  return newId;
}
