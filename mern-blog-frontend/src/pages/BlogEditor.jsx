import {
  Box,
  Button,
  Input,
  Textarea,
  VStack,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from '../utils/axiosInstance';
import { useParams, useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';

export default function BlogEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [id, setId] = useState(null);
  const toast = useToast();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.id) {
      axios.get(`/blogs/${params.id}`)
        .then(res => {
          setTitle(res.data.title || '');
          setContent(res.data.content || '');
          setTags((res.data.tags || []).join(','));
          setId(res.data._id);
        })
        .catch(err => console.error('Error fetching blog:', err));
    }
  }, [params.id]);

  const autoSaveDraft = debounce(() => {
    if (!title && !content) return;
    axios.post('/blogs/save-draft', {
      id,
      title,
      content,
      tags: tags.split(',').map(tag => tag.trim()),
      status: 'draft',
    })
      .then(res => {
        if (res.data?._id) {
          setId(res.data._id);
        }
        toast({ title: 'Draft auto-saved!', status: 'success', duration: 2000 });
      })
      .catch(err => {
        console.error('Auto-save failed:', err);
      });
  }, 2000);

  useEffect(() => {
    autoSaveDraft();
    return autoSaveDraft.cancel;
  }, [title, content, tags]);

  const handlePublish = async () => {
    if (!id) {
      toast({ title: "Save draft before publishing", status: "warning", duration: 3000 });
      return;
    }
    try {
      await axios.post('/blogs/publish', {
        id,
        title,
        content,
        tags: tags.split(',').map(tag => tag.trim()),
        status: 'published',
      });
      toast({ title: 'Blog Published!', status: 'success', duration: 2000 });
      navigate('/');
    } catch (err) {
      console.error('Publish failed:', err);
      toast({ title: 'Publish failed', description: err.response?.data?.error || err.message, status: 'error', duration: 3000 });
    }
  };

  return (
    <Box maxW="700px" mx="auto" mt="8">
      <VStack spacing={4}>
        <Heading>Create / Edit Blog</Heading>
        <Input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        {/* Normal textarea for content */}
        <Textarea
          placeholder="Write blog content here..."
          rows={10}
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <Input
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={e => setTags(e.target.value)}
        />
        <Box w="100%" textAlign="right">
          <Button colorScheme="teal" onClick={handlePublish}>Publish</Button>
        </Box>
      </VStack>
    </Box>
  );
}
