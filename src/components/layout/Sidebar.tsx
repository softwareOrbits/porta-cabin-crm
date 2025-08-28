import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  IconButton,
  Avatar,
  Divider,
  Switch,
  FormControlLabel,
  Tooltip,
  useTheme,

} from '@mui/material';
import {
  Dashboard,
  Description,
  ReceiptLong,
  AccountTree,
  Engineering,
  Receipt,
  Inventory2,
  Groups,
  Handyman,
  Hardware,
  Analytics,
  Settings,
  ChevronLeft,
  ChevronRight,
  Logout,
  DarkMode,
  LightMode,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme as useAppTheme } from '../../context/ThemeContext';
import { navigationItems } from '../../constants/navigation';
import { APP_NAME, STORAGE_KEYS } from '../../constants';
import { getStorageItem, setStorageItem } from '../../utils';

const DRAWER_WIDTH = 280;
const DRAWER_WIDTH_COLLAPSED = 80;

// Icon mapping
const iconMap: Record<string, React.ReactElement> = {
  dashboard: <Dashboard />,
  description: <Description />,
  receipt_long: <ReceiptLong />,
  account_tree: <AccountTree />,
  engineering: <Engineering />,
  receipt: <Receipt />,
  inventory_2: <Inventory2 />,
  groups: <Groups />,
  handyman: <Handyman />,
  hardware: <Hardware />,
  analytics: <Analytics />,
  settings: <Settings />,
};

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
  isMobile: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onToggle, isMobile }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const { user, logout } = useAuth();
  const { mode, toggleMode } = useAppTheme();
  
  const [collapsed, setCollapsed] = useState<boolean>(
    getStorageItem(STORAGE_KEYS.SIDEBAR_COLLAPSED, false)
  );

  const handleCollapse = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    setStorageItem(STORAGE_KEYS.SIDEBAR_COLLAPSED, newCollapsed);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      onToggle();
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getAvailableNavItems = () => {
    if (!user) return [];
    
    const userPermissions = user.permissions.map(p => p.module);
    return navigationItems.filter(item => {
      if (!item.permissions || item.permissions.length === 0) return true;
      return item.permissions.some(permission => userPermissions.includes(permission));
    });
  };

  const drawerWidth = isMobile ? DRAWER_WIDTH : (collapsed ? DRAWER_WIDTH_COLLAPSED : DRAWER_WIDTH);

  const drawerContent = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: 64,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        {(!collapsed || isMobile) && (
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: 'primary.main',
              fontSize: '1.1rem',
            }}
          >
            {APP_NAME}
          </Typography>
        )}
        
        {!isMobile && (
          <IconButton onClick={handleCollapse} size="small">
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        )}
      </Box>

      {/* Navigation */}
      <Box sx={{ flex: 1, overflow: 'auto', py: 1 }}>
        <List sx={{ px: 1 }}>
          {getAvailableNavItems().map((item) => {
            const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
            
            return (
              <Tooltip
                key={item.id}
                title={collapsed && !isMobile ? item.title : ''}
                placement="right"
              >
                <ListItemButton
                  onClick={() => handleNavigation(item.path)}
                  selected={isActive}
                  sx={{
                    borderRadius: 1,
                    my: 0.5,
                    minHeight: 48,
                    justifyContent: collapsed && !isMobile ? 'center' : 'flex-start',
                    '&.Mui-selected': {
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      },
                      '& .MuiListItemIcon-root': {
                        color: 'primary.contrastText',
                      },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: collapsed && !isMobile ? 0 : 40,
                      justifyContent: 'center',
                      color: isActive ? 'inherit' : 'text.secondary',
                    }}
                  >
                    {iconMap[item.icon] || <Settings />}
                  </ListItemIcon>
                  
                  {(!collapsed || isMobile) && (
                    <ListItemText
                      primary={item.title}
                      primaryTypographyProps={{
                        fontSize: '0.875rem',
                        fontWeight: isActive ? 600 : 400,
                      }}
                    />
                  )}
                </ListItemButton>
              </Tooltip>
            );
          })}
        </List>
      </Box>

      {/* User Profile and Settings */}
      <Box sx={{ mt: 'auto' }}>
        <Divider />
        
        {/* Theme Toggle */}
        <Box sx={{ p: 2 }}>
          {(!collapsed || isMobile) ? (
            <FormControlLabel
              control={
                <Switch
                  checked={mode === 'dark'}
                  onChange={toggleMode}
                  icon={<LightMode />}
                  checkedIcon={<DarkMode />}
                />
              }
              label={
                <Typography variant="body2">
                  {mode === 'dark' ? 'Dark Mode' : 'Light Mode'}
                </Typography>
              }
            />
          ) : (
            <Tooltip title={`Switch to ${mode === 'dark' ? 'Light' : 'Dark'} Mode`} placement="right">
              <IconButton onClick={toggleMode} size="small">
                {mode === 'dark' ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Tooltip>
          )}
        </Box>

        {/* User Profile */}
        <Box
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            gap: collapsed && !isMobile ? 0 : 2,
            justifyContent: collapsed && !isMobile ? 'center' : 'flex-start',
          }}
        >
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: 'primary.main',
              fontSize: '1rem',
            }}
          >
            {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
          </Avatar>
          
          {(!collapsed || isMobile) && (
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {user?.firstName} {user?.lastName}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  display: 'block',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {user?.role?.replace('_', ' ').toUpperCase()}
              </Typography>
            </Box>
          )}
          
          <Tooltip title="Logout" placement={collapsed && !isMobile ? 'right' : 'top'}>
            <IconButton
              onClick={handleLogout}
              size="small"
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'error.main',
                },
              }}
            >
              <Logout />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={open}
        onClose={onToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: drawerWidth,
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflowX: 'hidden',
        },
      }}
      open
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;