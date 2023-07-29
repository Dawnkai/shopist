import sqlite3 from 'sqlite3';

import Item from '../../frontend/types/Item';
import { dbPath } from '../params';

export default async function addItem(newItem: Item) {
  const db = new sqlite3.Database(dbPath, (err: any) => {
    if (err) {
      throw new Error(err);
    }
  });

  let newId = -1;

  try {
    newId = await new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO 
                    Items(item_unit, item_shop, item_product, item_quantity, item_price, item_date)
                     VALUES(?,?,?,?,?,?)`,
        [
          newItem.item_unit,
          newItem.item_shop,
          newItem.item_product,
          newItem.item_quantity,
          newItem.item_price,
          newItem.item_date,
        ],
        // eslint-disable-next-line func-names
        function (this: sqlite3.RunResult, err: any) {
          if (err) {
            reject(err);
          } else {
            resolve(this.lastID);
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

  return newId;
}
