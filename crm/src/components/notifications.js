import React, { useState } from 'react';
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  ListItemSecondaryAction,
  Switch,
  Badge,
  Tabs,
  Tab,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import EventIcon from '@mui/icons-material/Event';
import EmailIcon from '@mui/icons-material/Email';
import ErrorIcon from '@mui/icons-material/Error';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CommentIcon from '@mui/icons-material/Comment';
import FeedbackIcon from '@mui/icons-material/Feedback';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DrawerMenu from './drawer';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#1d1d1d',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h6: {
      fontWeight: 600,
    },
    body1: {
      fontWeight: 300,
    },
    body2: {
      fontWeight: 300,
      color: '#b0bec5',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          padding: '16px 24px',
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontWeight: 500,
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          marginBottom: '24px',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minWidth: 'auto',
          textTransform: 'none',
          padding: '12px 16px',
          fontWeight: 500,
        },
      },
    },
  },
});

function Notifications() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [taskRemindersEnabled, setTaskRemindersEnabled] = useState(true);
  const [customerInteractionsEnabled, setCustomerInteractionsEnabled] = useState(true);
  const [systemAlertsEnabled, setSystemAlertsEnabled] = useState(true);
  const [salesInsightsEnabled, setSalesInsightsEnabled] = useState(true);
  const [collaborationActivityEnabled, setCollaborationActivityEnabled] = useState(true);
  const [feedbackEnabled, setFeedbackEnabled] = useState(true);

  const toggleDrawer = (open) => () => setDrawerOpen(open);
  const handleTabChange = (event, newValue) => setTabIndex(newValue);

  const notifications = [
    {
      type: 'Task',
      message: 'You have a meeting scheduled with John Doe at 2:00 PM.',
      icon: <EventIcon color="primary" />,
    },
    {
      type: 'Customer Interaction',
      message: 'Jane Smith replied to your email.',
      icon: <EmailIcon color="secondary" />,
    },
    {
      type: 'System Alert',
      message: 'API integration failed. Please check your configuration.',
      icon: <ErrorIcon color="error" />,
    },
    {
      type: 'Sales Insight',
      message: 'New deal closed with Acme Corp worth $15,000.',
      icon: <AttachMoneyIcon color="success" />,
    },
    {
      type: 'Collaboration Activity',
      message: 'You were mentioned in a comment by Alex Johnson.',
      icon: <CommentIcon color="info" />,
    },
    {
      type: 'Feedback',
      message: 'New customer feedback received from Emily Davis.',
      icon: <FeedbackIcon color="warning" />,
    },
  ];

  const upcomingEvents = [
    { date: 'Today', events: ['Team Meeting at 11:00 AM', 'Client Call at 3:00 PM'] },
    { date: 'Tomorrow', events: ['Project Review at 10:00 AM'] },
    { date: 'This Week', events: ['Team Building Event at 1:00 PM on Thursday'] },
  ];

  const salesSummary = {
    totalSales: '$120,000',
    topRep: 'John Doe - $45,000',
    salesByProduct: [
      { product: 'Product A', sales: '$60,000' },
      { product: 'Product B', sales: '$40,000' },
      { product: 'Product C', sales: '$20,000' },
    ],
  };

  const renderNotifications = () =>
    notifications.map((notification, index) => (
      <React.Fragment key={index}>
        <ListItem>
          <ListItemAvatar>
            <Avatar sx={{ backgroundColor: 'transparent' }}>{notification.icon}</Avatar>
          </ListItemAvatar>
          <ListItemText primary={notification.message} />
        </ListItem>
        {index < notifications.length - 1 && <Divider />}
      </React.Fragment>
    ));

  const renderSettings = () => (
    <List>
      <ListItem>
        <ListItemText primary="Task and Event Reminders" />
        <ListItemSecondaryAction>
          <Switch
            checked={taskRemindersEnabled}
            onChange={() => setTaskRemindersEnabled(!taskRemindersEnabled)}
          />
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText primary="Customer Interactions" />
        <ListItemSecondaryAction>
          <Switch
            checked={customerInteractionsEnabled}
            onChange={() => setCustomerInteractionsEnabled(!customerInteractionsEnabled)}
          />
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText primary="System Alerts" />
        <ListItemSecondaryAction>
          <Switch
            checked={systemAlertsEnabled}
            onChange={() => setSystemAlertsEnabled(!systemAlertsEnabled)}
          />
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText primary="Sales and Performance Insights" />
        <ListItemSecondaryAction>
          <Switch
            checked={salesInsightsEnabled}
            onChange={() => setSalesInsightsEnabled(!salesInsightsEnabled)}
          />
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText primary="Collaboration and Team Activity" />
        <ListItemSecondaryAction>
          <Switch
            checked={collaborationActivityEnabled}
            onChange={() => setCollaborationActivityEnabled(!collaborationActivityEnabled)}
          />
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText primary="Customer Feedback" />
        <ListItemSecondaryAction>
          <Switch
            checked={feedbackEnabled}
            onChange={() => setFeedbackEnabled(!feedbackEnabled)}
          />
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );

  const renderUpcomingEvents = () =>
    upcomingEvents.map((eventGroup, index) => (
      <Box key={index} sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          {eventGroup.date}
        </Typography>
        <List>
          {eventGroup.events.map((event, i) => (
            <ListItem key={i}>
              <ListItemAvatar>
                <Avatar>
                  <CalendarTodayOutlinedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={event} />
            </ListItem>
          ))}
        </List>
      </Box>
    ));

  const renderSalesSummary = () => (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        Sales Insights
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        Total Sales: <strong>{salesSummary.totalSales}</strong>
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        Top Performer: <strong>{salesSummary.topRep}</strong>
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Sales by Product:
      </Typography>
      <List>
        {salesSummary.salesByProduct.map((item, index) => (
          <ListItem key={index} sx={{ pl: 0 }}>
            <TrendingUpIcon sx={{ mr: 1 }} />
            <ListItemText primary={`${item.product}: ${item.sales}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ backgroundColor: darkTheme.palette.background.paper }}>
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
            Notifications & Insights
          </Typography>
        </Toolbar>
      </AppBar>
      <DrawerMenu open={drawerOpen} onClose={toggleDrawer(false)} /> {/* Ensure DrawerMenu is used here */}
      <Box component="main" sx={{ flexGrow: 1, p: 4, mt: 8, backgroundColor: darkTheme.palette.background.default }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ backgroundColor: darkTheme.palette.background.paper }}>
              <CardContent>
                <Tabs
                  value={tabIndex}
                  onChange={handleTabChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                  centered
                >
                  <Tab label="All Notifications" icon={<Badge badgeContent={notifications.length} color="secondary"><NotificationsIcon /></Badge>} />
                  <Tab label="Settings" icon={<NotificationsIcon />} />
                </Tabs>
                {tabIndex === 0 && <List sx={{ mt: 2 }}>{renderNotifications()}</List>}
                {tabIndex === 1 && renderSettings()}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3} lg={4}>
            <Card sx={{ backgroundColor: darkTheme.palette.background.paper }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Upcoming Events
                </Typography>
                {renderUpcomingEvents()}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3} lg={4}>
            <Card sx={{ backgroundColor: darkTheme.palette.background.paper }}>
              <CardContent>
                {renderSalesSummary()}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default Notifications;
