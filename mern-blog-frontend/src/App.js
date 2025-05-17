import { Routes, Route } from 'react-router-dom';
import BlogEditor from './pages/BlogEditor';
import BlogList from './pages/BlogList';
import LoginPage from './pages/LoginPage';
import Navbar from './pages/Navbar';
import RegisterPage from './pages/RegisterPage';
import BlogDetails from './pages/BlogDetails';
import MyBlogs from './pages/MyBlogs';
import ProtectedRoute from './pages/ProtectedRoute';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/editor" element={
          <ProtectedRoute><BlogEditor /></ProtectedRoute>
        } />
        <Route path="/edit/:id" element={
          <ProtectedRoute><BlogEditor /></ProtectedRoute>
        } />
        <Route path="/my-blogs" element={<ProtectedRoute><MyBlogs /></ProtectedRoute>} />

      </Routes>
    </>
  );
}

export default App;
