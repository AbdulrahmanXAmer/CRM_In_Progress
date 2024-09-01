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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  Button,
  Modal,
  Snackbar,
  Alert,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SmsIcon from '@mui/icons-material/Sms';
import DrawerMenu from './drawer';  // Ensure this is the correct path to your DrawerMenu component
import { Gauge } from '@mui/x-charts';
import SearchIcon from '@mui/icons-material/Search';


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
});

// Updated dummy data with tracking for messages sent by the business
const dummyData = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890', status: 'Active', messagesReceived: 500 },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '098-765-4321', status: 'Inactive', messagesReceived: 200 },
  { id: 3, name: 'Sam Wilson', email: 'sam.wilson@example.com', phone: '555-555-5555', status: 'Active', messagesReceived: 800 },
  { id: 4, name: 'Alex Johnson', email: 'alex.johnson@example.com', phone: '444-444-4444', status: 'Pending', messagesReceived: 100 },
  { id: 5, name: 'Emily Davis', email: 'emily.davis@example.com', phone: '333-333-3333', status: 'Inactive', messagesReceived: 300 },
  { id: 6, name: 'Michael Brown', email: 'michael.brown@example.com', phone: '777-777-7777', status: 'Active', messagesReceived: 700 },
  { id: 7, name: 'Sarah Parker', email: 'sarah.parker@example.com', phone: '888-888-8888', status: 'Pending', messagesReceived: 400 },
  { id: 8, name: 'Daniel Harris', email: 'daniel.harris@example.com', phone: '999-999-9999', status: 'Active', messagesReceived: 600 },
];

function MassMessaging() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedClients, setSelectedClients] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [messagingGroupName, setMessagingGroupName] = useState('');
  const [messageType, setMessageType] = useState('WhatsApp');
  const [messageText, setMessageText] = useState('');
  const [messagesSent, setMessagesSent] = useState(0);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const toggleDrawer = (open) => () => setDrawerOpen(open);
  const toggleModal = (open) => () => setModalOpen(open);
  const toggleMessageModal = (open) => () => setMessageModalOpen(open);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleClientSelection = (event, client) => {
    if (event.target.checked) {
      setSelectedClients([...selectedClients, client]);
    } else {
      setSelectedClients(selectedClients.filter((c) => c.id !== client.id));
    }
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedClients(filteredData);
    } else {
      setSelectedClients([]);
    }
  };

  const handleSendMessage = () => {
    // Open the message type selection modal
    setMessageModalOpen(true);
  };

  const handleSaveGroup = () => {
    // Logic to save the messaging group
    console.log('Saving group:', messagingGroupName, selectedClients);
    setModalOpen(false);
    setAlertMessage('Group created successfully!');
    setAlertOpen(true);
  };

  const handleSubmitMessage = () => {
    const totalMessages = selectedClients.length;
    setMessagesSent(messagesSent + totalMessages);  // Increment messages sent count
    console.log(`Sending ${messageType} message to:`, selectedClients);
    console.log('Message:', messageText);
    setMessageModalOpen(false);
    setAlertMessage('Message sent successfully!');
    setAlertOpen(true);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  // Filtered data based on search term and status filter
  const filteredData = dummyData.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === '' || client.status === statusFilter)
  );

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
            Mass Messaging
          </Typography>
        </Toolbar>
      </AppBar>
      <DrawerMenu open={drawerOpen} onClose={toggleDrawer(false)} /> {/* Ensure DrawerMenu is used here */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8, backgroundColor: darkTheme.palette.background.default }}>
        <Typography variant="h4" gutterBottom color="text.primary">
          Messaging Dashboard
        </Typography>

        {/* Half-Gauge for tracking messages sent */}
        <Box sx={{ mb: 4 }}>
          <Gauge
            value={(messagesSent / 1000) * 100}
            max={100}
            label="Messages Sent"
            angle={180}
            size={200}
            thickness={20}
            color="primary"
          />
        </Box>

        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} md={10}>
            <Card sx={{ backgroundColor: darkTheme.palette.background.paper }}>
              <CardContent>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Search Clients"
                      variant="outlined"
                      fullWidth
                      value={searchTerm}
                      onChange={handleSearchChange}
                      InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                          
                        ),
                        style: { color: darkTheme.palette.text.primary },
                      }}
                      InputLabelProps={{
                        style: { color: darkTheme.palette.text.secondary },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel style={{ color: darkTheme.palette.text.secondary }}>Filter by Status</InputLabel>
                      <Select
                        value={statusFilter}
                        onChange={handleStatusChange}
                        label="Filter by Status"
                        style={{ color: darkTheme.palette.text.primary }}
                      >
                        <MenuItem value="">
                          <em>All</em>
                        </MenuItem>
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Inactive">Inactive</MenuItem>
                        <MenuItem value="Pending">Pending</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ color: darkTheme.palette.text.secondary }}>
                          <Checkbox
                            checked={selectedClients.length === filteredData.length && filteredData.length > 0}
                            indeterminate={selectedClients.length > 0 && selectedClients.length < filteredData.length}
                            onChange={handleSelectAll}
                            style={{ color: darkTheme.palette.text.primary }}
                          />
                        </TableCell>
                        <TableCell style={{ color: darkTheme.palette.text.secondary }}>Avatar</TableCell>
                        <TableCell style={{ color: darkTheme.palette.text.secondary }}>Name</TableCell>
                        <TableCell style={{ color: darkTheme.palette.text.secondary }}>Email</TableCell>
                        <TableCell style={{ color: darkTheme.palette.text.secondary }}>Phone</TableCell>
                        <TableCell style={{ color: darkTheme.palette.text.secondary }}>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredData.map((client) => (
                        <TableRow key={client.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedClients.some((c) => c.id === client.id)}
                              onChange={(event) => handleClientSelection(event, client)}
                              style={{ color: darkTheme.palette.text.primary }}
                            />
                          </TableCell>
                          <TableCell>
                            <Avatar>{client.name[0]}</Avatar>
                          </TableCell>
                          <TableCell>{client.name}</TableCell>
                          <TableCell>{client.email}</TableCell>
                          <TableCell>{client.phone}</TableCell>
                          <TableCell>
                            <Typography
                              variant="body2"
                              color={
                                client.status === 'Active'
                                  ? 'success.main'
                                  : client.status === 'Inactive'
                                  ? 'error.main'
                                  : 'warning.main'
                              }
                            >
                              {client.status}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                  <Button variant="outlined" color="secondary" onClick={toggleModal(true)}>
                    Create Group
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSendMessage}
                    disabled={selectedClients.length === 0}
                  >
                    Send Message
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Modal for creating messaging groups */}
      <Modal open={modalOpen} onClose={toggleModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Create Messaging Group
          </Typography>
          <TextField
            label="Group Name"
            variant="outlined"
            fullWidth
            value={messagingGroupName}
            onChange={(event) => setMessagingGroupName(event.target.value)}
            sx={{ mb: 3 }}
          />
          <Button variant="contained" color="primary" onClick={handleSaveGroup} fullWidth>
            Save Group
          </Button>
        </Box>
      </Modal>

      {/* Modal for selecting message type and composing the message */}
      <Modal open={messageModalOpen} onClose={toggleMessageModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Select Message Type
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Button
              variant={messageType === 'WhatsApp' ? 'contained' : 'outlined'}
              color="success"
              startIcon={<WhatsAppIcon />}
              onClick={() => setMessageType('WhatsApp')}
            >
              WhatsApp
            </Button>
            <Button
              variant={messageType === 'SMS' ? 'contained' : 'outlined'}
              color="primary"
              startIcon={<SmsIcon />}
              onClick={() => setMessageType('SMS')}
            >
              SMS
            </Button>
          </Box>
          <TextField
            label="Message Template"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={messageText}
            onChange={(event) => setMessageText(event.target.value)}
            sx={{ mb: 3 }}
          />
          <Button variant="contained" color="primary" onClick={handleSubmitMessage} fullWidth>
            Send Message
          </Button>
        </Box>
      </Modal>

      {/* Snackbar for success messages */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default MassMessaging;
