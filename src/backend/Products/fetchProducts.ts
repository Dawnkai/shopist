import sqlite3 from 'sqlite3';

import Product from '../../frontend/types/Product';
import { dbPath } from '../params';

export default async function fetchProducts() {
  let result: Product[] = [];

  const db = new sqlite3.Database(dbPath, (err: any) => {
    if (err) {
      throw new Error(err);
    }
  });

  try {
    result = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM Products', (err: any, rows: Product[]) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  } catch (err: any) {
    throw new Error(err);
  } finally {
    db.close((err: any) => {
      if (err) throw new Error(err);
    });
  }

  return result;
}
