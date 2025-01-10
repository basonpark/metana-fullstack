import db from './dbconn.js';

export const getAllBlogs = async () => {
    const result = await db.query('SELECT * FROM blogs');
    return result.rows;
}

export const getBlogById = async (id) => {
    const result = await db.query('SELECT * FROM blogs WHERE id = $1', [id]);
    return result.rows[0];
}

export const createBlog = async (title, content, userId) => {
    const result = await db.query(
        'INSERT INTO blogs (title, content, user_id, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *',
        [title, content, userId]
    );
    return result.rows[0];
}

export const updateBlog = async (id, title, content) => {
    const result = await db.query(
        'UPDATE blogs SET title = $1, content = $2, updated_at = NOW() WHERE id = $3 RETURNING *',  
        [title, content, id]
    );
    return result.rows[0];
}

export const deleteBlog = async (id) => {
    const result = await db.query('DELETE FROM blogs WHERE id = $1', [id]);
    return result.rows[0];
}