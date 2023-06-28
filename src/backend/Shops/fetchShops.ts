import Shop from '../../types/Shop';

import { dbPath } from '../params';

export default async function fetchShops() {
    const sqlite3 = require("sqlite3").verbose();

    let result : Shop[] = [];

    const db = new sqlite3.Database(dbPath, (err : any) => {
        if (err) {
            console.error(err.message);
        }
    });

    try {
        result = await new Promise((resolve, reject) => {
            db.all("SELECT * FROM Shops", (err : any, rows : Shop[]) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
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

    return result;
}
