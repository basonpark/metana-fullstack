import db from './dbconn.js';

export const getAllUsers = async () => {
    const result = await db.query('SELECT * FROM users');
    return result.rows;
} 

export const getUserById = async (id) => {
    const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
}

export const createUser = async (name, email, role) => {
    const result = await db.query(
        'INSERT INTO users (name, email, role, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *',
        [name, email, role]
    );
    return result.rows[0];
}

export const updateUser = async (id, name, email, role) => {
    const result = await db.query(
        'UPDATE users SET name = $1, email = $2, role = $3, updated_at = NOW() WHERE id = $4 RETURNING *',
        [name, email, role, id]
    );
    return result.rows[0];
}

export const deleteUser = async (id) => {
    const result = await db.query('DELETE FROM users WHERE id = $1', [id]);
    return result.rows[0];
}