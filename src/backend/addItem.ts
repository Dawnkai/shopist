import sqlite3 from 'sqlite3';

import Item from '../types/Item';

import { dbPath } from './params';

export default async function addItem(newItem : Item) {

    const db = new sqlite3.Database(dbPath, (err : any) => {
        if (err) {
            console.error(err.message);
        }
    });

    let newId = -1;

    try {
        newId = await new Promise((resolve, reject) => {
            db.run("INSERT INTO Items(item_unit, item_shop, item_product, item_quantity, item_price, item_date) VALUES(?,?,?,?,?,?)",
            [newItem.item_unit, newItem.item_shop, newItem.item_product, newItem.item_quantity, newItem.item_price, newItem.item_date],
            function(this: sqlite3.RunResult, err : any) {
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
