import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications,
  AccountCircle,
  Settings,
  Logout,
  Help,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { useTheme as useAppTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onMenuClick: () => void;
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, title = 'Dashboard' }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { mode, toggleMode } = useAppTheme();
  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [notificationAnchor, setNotificationAnchor] = React.useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const handleLogout = () => {
    handleProfileMenuClose();
    logout();
    navigate('/login');
  };

  const handleSettings = () => {
    handleProfileMenuClose();
    navigate('/settings');
  };

  const handleHelp = () => {
    handleProfileMenuClose();
    // Navigate to help or open help modal
    console.log('Help clicked');
  };

  // Mock notifications - replace with real data
  const notifications = [
    {
      id: '1',
      title: 'New Quote Request',
      message: 'John Doe requested a quote for 15x10 cabin',
      time: '5 minutes ago',
      read: false,
    },
    {
      id: '2',
      title: 'Project Completed',
      message: 'Project #PRJ-001 has been marked as completed',
      time: '1 hour ago',
      read: false,
    },
    {
      id: '3',
      title: 'Invoice Overdue',
      message: 'Invoice INV-2024-001 is 5 days overdue',
      time: '2 hours ago',
      read: true,
    },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        bgcolor: 'background.paper',
        color: 'text.primary',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Toolbar>
        {/* Menu Button for Mobile */}
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            onClick={onMenuClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Page Title */}
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: 600,
            fontSize: '1.125rem',
          }}
        >
          {title}
        </Typography>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Theme Toggle */}
          <IconButton
            onClick={toggleMode}
            color="inherit"
            title={`Switch to ${mode === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          {/* Notifications */}
          <IconButton
            color="inherit"
            onClick={handleNotificationOpen}
            title="Notifications"
          >
            <Badge badgeContent={unreadCount} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          {/* Profile Menu */}
          <IconButton
            onClick={handleProfileMenuOpen}
            color="inherit"
            title="Account Menu"
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: 'primary.main',
                fontSize: '0.875rem',
              }}
            >
              {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
            </Avatar>
          </IconButton>
        </Box>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleProfileMenuClose}
          onClick={handleProfileMenuClose}
          PaperProps={{
            elevation: 3,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {/* User Info */}
          <Box sx={{ px: 2, py: 1.5, borderBottom: 1, borderColor: 'divider' }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {user?.firstName} {user?.lastName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {user?.email}
            </Typography>
          </Box>

          <MenuItem onClick={() => navigate('/profile')}>
            <ListItemIcon>
              <AccountCircle fontSize="small" />
            </ListItemIcon>
            <ListItemText>My Profile</ListItemText>
          </MenuItem>

          <MenuItem onClick={handleSettings}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </MenuItem>

          <MenuItem onClick={handleHelp}>
            <ListItemIcon>
              <Help fontSize="small" />
            </ListItemIcon>
            <ListItemText>Help & Support</ListItemText>
          </MenuItem>

          <Divider />

          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Menu>

        {/* Notifications Menu */}
        <Menu
          anchorEl={notificationAnchor}
          open={Boolean(notificationAnchor)}
          onClose={handleNotificationClose}
          PaperProps={{
            elevation: 3,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              minWidth: 320,
              maxWidth: 400,
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 60,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {/* Notifications Header */}
          <Box sx={{ px: 2, py: 1.5, borderBottom: 1, borderColor: 'divider' }}>
            <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 600 }}>
              Notifications
            </Typography>
          </Box>

          {/* Notification Items */}
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <MenuItem
                key={notification.id}
                onClick={handleNotificationClose}
                sx={{
                  alignItems: 'flex-start',
                  py: 2,
                  borderBottom: 1,
                  borderColor: 'divider',
                  '&:last-child': {
                    borderBottom: 0,
                  },
                  bgcolor: notification.read ? 'transparent' : 'action.hover',
                }}
              >
                <Box sx={{ width: '100%' }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: notification.read ? 400 : 600,
                      mb: 0.5,
                    }}
                  >
                    {notification.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: 'block', mb: 0.5 }}
                  >
                    {notification.message}
                  </Typography>
                  <Typography variant="caption" color="text.disabled">
                    {notification.time}
                  </Typography>
                </Box>
              </MenuItem>
            ))
          ) : (
            <MenuItem>
              <Typography variant="body2" color="text.secondary">
                No notifications
              </Typography>
            </MenuItem>
          )}

          {/* View All Notifications */}
          {notifications.length > 0 && (
            <>
              <Divider />
              <MenuItem onClick={handleNotificationClose}>
                <Typography
                  variant="body2"
                  color="primary.main"
                  sx={{ width: '100%', textAlign: 'center', fontWeight: 600 }}
                >
                  View All Notifications
                </Typography>
              </MenuItem>
            </>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;