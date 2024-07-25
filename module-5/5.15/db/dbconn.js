import mongoose from "mongoose";
import dotenv from "dotenv";
import {MONGO_URI, MONGO_DB_NAME} from "../config.js";

dotenv.config();

export async function connectToDatabase() {
    try {
        await mongoose.connect(`${MONGO_URI}/${MONGO_DB_NAME}`, {
            writeConcern: {
                w: 'majority',
            },
        });
        console.log("Connected to the database");
    } catch (err) {
        console.error("Error connecting to the database", err);
        process.exit(1);
    }
}