import mongoose from 'mongoose';
import User from '../models/User.js';
import Blog from '../models/Blog.js';
import { connectToDatabase } from '../db/dbconn.js';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;
const hashPassword = (password) => bcrypt.hash(password, SALT_ROUNDS);

const users = [
  {
    name: 'Admin John Doe',
    email: 'john.doe@example.com',
    role: 'admin',
    password: hashPassword('password'),
  },
  {
    name: 'Normal Jane Doe',
    email: 'jane.doe@example.com',
    role: 'normal',
    password: hashPassword('password'),
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

//do seeding of database users and blogs
async function doSeed() {
  console.log('=== starting database seeding..,');

  //get users emails and delete if they exist
  const userEmails = users.map((user) => user.email);
  await User.deleteMany({email: {$in: userEmails}});

  //insert users, then get IDs for blogs
  const userRows = await User.insertMany(users);
  console.log("=== users inserted", userRows);
  const blogsWithUsers = blogs.map((blog, index) => {
    blog.user = userRows[index]._id;
    return blog;
  });

  await Blog.insertMany(blogsWithUsers);
  console.log("=== blogs inserted", blogsWithUsers);
  console.log("=== database seeding complete");

}

try {
  await connectToDatabase();
  await doSeed();
  process.exit(0);
} catch (error) {
  console.error("=== error seeding database", error);
  process.exit(1);
}
