import { useEffect, useState } from 'react';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
export default function BlogDetails() {
  const [blog, setBlog] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    axios.get(`https://blog-editor-xvy1.onrender.com/api/blogs/${id}`)
      .then(res => setBlog(res.data))
      .catch(err => console.error(err));
  }, [id]);
  if (!blog) return <Text>Loading...</Text>;
  return (
    <Box maxW="800px" mx="auto" mt="8">
      <VStack spacing={4} align="start">
        <Heading>{blog.title}</Heading>
        <Text fontSize="sm" color="gray.600">By {blog.user.username}</Text>
        <Text whiteSpace="pre-wrap">{blog.content}</Text>
      </VStack>
    </Box>
  );
}