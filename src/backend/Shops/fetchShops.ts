import sqlite3 from 'sqlite3';

import { Shop } from '../../types/Shop';
import { dbPath } from '../params';

export default async function fetchShops() {
  let result: Shop[] = [];

  const db = new sqlite3.Database(dbPath, (err: any) => {
    if (err) {
      throw new Error(err);
    }
  });

  try {
    result = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM Shop', (err: any, rows: Shop[]) => {
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
