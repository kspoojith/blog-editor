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

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post('https://blog-editor-xvy1.onrender.com/api/auth/register', {
        username,
        email,
        password,
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      toast({ title: 'Registration successful', status: 'success', duration: 2000 });
      navigate('/');
    } catch (err) {
      toast({ title: 'Registration failed', description: err.response?.data?.error || 'Unknown error', status: 'error' });
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt="12" p={6} borderWidth="1px" borderRadius="lg">
      <VStack spacing={4}>
        <Heading size="lg">Register</Heading>
        <Input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <Button colorScheme="teal" w="100%" onClick={handleRegister}>Register</Button>
        <Text fontSize="sm">Already have an account? <span style={{ color: 'teal', cursor: 'pointer' }} onClick={() => navigate('/login')}>Login</span></Text>
      </VStack>
    </Box>
  );
}
