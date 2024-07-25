
//Dummy blog posts
export var blogs = [
    { id: 1, title: 'Blog post 1', content: 'Example blog post 1.' },
    { id: 2, title: 'Blog post 2', content: 'Example blog post 2.' },
    { id: 3, title: 'Blog post 3', content: 'Example blog post 3.' },
    { id: 4, title: 'Blog post 4', content: 'Example blog post 4.' },
  ];

//convert string ID to int
export const toInt =  (id) => {
    return parseInt(id, 10);
}

//find a single blog by ID
export function blogsFindById(blogId) {
    blogId = toInt(blogId);
    return blogs.find((x) => x.id === blogId);
}

//get ID of last blog entry
export function blogsLastId() {
    return blogs[blogs.length - 1].id || 0;
}

//create new blog object with ID 
export function newBlog({id, title, content}) {
    const blogId = id || blogsLastId() + 1;
    return {
        id: blogId,
        title,
        content,
    };
}

//add new entry to blogs array
export function addBlog({title, content}) {
    const blog = newBlog({title, content});
    blogs.push(blog);
    return blog;
} 

export function updateBlog({updatedBlog}) {
    const id = toInt(updatedBlog.id);
    const exists = blogs.find((x) => x.id === id);
    if (!exists) {
        throw new Error(`blog with id ${id} not found`);
    }
    const filtered = blogs.filter((x) => x.id !== id);
    blogs = {...filtered, updatedBlog}.sort((a,b) => a.id - b.id);
    return updatedBlog;
}

export function deleteBlog(blogId) {
    blogId = toInt(blogId);
    blogs = blogs.filter((x) => x.id !== blogId);
}