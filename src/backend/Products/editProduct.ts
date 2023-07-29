import sqlite3 from 'sqlite3';

import Product from '../../frontend/types/Product';

import { dbPath } from '../params';

export default async function editProduct(editedProduct: Product) {
  const db = new sqlite3.Database(dbPath, (err: any) => {
    if (err) throw new Error(err);
  });

  let edited = false;

  try {
    edited = await new Promise((resolve, reject) => {
      db.run(
        `UPDATE Products SET product_name = ?, product_description = ? 
                    WHERE product_id = ?`,
        [
          editedProduct.product_name,
          editedProduct.product_description,
          editedProduct.product_id,
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
