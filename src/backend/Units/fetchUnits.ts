import Unit from '../../types/Unit';

import { dbPath } from '../params';

export default async function fetchUnits() {
    const sqlite3 = require("sqlite3").verbose();

    let result : Unit[] = [];

    const db = new sqlite3.Database(dbPath, (err : any) => {
        if (err) {
            console.error(err.message);
        }
    });

    try {
        result = await new Promise((resolve, reject) => {
            db.all("SELECT * FROM Units", (err : any, rows : Unit[]) => {
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
