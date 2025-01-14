import { useEffect, useState } from 'react';
import axios from 'axios';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        console.log('=== debug: fetching blogs data...');
        async function getBlogs() {
            const result = await axios.get('api/blogs');
            if (result && result.status === 200) {
                console.log('=== debug: data returned: ', result.data);
                setBlogs(result.data);
            } else {
                console.error('=== debug: error fetching blogs data: ', result.status);
            }
        }
        getBlogs();
    }, []);

  return (
    <div>
        <h2>Blogs</h2>
        <p>This is the blogs page</p>
        {blogs.length ? (
            <div className='all-blogs'>
                <h3>All blogs:</h3>
                    <ul>
                        {blogs.map((b) => (
                            <li key={`blog-${b.id}`}>{b.title}</li>
                        ))}
                    </ul>
            </div>
        ) : (
            <p>No blogs found</p>
        )}
    </div>
  )
}

export default Blogs
