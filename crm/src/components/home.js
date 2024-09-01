// Home.js
import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import DrawerMenu from './drawer';  // Import the DrawerMenu component
import CustomizedTimeline from './timeline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function Home() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
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
            CRM News & Updates
          </Typography>
        </Toolbar>
      </AppBar>
      <DrawerMenu open={drawerOpen} onClose={toggleDrawer(false)} />  {/* Use DrawerMenu here */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Latest News & Updates
        </Typography>
        <Grid container spacing={4}>
          {/* Your existing newsItems content here */}
        </Grid>
        <CustomizedTimeline />
      </Box>

    </ThemeProvider>
  );
}

export default Home;
