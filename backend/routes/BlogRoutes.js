import express from 'express';
import {
  saveDraft, publishBlog, getAllBlogs,
  getBlogById, getMyBlogs
} from '../controllers/blogController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const blogRouter = express.Router();
blogRouter.post('/save-draft', authMiddleware, saveDraft);
blogRouter.post('/publish', authMiddleware, publishBlog);
blogRouter.get('/', getAllBlogs);
blogRouter.get('/:id', getBlogById);
blogRouter.get('/user/my', authMiddleware, getMyBlogs);
export default blogRouter;