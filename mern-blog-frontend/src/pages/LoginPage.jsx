import React, { useState } from 'react';
import {
  Box,
  Input,
  Button,
  Heading,
  VStack,
  useToast,
  Text
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('https://blog-editor-xvy1.onrender.com/api/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      toast({ title: 'Login successful', status: 'success', duration: 2000 });
      navigate('/');
    } catch (err) {
      toast({ title: 'Login failed', description: err.response?.data?.error || 'Unknown error', status: 'error' });
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt="12" p={6} borderWidth="1px" borderRadius="lg">
      <VStack spacing={4}>
        <Heading size="lg">Login</Heading>
        <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <Button colorScheme="teal" w="100%" onClick={handleLogin}>Login</Button>
        <Text fontSize="sm">Don't have an account? <span style={{ color: 'teal', cursor: 'pointer' }} onClick={() => navigate('/register')}>Sign up</span></Text>
      </VStack>
    </Box>
  );
}
