import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  IconButton,
  Button,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import EmailContent from './content';
import EmailList from './emaillist';
import WriteEmail from './writeemail';
import DrawerMenu from '../drawer'; // Assuming DrawerMenu is in the parent folder
import { createTheme, ThemeProvider } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e1e',
          color: '#ffffff',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#333',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#444',
          },
        },
      },
    },
  },
});

export default function EmailComponent() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [isComposeOpen, setComposeOpen] = useState(false);

  const toggleDrawer = (open) => () => setDrawerOpen(open);
  const handleEmailClick = (email) => setSelectedEmail(email);
  const handleComposeOpen = () => setComposeOpen(true);
  const handleComposeClose = () => setComposeOpen(false);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Emails
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleComposeOpen}
              sx={{ marginLeft: 'auto' }}
            >
              Compose New Email
            </Button>
          </Toolbar>
        </AppBar>

        {/* Using the existing DrawerMenu component */}
        <DrawerMenu open={drawerOpen} onClose={toggleDrawer(false)} />

        {/* Main Content */}
        <Grid container spacing={2} sx={{ flexGrow: 1, mt: 8, p: 2 }}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ height: '100%', overflowY: 'auto' }}>
              <EmailList onSelectEmail={handleEmailClick} selectedEmail={selectedEmail} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper sx={{ height: '100%', overflowY: 'auto' }}>
              {selectedEmail ? (
                <EmailContent email={selectedEmail} />
              ) : (
                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" color="textSecondary">
                    Select an email to view its content
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
        <WriteEmail open={isComposeOpen} onClose={handleComposeClose} />
      </Box>
    </ThemeProvider>
  );
}
