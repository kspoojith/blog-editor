import Blog from '../models/Blog.js';
import User from '../models/User.js';

export const saveDraft = async (req, res) => {
  const { id, title, content, tags } = req.body;
  const tokenUserId = req.userId;
  const tagArray = tags?.map(tag => tag.trim());
  try {
    let blog;
    if (!id) {
      blog = new Blog({
        user: tokenUserId,
        title,
        content,
        tags: tagArray,
        status: 'draft',
      });
      await blog.save();
    } else {
      blog = await Blog.findOneAndUpdate(
        { _id: id },
        { title, content, tags: tagArray, status: 'draft', updated_at: new Date() },
        { new: true }
      );
    }
    res.json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const publishBlog = async (req, res) => {
    const { id, title, content, tags, status } = req.body;
  
    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    try {
      // Ensure the blog belongs to the logged-in user
      let blog = await Blog.findOne({ _id: id, user: req.userId });
  
      if (!blog) {
        return res.status(403).json({ error: 'Forbidden: You do not own this blog' });
      }
  
      blog.title = title;
      blog.content = content;
      blog.tags = tags;
      blog.status = status || 'published';
      blog.updated_at = new Date();
      await blog.save();
  
      res.json(blog);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ status: 'published' }).populate('user', 'username');
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('user', 'username email');
    res.json(blog);
  } catch (err) {
    res.status(404).json({ error: 'Blog not found' });
  }
};

export const getMyBlogs = async (req, res) => {
    try {
      const statusFilter = req.query.status; // 'draft' or 'published'
      const filter = { user: req.userId };
      if (statusFilter) filter.status = statusFilter;
  
      const blogs = await Blog.find(filter);
      res.json(blogs);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  