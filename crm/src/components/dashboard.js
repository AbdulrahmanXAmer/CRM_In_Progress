// Dashboard.js
import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ClientsPerDayChart from './dashboard/clientsWeekly';
import EarningsGauge from './dashboard/totalEarnings';
import CommunicationBarChart from './dashboard/emailsTexts';
import ConnectionsChart from './dashboard/connections';
import DashboardMetrics from './dashboard/metrics';
import DrawerMenu from './drawer';  

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function Dashboard() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => setDrawerOpen(open);

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
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <DrawerMenu open={drawerOpen} onClose={toggleDrawer(false)} /> {/* Use DrawerMenu */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to the Dashboard
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <DashboardMetrics />
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Clients Signed In Per Day
                </Typography>
                <ClientsPerDayChart />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Total Earnings
                </Typography>
                <EarningsGauge />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Emails & Texts Sent
                </Typography>
                <CommunicationBarChart />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Connections Made
                </Typography>
                <ConnectionsChart />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default Dashboard;
