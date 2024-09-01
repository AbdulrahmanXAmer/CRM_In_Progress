import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Divider,
  IconButton,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  AppBar,
  Toolbar,
  CssBaseline,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MobileStepper,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import DrawerMenu from './drawer'; // Ensure this points to your custom drawer component

// Use your existing dark theme
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
    body1: {
      color: '#b0bec5',
    },
  },
});

const sampleWebinars = [
  {
    id: 1,
    title: 'Mastering Digital Marketing',
    description: 'Learn the latest strategies in digital marketing from industry leaders.',
    image: 'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    date: '2024-09-12',
    time: '3:00 PM - 5:00 PM',
    speaker: 'John Doe, Marketing Guru',
    price: '$49',
  },
  {
    id: 2,
    title: 'The Future of AI',
    description: 'Discover the future of artificial intelligence with leading AI experts.',
    image: 'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    date: '2024-10-05',
    time: '1:00 PM - 3:00 PM',
    speaker: 'Jane Smith, AI Pioneer',
    price: '$99',
  },
  {
    id: 3,
    title: 'Building Resilient Teams',
    description: 'How to build and manage resilient teams in challenging environments.',
    image: 'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    date: '2024-11-20',
    time: '2:00 PM - 4:00 PM',
    speaker: 'Alice Johnson, Leadership Expert',
    price: '$79',
  },
  {
    id: 4,
    title: 'Innovative Product Design',
    description: 'Explore the latest trends in product design and development.',
    image: 'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    date: '2024-12-15',
    time: '10:00 AM - 12:00 PM',
    speaker: 'Michael Lee, Product Designer',
    price: '$59',
  },
  {
    id: 5,
    title: 'Effective Social Media Strategies',
    description: 'Learn how to create effective social media strategies that engage your audience.',
    image: 'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    date: '2024-11-03',
    time: '4:00 PM - 6:00 PM',
    speaker: 'Sarah Williams, Social Media Expert',
    price: '$69',
  },
  {
    id: 6,
    title: 'Advanced Data Analytics',
    description: 'Delve into advanced data analytics techniques with industry leaders.',
    image: 'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    date: '2024-11-15',
    time: '2:00 PM - 4:00 PM',
    speaker: 'James White, Data Scientist',
    price: '$89',
  },
];

export default function Webinars() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleOpenModal = (webinar) => {
    setModalContent(webinar);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const maxSteps = sampleWebinars.length;

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
              Webinars
            </Typography>
          </Toolbar>
        </AppBar>

        <DrawerMenu open={drawerOpen} onClose={toggleDrawer(false)} />

        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
          <Typography variant="h2" align="center" gutterBottom>
            Upcoming Webinars
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" gutterBottom>
            Learn from the Best in the Industry
          </Typography>

          <Divider sx={{ my: 4 }} />

          {/* Featured Webinar - What's Coming Up Next */}
          <Paper elevation={3} sx={{ mb: 4, p: 4 }}>
            <Typography variant="h4" gutterBottom align="center">
              What's Coming Up Next
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} md={6}>
                <Card sx={{ backgroundColor: darkTheme.palette.background.paper }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={sampleWebinars[activeStep].image}
                    alt={sampleWebinars[activeStep].title}
                  />
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      {sampleWebinars[activeStep].title}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {sampleWebinars[activeStep].description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <AccessTimeIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                      {sampleWebinars[activeStep].date} | {sampleWebinars[activeStep].time}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      <WhatshotIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                      Speaker: {sampleWebinars[activeStep].speaker}
                    </Typography>
                    <Typography variant="h6" color="secondary">
                      {sampleWebinars[activeStep].price}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<EventAvailableIcon />}
                      onClick={() => handleOpenModal(sampleWebinars[activeStep])}
                    >
                      Add to Calendar
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<AddShoppingCartIcon />}
                      onClick={() => handleOpenModal(sampleWebinars[activeStep])}
                    >
                      Buy Ticket
                    </Button>
                  </CardActions>
                </Card>
                <MobileStepper
                  steps={maxSteps}
                  position="static"
                  activeStep={activeStep}
                  nextButton={
                    <Button
                      size="small"
                      onClick={handleNext}
                      disabled={activeStep === maxSteps - 1}
                    >
                      Next
                      <KeyboardArrowRight />
                    </Button>
                  }
                  backButton={
                    <Button
                      size="small"
                      onClick={handleBack}
                      disabled={activeStep === 0}
                    >
                      <KeyboardArrowLeft />
                      Back
                    </Button>
                  }
                />
              </Grid>
            </Grid>
          </Paper>

          {/* Next Month Section */}
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom align="center">
              Next Month
            </Typography>
            <Grid container spacing={4}>
              {sampleWebinars.slice(2).map((webinar) => (
                <Grid item xs={12} md={4} key={webinar.id}>
                  <Card sx={{ backgroundColor: darkTheme.palette.background.paper }}>
                    <CardMedia
                      component="img"
                      height="150"
                      image={webinar.image}
                      alt={webinar.title}
                    />
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {webinar.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" gutterBottom>
                        <AccessTimeIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                        {webinar.date} | {webinar.time}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" gutterBottom>
                        <WhatshotIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                        Speaker: {webinar.speaker}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {webinar.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleOpenModal(webinar)}
                        startIcon={<EventAvailableIcon />}
                      >
                        Add to Calendar
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleOpenModal(webinar)}
                        startIcon={<AddShoppingCartIcon />}
                      >
                        Buy Ticket
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>

          {/* Modal for Add to Calendar/Buy Ticket */}
          <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
            <DialogTitle>{modalContent ? modalContent.title : ''}</DialogTitle>
            <DialogContent>
              <Typography variant="body1" gutterBottom>
                {modalContent ? modalContent.description : ''}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                <AccessTimeIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                {modalContent ? modalContent.date : ''} | {modalContent ? modalContent.time : ''}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                <WhatshotIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Speaker: {modalContent ? modalContent.speaker : ''}
              </Typography>
              <Typography variant="h6" color="secondary">
                {modalContent ? modalContent.price : ''}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal} color="primary">
                Close
              </Button>
              <Button variant="contained" color="primary">
                Confirm Action
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
