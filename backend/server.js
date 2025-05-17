import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import blogRouter from './routes/BlogRoutes.js';
import authRoutes from './routes/authRoutes.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogRouter);
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(process.env.PORT || 5000, () => console.log('Server running'));
})
.catch(err => console.error(err));