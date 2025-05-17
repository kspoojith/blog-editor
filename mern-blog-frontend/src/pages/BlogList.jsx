import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Tag,
  Avatar,
  Spinner,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get('https://blog-editor-xvy1.onrender.com/api/blogs')
      .then(res => setBlogs(res.data))
      .catch(err => console.error('Failed to fetch blogs:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Box maxW="800px" mx="auto" mt="8" textAlign="center">
        <Spinner size="xl" />
        <Text mt={2}>Loading blogs...</Text>
      </Box>
    );
  }


  return (
    <Box maxW="800px" mx="auto" mt="8">
      <Heading mb={6} textAlign="center">All Published Blogs</Heading>
      <VStack spacing={4}>
        {blogs.map(blog => (
          <Box
            key={blog._id}
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            w="100%"
            onClick={() => navigate(`/blog/${blog._id}`)}
            _hover={{ bg: 'gray.50', cursor: 'pointer' }}
          >
            <Heading size="md">{blog.title}</Heading>

            {/* Author info */}
            <HStack mt={2} spacing={2}>
              <Avatar size="sm" name={blog.user?.username || 'User'} />
              <Text fontSize="sm" color="gray.600">
                by {blog.user?.username || 'Unknown'}
              </Text>
            </HStack>

            {/* Tags */}
            <HStack mt={2} spacing={2}>
              {blog.tags?.map((tag, idx) => <Tag key={idx}>{tag}</Tag>)}
            </HStack>

            {/* Updated date */}
            <Text mt={2} fontSize="sm" color="gray.500">
              Last updated: {new Date(blog.updated_at).toLocaleString()}
            </Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
