import sqlite3 from 'sqlite3';

import Unit from '../../types/Unit';

import { dbPath } from '../params';

export default async function editUnit(editedUnit : Unit) {

    const db = new sqlite3.Database(dbPath, (err : any) => {
        if (err) {
            console.error(err.message);
        }
    });

    let edited = false;

    try {
        edited = await new Promise((resolve, reject) => {
            db.run(`UPDATE Units SET unit_display_name = ?, unit_name = ?, unit_num = ? 
                    WHERE unit_id = ?`,
            [editedUnit.unit_display_name, editedUnit.unit_name, editedUnit.unit_num,
            editedUnit.unit_id], function(err : any) {
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
