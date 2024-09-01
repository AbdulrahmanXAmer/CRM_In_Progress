import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Divider,
  Link,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import DrawerMenu from './drawer'; // Ensure this points to your custom drawer component

// Define your dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196f3', // Blue color
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#303030',
      paper: '#424242',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
    },
  },
  typography: {
    h2: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
        },
      },
    },
  },
});

export default function HireVA() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        {/* AppBar with Drawer */}
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
              Hire a Virtual Assistant
            </Typography>
          </Toolbar>
        </AppBar>

        <DrawerMenu open={drawerOpen} onClose={toggleDrawer(false)} />

        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
          <Typography variant="h2" align="center" gutterBottom>
            Supercharge Your Business with Virtual Assistants
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" gutterBottom>
            Efficient, Affordable, and Reliable Solutions for Your Business Needs
          </Typography>
          
          <Divider sx={{ my: 4 }} />

          {/* Section 1: Introduction */}
          <Paper elevation={3} sx={{ padding: 4, mb: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <Avatar sx={{ bgcolor: darkTheme.palette.primary.main, width: 56, height: 56 }}>
                  <SupportAgentIcon fontSize="large" />
                </Avatar>
              </Grid>
              <Grid item xs={12} md={9}>
                <Typography variant="h4" gutterBottom>
                  What is a Virtual Assistant (VA)?
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  A Virtual Assistant (VA) is a professional who provides administrative, technical, or creative assistance remotely from a home office. 
                  VAs are skilled in various areas, making them a versatile asset for businesses of all sizes. From handling your daily tasks to managing 
                  complex projects, VAs offer a cost-effective solution that helps you focus on growing your business.
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* Section 2: Benefits of Hiring a VA */}
          <Paper elevation={3} sx={{ padding: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom align="center">
              Benefits of Hiring a Virtual Assistant
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={3}>
                <Box textAlign="center">
                  <Avatar sx={{ bgcolor: darkTheme.palette.secondary.main, width: 56, height: 56, margin: 'auto' }}>
                    <TrendingUpIcon fontSize="large" />
                  </Avatar>
                  <Typography variant="h6" sx={{ mt: 2 }}>Cost-Effective</Typography>
                  <Typography variant="body1" color="textSecondary">
                    Save on costs with rates starting as low as $3 an hour. Get the expertise you need without the overhead of traditional employees.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box textAlign="center">
                  <Avatar sx={{ bgcolor: darkTheme.palette.primary.main, width: 56, height: 56, margin: 'auto' }}>
                    <ScheduleIcon fontSize="large" />
                  </Avatar>
                  <Typography variant="h6" sx={{ mt: 2 }}>Flexibility</Typography>
                  <Typography variant="body1" color="textSecondary">
                    VAs offer flexibility in working hours and tasks. Find a VA that fits your specific needs, whether part-time or full-time.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box textAlign="center">
                  <Avatar sx={{ bgcolor: darkTheme.palette.secondary.main, width: 56, height: 56, margin: 'auto' }}>
                    <ManageAccountsIcon fontSize="large" />
                  </Avatar>
                  <Typography variant="h6" sx={{ mt: 2 }}>Scalability</Typography>
                  <Typography variant="body1" color="textSecondary">
                    Easily scale your VA team as your business grows, ensuring you have the right support at all times.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box textAlign="center">
                  <Avatar sx={{ bgcolor: darkTheme.palette.primary.main, width: 56, height: 56, margin: 'auto' }}>
                    <WorkspacePremiumIcon fontSize="large" />
                  </Avatar>
                  <Typography variant="h6" sx={{ mt: 2 }}>Access to Expertise</Typography>
                  <Typography variant="body1" color="textSecondary">
                    VAs specialize in areas like customer service, admin support, or marketing, providing high-quality skills without extensive training.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* Section 3: Cold Calling */}
          <Paper elevation={3} sx={{ padding: 4, mb: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <Avatar sx={{ bgcolor: darkTheme.palette.secondary.main, width: 56, height: 56 }}>
                  <PhoneInTalkIcon fontSize="large" />
                </Avatar>
              </Grid>
              <Grid item xs={12} md={9}>
                <Typography variant="h4" gutterBottom>
                  Cold Calling & Lead Generation
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Cold calling is crucial but time-consuming. VAs handle cold calling efficiently, allowing you to focus on closing deals rather than chasing leads. 
                  They maintain a steady pipeline of warm leads, ensuring your sales process is always moving forward.
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* Section 4: Lead Management */}
          <Paper elevation={3} sx={{ padding: 4, mb: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <Avatar sx={{ bgcolor: darkTheme.palette.primary.main, width: 56, height: 56 }}>
                  <ManageAccountsIcon fontSize="large" />
                </Avatar>
              </Grid>
              <Grid item xs={12} md={9}>
                <Typography variant="h4" gutterBottom>
                  Lead Management & CRM Support
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  VAs excel at keeping your CRM up to date, following up with potential clients, and ensuring no opportunities are missed. 
                  With a VA managing your leads, you can ensure that every prospect is nurtured properly, leading to higher conversion rates.
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* Section 5: Administrative Support */}
          <Paper elevation={3} sx={{ padding: 4, mb: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <Avatar sx={{ bgcolor: darkTheme.palette.secondary.main, width: 56, height: 56 }}>
                  <SupportAgentIcon fontSize="large" />
                </Avatar>
              </Grid>
              <Grid item xs={12} md={9}>
                <Typography variant="h4" gutterBottom>
                  Administrative Work Starting at $3/Hour
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  From managing emails and scheduling appointments to handling data entry and customer support, VAs can take care of your administrative 
                  tasks at a fraction of the cost of in-house staff. With rates starting as low as $3 an hour, it's an affordable way to get the support you need.
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* Section 6: Specialized Tasks */}
          <Paper elevation={3} sx={{ padding: 4, mb: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <Avatar sx={{ bgcolor: darkTheme.palette.primary.main, width: 56, height: 56 }}>
                  <WorkspacePremiumIcon fontSize="large" />
                </Avatar>
              </Grid>
              <Grid item xs={12} md={9}>
                <Typography variant="h4" gutterBottom>
                  Specialized Tasks & Project Management
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Need help with specialized tasks like graphic design, content writing, or social media management? VAs come with a wide range of skills 
                  and can manage projects from start to finish, ensuring that your business runs smoothly and efficiently.
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* Section 7: Success Stories */}
          <Paper elevation={3} sx={{ padding: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom align="center">
              Success Stories
            </Typography>
            <Typography variant="body1" color="textSecondary" align="center">
              Many businesses have transformed their operations by leveraging the power of VAs. From small startups to large enterprises, 
              companies have experienced increased productivity, reduced costs, and enhanced customer satisfaction by integrating VAs into their teams.
            </Typography>
          </Paper>

          {/* Section 8: Call to Action */}
          <Paper elevation={3} sx={{ padding: 4, mb: 4, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
              Ready to Hire a Virtual Assistant?
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Take the first step towards boosting your business efficiency. Click the link below to find a trusted VA provider and start hiring today!
            </Typography>
            <Button
              variant="contained"
              color="primary"
              href="https://www.trustedvaprovider.com"
              target="_blank"
              sx={{ mt: 2 }}
            >
              Hire a Virtual Assistant Now
            </Button>
          </Paper>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
