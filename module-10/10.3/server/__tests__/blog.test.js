import { jest } from '@jest/globals';
import request from 'supertest';
import app from '../index.js';
import Blog from '../models/Blog.js';
import { connectToDatabase, disconnectFromDatabase } from '../db/dbconn.js';
import { MONGO_URI } from '../config.js';

jest.setTimeout(30000);

beforeAll(async () => {
    await connectToDatabase(MONGO_URI);
    console.log('[TEST] Connected to test database');
});

afterAll(async () => {
    await disconnectFromDatabase();
    console.log('[TEST] Disconnected from test database');
});

afterEach(async () => {
    await Blog.deleteMany({});
    console.log('[TEST] Cleared test database');
});

describe('Blog API', () => {
    it('should create a new blog', async () => {
        const newBlog ={
            title: 'Test Blog',
            content: 'This is a test blog supertest',
        };

        console.log('[TEST] Sending POST request to /api/blogs to create a new blog...');

        const response = await request(app)
        .post('/api/blogs')
        .send(newBlog);

        console.log('[TEST] Response received from /api/blogs');
        console.log('[TEST] Response status:', response.status);
        console.log('[TEST] Response body:', response.body);

        expect(response.status).toBe(201);
        expect(response.body.data.title).toBe(newBlog.title);
        expect(response.body.data.content).toBe(newBlog.content);

        console.log('[TEST] Blog creation test passed');
    });

    it('should get all blogs', async () => {
        console.log('[TEST] Creating test blogs...');
        const blog1 = new Blog({title: 'Test Blog 1', content: 'This is the first test blog'});
        const blog2 = new Blog({title: 'Test Blog 2', content: 'This is the second test blog'});
        await blog1.save();
        await blog2.save();
        console.log('[TEST] Test blogs created');

        console.log('[TEST] Sending GET request to /api/blogs to get all blogs...');
        const response = await request(app).get('/api/blogs');

        console.log('[TEST] Response received from /api/blogs');
        console.log('[TEST] Response status:', response.status);
        console.log('[TEST] Response body:', response.body);

        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(2);

        console.log('[TEST] Get all blogs test passed');
    });

    it('should get a single blog by id', async () => {
        console.log('[TEST] Creating test blog...');
        const newBlog = new Blog({title: 'Test Blog 3', content: 'This is the third test blog'});
        await newBlog.save();
        console.log('[TEST] Test blog created');

        console.log('[TEST] Sending GET request to /api/blogs/:id to get a single blog...');
        const response = await request(app).get(`/api/blogs/${newBlog._id}`);

        console.log('[TEST] Response received from /api/blogs/:id');
        console.log('[TEST] Response status:', response.status);
        console.log('[TEST] Response body:', response.body);

        expect(response.status).toBe(200);
        expect(response.body.data.title).toBe(newBlog.title);
        expect(response.body.data.content).toBe(newBlog.content);

        console.log('[TEST] Get single blog test passed');
    });

    it('should update a blog', async () => {
        console.log('[TEST] Creating test blog...');
        const newBlog = new Blog({title: 'Test Blog 4', content: 'This is the fourth test blog'});
        await newBlog.save();
        console.log('[TEST] Test blog created');

        const updatedBlog = {title: 'Updated Test Blog', content: 'This is the updated test blog'};

        console.log('[TEST] Sending PUT request to /api/blogs/:id to update a blog...');
        const response = await request(app).put(`/api/blogs/${newBlog._id}`).send(updatedBlog);

        console.log('[TEST] Response received from /api/blogs/:id');
        console.log('[TEST] Response status:', response.status);
        console.log('[TEST] Response body:', response.body);

        expect(response.status).toBe(200);
        expect(response.body.data.title).toBe(updatedBlog.title);
        expect(response.body.data.content).toBe(updatedBlog.content);

        console.log('[TEST] Update blog test passed');
    });

    it('should delete a blog', async () => {
        console.log('[TEST] Creating test blog...');
        const newBlog = new Blog({title: 'Test Blog 5', content: 'This is the fifth test blog'});
        await newBlog.save();
        console.log('[TEST] Test blog created');

        console.log('[TEST] Sending DELETE request to /api/blogs/:id to delete a blog...');
        const response = await request(app).delete(`/api/blogs/${newBlog._id}`);

        console.log('[TEST] Response received from /api/blogs/:id');
        console.log('[TEST] Response status:', response.status);
        console.log('[TEST] Response body:', response.body);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Blog deleted successfully');

        console.log('[TEST] Delete blog test passed');
    });


})