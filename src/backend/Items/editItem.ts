import sqlite3 from 'sqlite3';

import Item from '../../frontend/types/Item';
import { dbPath } from '../params';

export default async function editItem(editedItem: Item) {
  const db = new sqlite3.Database(dbPath, (err: any) => {
    if (err) throw new Error(err);
  });

  let edited = false;

  try {
    edited = await new Promise((resolve, reject) => {
      db.run(
        `UPDATE Items SET
                    item_unit = ?,
                    item_shop = ?,
                    item_product = ?,
                    item_quantity = ?,
                    item_price = ?,
                    item_date = ?
                    WHERE item_id = ?`,
        [
          editedItem.item_unit,
          editedItem.item_shop,
          editedItem.item_product,
          editedItem.item_quantity,
          editedItem.item_price,
          editedItem.item_date,
          editedItem.item_id,
        ],
        (err: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(true);
          }
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
