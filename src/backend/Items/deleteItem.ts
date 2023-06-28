import sqlite3 from 'sqlite3';

import { dbPath } from '../params';

export default async function deleteItem(itemId : number) {

    const db = new sqlite3.Database(dbPath, (err : any) => {
        if (err) {
            console.error(err.message);
        }
    });

    let deleted = false;

    try {
        deleted = await new Promise((resolve, reject) => {
            db.run("DELETE FROM Items WHERE item_id = ?", [itemId], function(err : any) {
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

    return deleted;
}
