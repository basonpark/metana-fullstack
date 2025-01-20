import User from '../models/User.js';
import Blog from '../models/Blog.js';
import { connectToDatabase } from '../db/dbconn.js';
import bcrypt from 'bcrypt';

const hashPassword = (password) => bcrypt.hashSync(password, 10);

const users = [
  {
    name: 'Admin John Doe',
    email: 'john.doe@example.com',
    role: 'admin',
    password: hashPassword('password1'), // We hash the user password here for seeds
  },
  {
    name: 'Normal Jane Doe',
    email: 'jane.doe@example.com',
    role: 'normal',
    password: hashPassword('password1'), // We hash the user password here for seeds
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

// Do seeding of database users and blogs
async function doSeed() {
  console.log('[+] starting database seeding...');

  // Get users emails and delete if they exist
  const userEmails = users.map((user) => user.email);
  await User.deleteMany({ email: { $in: userEmails } }); // eg: delete where user.email in [...]

  // Insert users, then get IDs for blogs
  const userRows = await User.insertMany(users);
  console.log('Users seeded:', users);
  const blogsWithUsers = blogs.map((blog, index) => {
    blog.user = userRows[index]._id;
    return blog;
  });

  await Blog.insertMany(blogsWithUsers);
  console.log(`Blogs seeded:`, blogs);
  console.log('[+] seeding complete');
}

try {
  await connectToDatabase();
  await doSeed();
  process.exit(0);
} catch (err) {
  console.error('Error seeding database:', err);
  process.exit(1);
}