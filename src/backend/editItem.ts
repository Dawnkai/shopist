import sqlite3 from 'sqlite3';

import Item from '../types/Item';

import { dbPath } from './params';

export default async function editItem(editedItem : Item) {

    const db = new sqlite3.Database(dbPath, (err : any) => {
        if (err) {
            console.error(err.message);
        }
    });

    let edited = false;

    try {
        edited = await new Promise((resolve, reject) => {
            db.run("UPDATE Items SET item_unit = ?, item_shop = ?, item_product = ?, item_quantity = ?, item_price = ?, item_date = ? WHERE item_id = ?",
            [editedItem.item_unit, editedItem.item_shop, editedItem.item_product, editedItem.item_quantity, editedItem.item_price, editedItem.item_date, editedItem.item_id],
            function(err : any) {
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
