import sqlite3 from 'sqlite3';

import Unit from '../../types/Unit';
import { dbPath } from '../params';

export default async function editUnit(editedUnit: Unit) {
  const db = new sqlite3.Database(dbPath, (err: any) => {
    if (err) throw new Error(err);
  });

  let edited = false;

  try {
    edited = await new Promise((resolve, reject) => {
      db.run(
        `UPDATE Units SET unit_display_name = ?, unit_name = ?, unit_num = ? 
                    WHERE unit_id = ?`,
        [
          editedUnit.unit_display_name,
          editedUnit.unit_name,
          editedUnit.unit_num,
          editedUnit.unit_id,
        ],
        (err: any) => {
          if (err) reject(err);
          else resolve(true);
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

  return edited;
}
