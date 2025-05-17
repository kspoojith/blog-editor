import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Spacer,
  IconButton,
  useColorMode,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('gray.100', 'gray.900');
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Box bg={bg} px={4} py={3} boxShadow="sm" position="sticky" top="0" zIndex="999">
      <Flex alignItems="center">
        <Heading size="md" onClick={()=>{navigate("/")}}>BlogersApp</Heading>
        <Spacer />
        <Flex gap={2} alignItems="center">
          <IconButton
            size="md"
            variant="ghost"
            onClick={toggleColorMode}
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            aria-label="Toggle Theme"
          />

          {token && user ? (
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<Avatar size="sm" name={user.username} />}
                variant="ghost"
                aria-label="User menu"
              />
              <MenuList>
                <MenuItem isDisabled>{user.username}</MenuItem>
                <MenuItem onClick={() => navigate('/my-blogs')}>My Blogs</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <IconButton
              icon={<FaUser />}
              onClick={() => navigate('/login')}
              aria-label="Login"
              variant="ghost"
            />
          )}
        </Flex>
      </Flex>
    </Box>
  );
}
