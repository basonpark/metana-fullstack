import pg from "pg";
import {POSTGRES_URL} from "../config.js";

console.log(`=== debug: POSTGRES_URL: ${POSTGRES_URL}`);

const db = new pg.Pool({
    connectionString: POSTGRES_URL,
});

//testing connection
db.connect((err, client, release) => {
    console.log(`=== debug: connected to postgres`);
    if (err) {
        console.error("Failed to connect to database:", err);
    } else {
        console.log("Connected to database");
        release();
    }
})

export default db;
