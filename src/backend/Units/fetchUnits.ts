import sqlite3 from 'sqlite3';

import Unit from '../../frontend/types/Unit';
import { dbPath } from '../params';

export default async function fetchUnits() {
  let result: Unit[] = [];

  const db = new sqlite3.Database(dbPath, (err: any) => {
    if (err) throw new Error(err);
  });

  try {
    result = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM Units', (err: any, rows: Unit[]) => {
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
