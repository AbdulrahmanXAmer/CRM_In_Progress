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
  IconButton as MuiIconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmailIcon from '@mui/icons-material/Email';
import SearchIcon from '@mui/icons-material/Search';
import DrawerMenu from './drawer';  // Ensure this is the correct path to your DrawerMenu component
import { Gauge } from '@mui/x-charts';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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

// Updated dummy data with tracking for emails sent by the business
const dummyData = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890', status: 'Active', emailsReceived: 500 },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '098-765-4321', status: 'Inactive', emailsReceived: 200 },
  { id: 3, name: 'Sam Wilson', email: 'sam.wilson@example.com', phone: '555-555-5555', status: 'Active', emailsReceived: 800 },
  { id: 4, name: 'Alex Johnson', email: 'alex.johnson@example.com', phone: '444-444-4444', status: 'Pending', emailsReceived: 100 },
  { id: 5, name: 'Emily Davis', email: 'emily.davis@example.com', phone: '333-333-3333', status: 'Inactive', emailsReceived: 300 },
  { id: 6, name: 'Michael Brown', email: 'michael.brown@example.com', phone: '777-777-7777', status: 'Active', emailsReceived: 700 },
  { id: 7, name: 'Sarah Parker', email: 'sarah.parker@example.com', phone: '888-888-8888', status: 'Pending', emailsReceived: 400 },
  { id: 8, name: 'Daniel Harris', email: 'daniel.harris@example.com', phone: '999-999-9999', status: 'Active', emailsReceived: 600 },
];

function MassEmail() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedClients, setSelectedClients] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [messagingGroupName, setMessagingGroupName] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [emailAttachments, setEmailAttachments] = useState([]);
  const [emailsSent, setEmailsSent] = useState(0);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const toggleDrawer = (open) => () => setDrawerOpen(open);
  const toggleModal = (open) => () => setModalOpen(open);
  const toggleEmailModal = (open) => () => setEmailModalOpen(open);

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

  const handleSendEmail = () => {
    // Open the email composition modal
    setEmailModalOpen(true);
  };

  const handleSaveGroup = () => {
    // Logic to save the messaging group
    console.log('Saving group:', messagingGroupName, selectedClients);
    setModalOpen(false);
    setAlertMessage('Group created successfully!');
    setAlertOpen(true);
  };

  const handleSubmitEmail = () => {
    const totalEmails = selectedClients.length;
    setEmailsSent(emailsSent + totalEmails);  // Increment emails sent count
    console.log(`Sending email to:`, selectedClients);
    console.log('Subject:', emailSubject);
    console.log('Body:', emailBody);
    console.log('Attachments:', emailAttachments);
    setEmailModalOpen(false);
    setAlertMessage('Email sent successfully!');
    setAlertOpen(true);
  };

  const handleAddAttachment = (event) => {
    setEmailAttachments([...emailAttachments, ...event.target.files]);
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
            Mass Email
          </Typography>
        </Toolbar>
      </AppBar>
      <DrawerMenu open={drawerOpen} onClose={toggleDrawer(false)} /> {/* Ensure DrawerMenu is used here */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8, backgroundColor: darkTheme.palette.background.default }}>
        <Typography variant="h4" gutterBottom color="text.primary">
          Email Dashboard
        </Typography>

        {/* Half-Gauge for tracking emails sent */}
        <Box sx={{ mb: 4 }}>
          <Gauge
            value={(emailsSent / 1000) * 100}
            max={100}
            label="Emails Sent"
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
                      onClick={handleSendEmail}
                      disabled={selectedClients.length === 0}
                    >
                      Send Email
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
              Create Email Group
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
  
        {/* Modal for composing the email */}
        <Modal open={emailModalOpen} onClose={toggleEmailModal(false)}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 600,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Compose Email
            </Typography>
            <TextField
              label="Subject"
              variant="outlined"
              fullWidth
              value={emailSubject}
              onChange={(event) => setEmailSubject(event.target.value)}
              sx={{ mb: 2 }}
            />
            <ReactQuill
              value={emailBody}
              onChange={setEmailBody}
              placeholder="Type your email here..."
              theme="snow"
              style={{ height: '150px', marginBottom: '20px' }}
            />
            <Button
              variant="contained"
              component="label"
              startIcon={<AttachFileIcon />}
              sx={{ mb: 3 }}
            >
              Attach Files
              <input
                type="file"
                hidden
                multiple
                onChange={handleAddAttachment}
              />
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmitEmail} fullWidth>
              Send Email
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
  
  export default MassEmail;
  
