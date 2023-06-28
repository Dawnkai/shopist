import sqlite3 from 'sqlite3';

import Product from '../types/Product';

import { dbPath } from './params';

export default async function editProduct(editedProduct : Product) {

    const db = new sqlite3.Database(dbPath, (err : any) => {
        if (err) {
            console.error(err.message);
        }
    });

    let edited = false;

    try {
        edited = await new Promise((resolve, reject) => {
            db.run("UPDATE Products SET product_name = ?, product_description = ? WHERE product_id = ?",
            [editedProduct.product_name, editedProduct.product_description, editedProduct.product_id], function(err : any) {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    } catch (err) {
        console.error(err);
    } finally {
        db.close((err : any) => {
            if (err) return console.error(err.message);
        })
    }

    return edited;
}
