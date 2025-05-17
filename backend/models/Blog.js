import mongoose from 'mongoose';
const blogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  content: String,
  tags: [String],
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});
const Blog = mongoose.model('Blog', blogSchema);
export default Blog;