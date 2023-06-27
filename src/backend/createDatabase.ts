export default function createDatabase(dbPath : string) {
    const sqlite3 = require("sqlite3").verbose();
    const fs = require("fs");

    const db = new sqlite3.Database(dbPath, (err : any) => {
        if (err) {
            console.error(err.message);
        }
    });

    const creationSql = fs.readFileSync("./src/backend/createScript.sql").toString();
    
    db.serialize(() => {
        db.run("BEGIN TRANSACTION;");
        db.run(creationSql.toString());
        db.run("COMMIT;");
    });

    db.close((err : any) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Database created.")
    });
}
