import fs from 'fs';
import path from 'path';
import db from '../db/dbconn.js';

const sqlFilePath = path.resolve('scripts', 'setup-db.sql');

fs.readFile(sqlFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error("Failed to read SQL file:", err);
        return;
    }

    db.query(data)
        .then(() => {
            console.log("Database initialized successfully");
        })
        .catch((queryErr) => {
            console.log("Failed to initialize database:", queryErr);
        })
        .finally(() => {
            db.end();
        });
}); 