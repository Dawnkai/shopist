import sqlite3 from 'sqlite3';

import { Item } from '../../types/Item';
import { dbPath } from '../params';

export default async function fetchitems() {
  let result: Item[] = [];

  const db = new sqlite3.Database(dbPath, (err: any) => {
    if (err) throw new Error(err.message);
  });

  try {
    result = await new Promise((resolve, reject) => {
      db.all(
        `
            SELECT 
                i.itemId, i.itemQuantity, i.itemPrice, i.itemProduct,
                p.productName as itemProductName, i.itemUnit,
                u.unitDisplayName as itemUnitDisplayName, i.itemShop,
                s.shopDisplayName as itemShopDisplayName, i.itemDate
            FROM Item i, Product p, Unit u, Shop s 
            WHERE i.itemProduct = p.productId 
            AND i.itemUnit = u.unitId
            AND i.itemShop = s.shopId
            ORDER BY i.itemDate NULLS LAST`,
        (err: any, rows: Item[]) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
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

  return result;
}
