import React, { useState } from 'react';
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Grid,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import EventIcon from '@mui/icons-material/Event';
import EmailIcon from '@mui/icons-material/Email';
import MessageIcon from '@mui/icons-material/Message';
import DrawerMenu from './drawer'; // Ensure this points to your custom drawer component

import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

// Define your theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196f3', // Replace purple with blue
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#303030',
      paper: '#424242',
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#ffffff',
        },
      },
    },
  },
});

// Setup the localizer by providing the moment (or globalize) Object to the correct localizer.
const localizer = momentLocalizer(moment);

export default function CustomCalendar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openDialog, setOpenDialog] = useState(false);
  const [view, setView] = useState(Views.MONTH);
  const [eventDetails, setEventDetails] = useState({
    title: '',
    time: new Date(),
    location: '',
    type: 'Message', // Default to 'Message'
  });
  const [events, setEvents] = useState([
    // Example event
    {
      title: 'Sample Event',
      start: new Date(),
      end: new Date(moment().add(1, 'hours').toDate()),
    },
  ]);

  const toggleDrawer = (open) => () => setDrawerOpen(open);
  const handleDialogOpen = (type) => {
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      type,
    }));
    setOpenDialog(true);
  };
  const handleDialogClose = () => setOpenDialog(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSelectSlot = ({ start, end }) => {
    setSelectedDate(start);
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      start,
      end,
    }));
    handleDialogOpen('Event');
  };

  const handleSaveEvent = () => {
    setEvents([...events, { ...eventDetails, start: eventDetails.start || selectedDate, end: eventDetails.end || selectedDate }]);
    setOpenDialog(false);
  };

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
              Calendar
            </Typography>
          </Toolbar>
        </AppBar>

        <DrawerMenu open={drawerOpen} onClose={toggleDrawer(false)} />

        <Box sx={{ flexGrow: 1, p: 2, mt: 8, position: 'relative' }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            selectable
            views={{ day: true, work_week: true, week: true, month: true, agenda: true }}
            view={view}
            onView={(newView) => setView(newView)}
            style={{ height: 'calc(100vh - 80px)' }} // Adjusts height based on AppBar height
            onSelectSlot={handleSelectSlot}
            eventPropGetter={(event, start, end, isSelected) => ({
              style: {
                backgroundColor: darkTheme.palette.primary.main,
                borderRadius: '8px',
                color: '#fff',
                border: isSelected ? '2px solid white' : 'none',
              },
            })}
            dayPropGetter={(date) => ({
              style: {
                border: `1px solid ${darkTheme.palette.primary.main}`, // Border highlight
                backgroundColor: '#303030', // Ensure the background remains consistent
              },
            })}
            components={{
              toolbar: (props) => (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">{props.label}</Typography>
                  <Box>
                    <Button onClick={() => props.onView('day')}>Day</Button>
                    <Button onClick={() => props.onView('work_week')}>3-Day</Button>
                    <Button onClick={() => props.onView('week')}>Week</Button>
                    <Button onClick={() => props.onView('month')}>Month</Button>
                  </Box>
                </Box>
              ),
            }}
          />

          <SpeedDial
            ariaLabel="SpeedDial for calendar actions"
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
            icon={<SpeedDialIcon />}
          >
            <SpeedDialAction
              icon={<EventIcon />}
              tooltipTitle="Add Event"
              onClick={() => handleDialogOpen('Event')}
            />
            <SpeedDialAction
              icon={<EmailIcon />}
              tooltipTitle="Schedule Email"
              onClick={() => handleDialogOpen('Email')}
            />
            <SpeedDialAction
              icon={<MessageIcon />}
              tooltipTitle="Schedule Message"
              onClick={() => handleDialogOpen('Message')}
            />
          </SpeedDial>
        </Box>

        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>
            {eventDetails.type === 'Event'
              ? 'Schedule Event'
              : eventDetails.type === 'Email'
              ? 'Schedule Email'
              : 'Schedule Message'}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Event Title"
                  name="title"
                  value={eventDetails.title}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    label="Select Time"
                    value={eventDetails.time}
                    onChange={(time) => setEventDetails((prevDetails) => ({ ...prevDetails, time }))}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Location"
                  name="location"
                  value={eventDetails.location}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Type"
                  name="type"
                  value={eventDetails.type}
                  onChange={handleInputChange}
                  select
                  fullWidth
                  disabled
                >
                  <MenuItem value="Message">Message</MenuItem>
                  <MenuItem value="Email">Email</MenuItem>
                  <MenuItem value="Event">Event</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSaveEvent} color="primary">
              Save {eventDetails.type}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}
