import Product from '../types/Product';

export default async function fetchProducts(dbPath : string) {
    const sqlite3 = require("sqlite3").verbose();

    let result : Product[] = [];

    const db = new sqlite3.Database(dbPath, (err : any) => {
        if (err) {
            console.error(err.message);
        }
    });

    try {
        result = await new Promise((resolve, reject) => {
            db.all("SELECT * FROM Products", (err : any, rows : Product[]) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
        return result;
    } catch (err) {
        console.error(err);
    } finally {
        db.close((err : any) => {
            if (err) return console.error(err.message);
        })
    }

    return result;
}