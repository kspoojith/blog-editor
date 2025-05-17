import {
    Box,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Heading,
    Text,
    Button,
    VStack,
    HStack,
    Tag
  } from '@chakra-ui/react';
  import { useEffect, useState } from 'react';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom';
  
  export default function MyBlogs() {
    const [blogs, setBlogs] = useState([]);
    const [status, setStatus] = useState('published'); 
    const navigate = useNavigate();
  
    const fetchBlogs = async (status) => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`https://blog-editor-xvy1.onrender.com/api/blogs/user/my?status=${status}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBlogs(res.data);
      } catch (err) {
        console.error('Error fetching my blogs:', err);
      }
    };
  
    useEffect(() => {
      fetchBlogs(status);
    }, [status]);
  
    const renderBlogs = () => {
      if (blogs.length === 0) {
        return <Text>No {status} blogs found.</Text>;
      }
  
      return blogs.map(blog => (
        <Box key={blog._id} p={4} borderWidth="1px" borderRadius="lg" w="100%">
          <Heading size="md">{blog.title}</Heading>
          <HStack mt={2} spacing={2}>
            {blog.tags?.map((tag, idx) => <Tag key={idx}>{tag}</Tag>)}
          </HStack>
          <Text mt={2} fontSize="sm" color="gray.500">
            Last updated: {new Date(blog.updated_at).toLocaleString()}
          </Text>
          <Button mt={3} size="sm" colorScheme="teal" onClick={() => navigate(`/edit/${blog._id}`)}>
            Edit
          </Button>
        </Box>
      ));
    };
  
    return (
      <Box maxW="800px" mx="auto" mt="8">
        <Heading mb={6} textAlign="center">My Blogs</Heading>
        <Tabs variant="enclosed" isFitted onChange={(index) => setStatus(index === 0 ? 'published' : 'draft')}>
          <TabList>
            <Tab>Published</Tab>
            <Tab>Drafts</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>{renderBlogs()}</TabPanel>
            <TabPanel>{renderBlogs()}</TabPanel>
          </TabPanels>
        </Tabs>
        <Box mt={8} textAlign="center">
          <Button colorScheme="blue" onClick={() => navigate('/editor')}>
            Create New Blog
          </Button>
        </Box>
      </Box>
    );
  }
  