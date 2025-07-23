import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  Divider
} from '@mui/material';
import { Menu, X, Heart, User, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const navigation = [
    { name: 'Find Therapist', href: '/therapists' },
    { name: 'Self-Help', href: '/self-help' },
    { name: 'Community', href: '/community' },
    { name: 'Blog', href: '/blog' }
  ];

  return (
    <>
      <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: '1px solid #e0e0e0' }}>
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 4, md: 6 } }}>
          {/* Logo */}
          <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                background: 'linear-gradient(to bottom right, #c084fc, #38bdf8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 1
              }}
            >
              <Heart size={20} color="#fff" />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 600, background: 'linear-gradient(to right, #c084fc, #38bdf8)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
              MindCare
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
            {navigation.map((item) => (
              <Button
                key={item.name}
                component={Link}
                to={item.href}
                sx={{ color: '#4b5563', fontWeight: 500, textTransform: 'none', '&:hover': { color: '#a78bfa' } }}
              >
                {item.name}
              </Button>
            ))}
          </Box>

          {/* Right Side Actions */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', fontSize: 14, color: '#64748b' }}>
              <Shield size={16} style={{ marginRight: 4 }} />
              Your data is private
            </Box>
            <Button
              variant="outlined"
              component={Link}
              to="/login"
              startIcon={<User size={16} />}
              sx={{
                textTransform: 'none',
                color: '#7c3aed',
                borderColor: '#ddd6fe'
              }}
            >
              Sign In
            </Button>
            <Button
              variant="contained"
              sx={{
                textTransform: 'none',
                backgroundColor: '#a78bfa',
                color: '#fff',
                borderRadius: 2,
                '&:hover': { backgroundColor: '#8b5cf6' }
              }}
            >
              Get Started
            </Button>
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ display: { md: 'none' } }}
            onClick={() => setDrawerOpen(!isDrawerOpen)}
          >
            {isDrawerOpen ? <X size={24} /> : <Menu size={24} />}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={() => setDrawerOpen(false)}>
          <List>
            {navigation.map((item) => (
              <ListItemButton key={item.name} component={Link} to={item.href}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            ))}
          </List>
          <Divider />
          <Box sx={{ px: 2, py: 2 }}>
            <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<User size={16} />}
              sx={{
                textTransform: 'none',
                color: '#7c3aed',
                borderColor: '#ddd6fe',
                mb: 1
              }}
            >
              Sign In
            </Button>
            </Link>
            <Button
              variant="contained"
              fullWidth
              sx={{
                textTransform: 'none',
                backgroundColor: '#a78bfa',
                color: '#fff',
                borderRadius: 2,
                '&:hover': { backgroundColor: '#8b5cf6' }
              }}
            >
              Get Started
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
