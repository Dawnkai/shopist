import sqlite3 from 'sqlite3';

import Unit from '../../types/Unit';

import { dbPath } from '../params';

export default async function addUnit(newUnit: Unit) {
  const db = new sqlite3.Database(dbPath, (err: any) => {
    if (err) throw new Error(err);
  });

  let newId = -1;

  try {
    newId = await new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO Units(unit_display_name, unit_name, unit_num) VALUES(?,?,?)',
        Object.values(newUnit),
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
