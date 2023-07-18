import sqlite3 from 'sqlite3';

import Shop from '../../types/Shop';
import { dbPath } from '../params';

export default async function editShop(editedShop: Shop) {
  const db = new sqlite3.Database(dbPath, (err: any) => {
    if (err) throw new Error(err);
  });

  let edited = false;

  try {
    edited = await new Promise((resolve, reject) => {
      db.run(
        `UPDATE Shops SET 
                    shop_display_name = ?,
                    shop_name = ?,
                    shop_description = ?,
                    shop_address = ? 
                    WHERE shop_id = ?`,
        [
          editedShop.shop_display_name,
          editedShop.shop_name,
          editedShop.shop_description,
          editedShop.shop_address,
          editedShop.shop_id,
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
