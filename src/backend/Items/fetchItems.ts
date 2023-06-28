import Item from '../../types/Item';

import { dbPath } from '../params';

export default async function fetchitems() {
    const sqlite3 = require("sqlite3").verbose();

    let result : Item[] = [];

    const db = new sqlite3.Database(dbPath, (err : any) => {
        if (err) {
            console.error(err.message);
        }
    });

    try {
        result = await new Promise((resolve, reject) => {
            db.all(`
            SELECT 
                i.item_id, i.item_quantity, i.item_price, i.item_product, p.product_name,
                i.item_unit, u.unit_display_name, i.item_shop, s.shop_display_name 
            FROM Items i, Products p, Units u, Shops s 
            WHERE i.item_product = p.product_id 
            AND i.item_unit = u.unit_id 
            AND i.item_shop = s.shop_id`,
            (err : any, rows : Item[]) => {
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
