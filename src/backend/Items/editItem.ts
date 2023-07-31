import sqlite3 from 'sqlite3';

import { Item } from '../../types/Item';
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
          itemUnit = ?,
          itemShop = ?,
          itemProduct = ?,
          itemQuantity = ?,
          itemPrice = ?,
          itemDate = ?
        WHERE itemId = ?`,
        [
          editedItem.itemUnitId,
          editedItem.itemShopId,
          editedItem.itemProductId,
          editedItem.itemQuantity,
          editedItem.itemPrice,
          editedItem.itemDate,
          editedItem.itemId,
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
