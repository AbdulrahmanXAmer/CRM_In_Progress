import React from 'react';
import { useNavigate } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import MessageIcon from '@mui/icons-material/Message';
import EmailIcon from '@mui/icons-material/Email';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import EventIcon from '@mui/icons-material/Event';
import WorkIcon from '@mui/icons-material/Work';
import WebIcon from '@mui/icons-material/Web';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AssignmentIcon from '@mui/icons-material/Assignment';

export default function DrawerMenu({ open, onClose }) {
  const navigate = useNavigate();

  const drawerItems = [
    { text: 'Home', icon: <HomeIcon />, onClick: () => navigate('/home') },  // New Home Item
    { text: 'Dashboard', icon: <DashboardIcon />, onClick: () => navigate('/dashboard') },
    { text: 'Customer Management', icon: <PeopleIcon />, onClick: () => navigate('/customers')  },
    { text: 'My Contracts', icon: <AssignmentIcon /> },
    { text: 'Mass Messaging', icon: <MessageIcon />, onClick: () => navigate('/massmessaging') },
    { text: 'Mass Emailing', icon: <EmailIcon />, onClick: () => navigate('/massemail') },
    { text: 'Check Emails', icon: <EmailIcon />, onClick: () => navigate('/email') },
    { text: 'Notifications', icon: <NotificationsIcon />, onClick: () => navigate('/notifications')  },
    { text: 'Calendar', icon: <EventIcon /> , onClick: () => navigate('/calendar') },
    { text: 'Executed Clients', icon: <PeopleAltIcon />, onClick: () => navigate('/executed') },
    { text: 'Hire a VA', icon: <WorkIcon />, onClick: () => navigate('/hireVA') },
    { text: 'Webinars', icon: <WebIcon /> , onClick: () => navigate('/webinar') },
    { text: 'Settings', icon: <SettingsIcon />, onClick: () => navigate('/settings')}
  ];

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={onClose}
        onKeyDown={onClose}
      >
        <List>
          {drawerItems.map((item, index) => (
            <ListItem button key={index} onClick={item.onClick}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
}
