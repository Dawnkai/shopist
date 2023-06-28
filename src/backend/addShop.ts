import sqlite3 from 'sqlite3';

import Shop from '../types/Shop';

import { dbPath } from './params';

export default async function addShop(newShop : Shop) {

    const db = new sqlite3.Database(dbPath, (err : any) => {
        if (err) {
            console.error(err.message);
        }
    });

    let newId = -1;

    try {
        newId = await new Promise((resolve, reject) => {
            db.run("INSERT INTO Shops(shop_display_name, shop_name, shop_description, shop_address) VALUES(?,?,?,?)",
            Object.values(newShop), function(this: sqlite3.RunResult, err : any) {
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
