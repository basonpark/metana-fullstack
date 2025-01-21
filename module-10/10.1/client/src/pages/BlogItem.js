// A single blog item view
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function BlogItem() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/api/blogs/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };
    fetchBlog();
  }, [id]);

  return (
    <div className="blog-post">
      <Link to="/blogs" className="backlink">
        &#8592; back to all blogs
      </Link>
      {blog ? (
        <div>
          <h2 className="text-2xl my-12 font-semibold">{blog.title}</h2>
          <p>{blog.content}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default BlogItem;
