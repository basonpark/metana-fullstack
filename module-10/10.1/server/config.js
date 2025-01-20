// Config settings for the app
import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3001;
export const MONGO_URI = process.env.MONGO_URI;
// export const MONGO_DB_NAME = process.env.MONGO_DB_NAME;

export const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_not_for_production';