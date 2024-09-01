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
  Button,
  Modal,
  Fade,
  Backdrop,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Search from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DrawerMenu from './drawer';  // Ensure this is the correct path to your DrawerMenu component

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

const dummyData = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '098-765-4321', status: 'Inactive' },
  { id: 3, name: 'Sam Wilson', email: 'sam.wilson@example.com', phone: '555-555-5555', status: 'Active' },
  { id: 4, name: 'Alex Johnson', email: 'alex.johnson@example.com', phone: '444-444-4444', status: 'Pending' },
  { id: 5, name: 'Emily Davis', email: 'emily.davis@example.com', phone: '333-333-3333', status: 'Inactive' },
  { id: 6, name: 'Michael Brown', email: 'michael.brown@example.com', phone: '777-777-7777', status: 'Active' },
  { id: 7, name: 'Sarah Parker', email: 'sarah.parker@example.com', phone: '888-888-8888', status: 'Pending' },
  { id: 8, name: 'Daniel Harris', email: 'daniel.harris@example.com', phone: '999-999-9999', status: 'Active' },
];

function Customers() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [newLead, setNewLead] = useState({
    name: '',
    email: '',
    phone: '',
    status: '',
  });

  const toggleDrawer = (open) => () => setDrawerOpen(open);
  const handleSearchChange = (event) => setSearchTerm(event.target.value);
  const handleStatusChange = (event) => setStatusFilter(event.target.value);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewLead((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(newLead); // You can replace this with actual data handling logic
    setModalOpen(false); // Close modal after submission
    setNewLead({ name: '', email: '', phone: '', status: '' }); // Clear form
  };

  const filteredData = dummyData.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === '' || customer.status === statusFilter)
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
            Customer Management
          </Typography>
        </Toolbar>
      </AppBar>
      <DrawerMenu open={drawerOpen} onClose={toggleDrawer(false)} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8, backgroundColor: darkTheme.palette.background.default }}>
        <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h4" color="text.primary">
            Manage Your Customers
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleModalOpen}
            sx={{
              bgcolor: darkTheme.palette.primary.main,
              '&:hover': {
                bgcolor: darkTheme.palette.primary.dark,
              },
            }}
          >
            Add New Lead
          </Button>
        </Grid>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} md={10}>
            <Card sx={{ backgroundColor: darkTheme.palette.background.paper }}>
              <CardContent>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Search Customers"
                      variant="outlined"
                      fullWidth
                      value={searchTerm}
                      onChange={handleSearchChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Search />
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
                        <TableCell style={{ color: darkTheme.palette.text.secondary }}>Avatar</TableCell>
                        <TableCell style={{ color: darkTheme.palette.text.secondary }}>Name</TableCell>
                        <TableCell style={{ color: darkTheme.palette.text.secondary }}>Email</TableCell>
                        <TableCell style={{ color: darkTheme.palette.text.secondary }}>Phone</TableCell>
                        <TableCell style={{ color: darkTheme.palette.text.secondary }}>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredData.map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell>
                            <Avatar>{customer.name[0]}</Avatar>
                          </TableCell>
                          <TableCell>{customer.name}</TableCell>
                          <TableCell>{customer.email}</TableCell>
                          <TableCell>{customer.phone}</TableCell>
                          <TableCell>
                            <Typography
                              variant="body2"
                              color={
                                customer.status === 'Active'
                                  ? 'success.main'
                                  : customer.status === 'Inactive'
                                  ? 'error.main'
                                  : 'warning.main'
                              }
                            >
                              {customer.status}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
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
            <Typography variant="h6" component="h2" color="text.primary" gutterBottom>
              Add New Lead
            </Typography>
            <form onSubmit={handleFormSubmit}>
              <TextField
                label="Name"
                variant="outlined"
                name="name"
                value={newLead.name}
                onChange={handleInputChange}
                fullWidth
                sx={{ mb: 2 }}
                InputProps={{
                  style: { color: darkTheme.palette.text.primary },
                }}
                InputLabelProps={{
                  style: { color: darkTheme.palette.text.secondary },
                }}
              />
              <TextField
                label="Email"
                variant="outlined"
                name="email"
                value={newLead.email}
                onChange={handleInputChange}
                fullWidth
                sx={{ mb: 2 }}
                InputProps={{
                  style: { color: darkTheme.palette.text.primary },
                }}
                InputLabelProps={{
                  style: { color: darkTheme.palette.text.secondary },
                }}
              />
              <TextField
                label="Phone"
                variant="outlined"
                name="phone"
                value={newLead.phone}
                onChange={handleInputChange}
                fullWidth
                sx={{ mb: 2 }}
                InputProps={{
                  style: { color: darkTheme.palette.text.primary },
                }}
                InputLabelProps={{
                  style: { color: darkTheme.palette.text.secondary },
                }}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel style={{ color: darkTheme.palette.text.secondary }}>Status</InputLabel>
                <Select
                  name="status"
                  value={newLead.status}
                  onChange={handleInputChange}
                  label="Status"
                  style={{ color: darkTheme.palette.text.primary }}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                </Select>
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  mt: 2,
                  bgcolor: darkTheme.palette.primary.main,
                  '&:hover': {
                    bgcolor: darkTheme.palette.primary.dark,
                  },
                }}
              >
                Save Lead
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </ThemeProvider>
  );
}

export default Customers;
