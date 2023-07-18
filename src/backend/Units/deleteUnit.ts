import sqlite3 from 'sqlite3';

import { dbPath } from '../params';

export default async function deleteUnit(unitId: number) {
  const db = new sqlite3.Database(dbPath, (err: any) => {
    if (err) throw new Error(err);
  });

  let deleted = false;

  try {
    deleted = await new Promise((resolve, reject) => {
      db.run('DELETE FROM Units WHERE unit_id = ?', [unitId], (err: any) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  } catch (err: any) {
    throw new Error(err);
  } finally {
    db.close((err: any) => {
      if (err) throw new Error(err);
    });
  }

  return deleted;
}
