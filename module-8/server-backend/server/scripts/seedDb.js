import db from "../db/dbconn.js";

const seedUsers = `
INSERT INTO users (id, name, email, role, created_at, updated_at) VALUES
(1, 'Admin John Doe', 'admin@gmaxil.com', 'admin', NOW(), NOW()),
(2, 'Normal Jane Doe 1', 'normal1@gmaxil.com', 'normal', NOW(), NOW()),
(3, 'Normal Jane Doe 2', 'normal2@gmaxil.com', 'normal', NOW(), NOW()),
(4, 'Normal Jane Doe 3', 'normal3@gmaxil.com', 'normal', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;`;

const seedBlogs = `
INSERT INTO blogs (id, title, content, user_id, created_at, updated_at) VALUES 
(1, 'Blog 1', 'Content of Blog 1', 2, NOW(), NOW()),
(2, 'Blog 2', 'Content of Blog 2', 3, NOW(), NOW()),
(3, 'Blog 3', 'Content of Blog 3', 4, NOW(), NOW()),
(4, 'Blog 4', 'Content of Blog 4', 2, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;`;

async function seedDatabase() {

    try {
        await db.query("BEGIN");
        
        //seeding users
        await db.query(seedUsers);
        const insertedUsers = await db.query("SELECT * FROM users");
        console.log("All Users in Database:", insertedUsers.rows);

        //seeding blogs
        await db.query(seedBlogs);
        const insertedBlogs = await db.query("SELECT * FROM blogs");
        console.log("All Blogs in Database:", insertedBlogs.rows);

        await db.query("COMMIT");
        console.log('Database seeded successfully.');
    } catch (error) {
    await db.query("ROLLBACK");
    console.error("Error seeding database:", error);
 } finally {
    db.end();
 }
} 

seedDatabase();