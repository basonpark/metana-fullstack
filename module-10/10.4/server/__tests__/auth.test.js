import { jest } from '@jest/globals';
import request from 'supertest';
import app from '../index.js';
import User from '../models/User.js';
import { connectToDatabase, disconnectFromDatabase } from '../db/dbconn.js';
import { MONGO_URI } from '../config.js';
import bcrypt from 'bcrypt';

jest.setTimeout(30000);

const hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
}

//function to seed a user
const seedUser = async () => {
    console.log('[TEST] Seeding user...');
    const user = {
        name: 'Admin Jon Doe',
        email: 'john.doe@example.com',
        role: 'admin',
        password: hashPassword('password123'),
    };

    const existingUser = await User.findOne({email: user.email});
    if (!existingUser) {
        await User.create(user);
    }
    console.log('[TEST] User seeded successfully for authentication tests');
};

//function to delete seeded user
const deleteUser = async () => {
    console.log('[TEST] Deleting seeded user...');
    await User.deleteOne({email: 'john.doe@example.com'});
    console.log('[TEST] Seeded user deleted successfully');
}

beforeAll(async () => {
    console.log('[TEST] Conecting to test database...');
    await connectToDatabase(MONGO_URI);
    console.log('[TEST] Database connected successfully');
    await seedUser();
});

afterAll(async () => {
    //clean up user after the tests
    await deleteUser();
    console.log('[TEST] User deleted successfully');
    await disconnectFromDatabase();
    console.log('[TEST] Disconnected from test database');
});

describe('Auth API', () => {
    it('should log in a user with valid credentials', async () => {
        const loginCredentials = {
            email: 'john.doe@example.com',
            password: 'password123'
        };
        console.log('[TEST] Sending POST request to /api/login with valid credentials...');

        const response = await request(app)
        .post('/api/login')
        .send(loginCredentials);

        console.log('[TEST] Response received from /api/login');
        console.log('[TEST] Response status:', response.status);
        console.log('[TEST] Response body:', response.body);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.user.email).toBe(loginCredentials.email);
        expect(response.body.data.token).toBeDefined();
        expect(response.body.data.token).not.toBe('');

        console.log('[TEST] Authentication test passed'); 
    });

    it('should not log in a user with invalid credentials', async () => {
        const loginCredentials = {
            email: 'john.doe@example.com',
            password: 'wrongpassword'
        };
        console.log('[TEST] Sending POST request to /api/login with invalid credentials...');

        const response = await request(app)
        .post('/api/login')
        .send(loginCredentials);

        console.log('[TEST] Response received from /api/login');
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
        console.log('[TEST] Login with invalid credentials test passed');
    });
});

export default authTest;