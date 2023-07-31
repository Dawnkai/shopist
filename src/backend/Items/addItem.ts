import sqlite3 from 'sqlite3';

import { Item } from '../../types/Item';
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
                    Item(itemUnit, itemShop, itemProduct, itemQuantity, itemPrice, itemDate)
                     VALUES(?,?,?,?,?,?)`,
        [
          newItem.itemUnitId,
          newItem.itemShopId,
          newItem.itemProductId,
          newItem.itemQuantity,
          newItem.itemPrice,
          newItem.itemDate,
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
