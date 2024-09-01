import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Avatar,
  Divider,
  ListItemAvatar,
  Typography,
  Box,
  Badge,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const emails = [
  {
    id: 1,
    name: 'Alex Jonnold',
    avatar: 'https://i.pravatar.cc/80?img=3',
    date: '21 Oct 2022',
    title: 'Details for our Yosemite Park hike',
    body: 'Hello, my friend! So, it seems we are getting there...',
    unread: true,
  },
  {
    id: 2,
    name: 'Pete Sand',
    avatar: 'https://i.pravatar.cc/80?img=4',
    date: '06 Jul 2022',
    title: 'Tickets for our upcoming trip',
    body: 'Good day, mate! It seems that our tickets just arrived...',
    unread: false,
  },
  // Add more emails as needed
];

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.main,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: -1,
      left: -1,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

export default function EmailList({ onSelectEmail, selectedEmail }) {
  return (
    <List sx={{ padding: 0 }}>
      {emails.map((email) => (
        <React.Fragment key={email.id}>
          <ListItem
            alignItems="flex-start"
            button
            onClick={() => onSelectEmail(email)}
            sx={{
              padding: 2,
              backgroundColor: selectedEmail?.id === email.id ? 'action.selected' : 'background.paper',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <ListItemAvatar>
              {email.unread ? (
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                >
                  <Avatar alt={email.name} src={email.avatar} />
                </StyledBadge>
              ) : (
                <Avatar alt={email.name} src={email.avatar} />
              )}
            </ListItemAvatar>
            <ListItemText
              primary={<Typography variant="h6">{email.title}</Typography>}
              secondary={
                <>
                  <Typography component="span" variant="body2" color="text.primary">
                    {email.name}
                  </Typography>
                  {' — '}
                  {email.body}
                </>
              }
            />
            <Typography variant="body2" color="text.secondary">
              {email.date}
            </Typography>
          </ListItem>
          <Divider component="li" />
        </React.Fragment>
      ))}
    </List>
  );
}
