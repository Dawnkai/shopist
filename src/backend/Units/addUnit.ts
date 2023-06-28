import sqlite3 from 'sqlite3';

import Unit from '../../types/Unit';

import { dbPath } from '../params';

export default async function addUnit(newUnit : Unit) {

    const db = new sqlite3.Database(dbPath, (err : any) => {
        if (err) {
            console.error(err.message);
        }
    });

    let newId = -1;

    try {
        newId = await new Promise((resolve, reject) => {
            db.run("INSERT INTO Units(unit_display_name, unit_name, unit_num) VALUES(?,?,?)",
                Object.values(newUnit), function(this: sqlite3.RunResult, err : any) {
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
