import mongoose from "mongoose";
import User from "../models/User.js";
import Blog from "../models/Blog.js";
import { connectToDatabase } from "../db/dbconn.js";

async function seedDatabase() {
    await connectToDatabase();

    const users = [
        {
          name: 'Admin John Doe',
          email: 'test@gmail.com',
          role: 'admin',
        },
        {
          name: 'Normal Jane Doe',
          email: 'testuser@gmail.com',
          role: 'normal',
        },
      ];
    
      const blogs = [
        {
          title: 'Blog 1',
          content: 'Content of Blog 1',
        },
        {
          title: 'Blog 2',
          content: 'Content of Blog 2',
        },
      ];

      try {
        const insertedUsers = await User.insertMany(users);
        console.log('Users inserted:', insertedUsers);

        const blogsWithUsers = blogs.map((blog, index) => {
            blog.user = insertedUsers[index]._id;
            return blog;
        }); 

        const insertedBlogs = await Blog.insertMany(blogsWithUsers);
        console.log('Blogs inserted:', insertedBlogs);
      } catch (error) {
        console.error('Error inserting data:', error);
      } finally {
        mongoose.connection.close();
      }
}

seedDatabase();