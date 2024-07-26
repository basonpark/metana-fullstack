//config settings for the app
import dotenv from 'dotenv';
import 'dotenv/config';

export const PORT = process.env.PORT || 3001;
export const MONGO_URI = process.env.MONGO_URI;
export const MONGO_DB_NAME = process.env.MONGO_DB_NAME;

export const POSTGRES_URL = process.env.POSTGRES_URL;
export const PGSUER = process.env.PGSUER;
export const PGPASSWORD = process.env.PGPASSWORD;
export const PGHOST = process.env.PGHOST;
export const PGPORT = process.env.PGPORT;
export const PGDATABASE = process.env.PGDATABASE;
export const PGSSLMODE = process.env.PGSSLMODE;