import sqlite3 from 'sqlite3';

import Product from '../../types/Product';

import { dbPath } from '../params';

export default async function addProduct(newProduct : Product) {

    const db = new sqlite3.Database(dbPath, (err : any) => {
        if (err) {
            console.error(err.message);
        }
    });

    let newId = -1;

    try {
        newId = await new Promise((resolve, reject) => {
            db.run("INSERT INTO Products(product_name, product_description) VALUES(?,?)",
            Object.values(newProduct), function(this: sqlite3.RunResult, err : any) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
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

    return newId;
}
