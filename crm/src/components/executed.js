import React, { useState } from 'react';
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  Button,
  Tooltip,
  Avatar,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Icon,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import ReportIcon from '@mui/icons-material/Description';
import ReplayIcon from '@mui/icons-material/Replay';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DrawerMenu from './drawer'; // Ensure this points to your custom drawer component

// Define your theme
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
  },
  typography: {
    h6: {
      fontWeight: 600, // Make titles bold
    },
  },
});

// Sample data for executed clients
const executedClientsData = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', executedDate: '2024-01-15', project: 'Website Redesign' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', executedDate: '2024-03-10', project: 'Mobile App Development' },
  { id: 3, name: 'Michael Brown', email: 'michael.brown@example.com', executedDate: '2024-05-22', project: 'Digital Marketing Campaign' },
  // Add more clients as needed
];

// Helper function to get initials from a name
const getInitials = (name) => {
  const nameParts = name.split(' ');
  if (nameParts.length > 1) {
    return nameParts[0][0] + nameParts[1][0];
  } else {
    return nameParts[0][0];
  }
};

// Initial project categories
const initialProjects = [
  'Website Redesign',
  'Mobile App Development',
  'Digital Marketing Campaign',
];

export default function ExecutedClients() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [filters, setFilters] = useState({});
  const [projects, setProjects] = useState(initialProjects);
  const [editProjectDialog, setEditProjectDialog] = useState(false);
  const [newProject, setNewProject] = useState('');
  const [projectToEdit, setProjectToEdit] = useState(null);

  const toggleDrawer = (open) => () => setDrawerOpen(open);
  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const handleDialogOpen = (client) => {
    setSelectedClient(client);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setSelectedClient(null);
    setOpenDialog(false);
  };

  const handleRegenerateReport = (client) => {
    // Logic to regenerate report
    console.log('Regenerating report for:', client);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const handleEditProjectDialogOpen = (project) => {
    setProjectToEdit(project);
    setNewProject(project);
    setEditProjectDialog(true);
  };

  const handleEditProjectDialogClose = () => {
    setProjectToEdit(null);
    setNewProject('');
    setEditProjectDialog(false);
  };

  const handleAddProject = () => {
    if (newProject && !projects.includes(newProject)) {
      setProjects([...projects, newProject]);
      setEditProjectDialog(false);
    }
  };

  const handleUpdateProject = () => {
    if (newProject && projectToEdit) {
      const updatedProjects = projects.map((proj) =>
        proj === projectToEdit ? newProject : proj
      );
      setProjects(updatedProjects);
      setEditProjectDialog(false);
    }
  };

  const handleDeleteProject = (project) => {
    setProjects(projects.filter((proj) => proj !== project));
  };

  // Filter the executed clients based on the search term and additional filters
  const filteredClients = executedClientsData.filter(client =>
    (client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (!filters.project || client.project === filters.project)
  );

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
              Executed Clients
            </Typography>
            <Tooltip title="Filter">
              <IconButton color="inherit" sx={{ marginLeft: 'auto' }}>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>

        <DrawerMenu open={drawerOpen} onClose={toggleDrawer(false)} />

        <Box sx={{ flexGrow: 1, p: 2, mt: 8 }}>
          <Paper sx={{ p: 2, mb: 3 }}>
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
              }}
            />
          </Paper>

          {/* Filters Section */}
          <Box sx={{ mb: 3 }}>
            <Grid container spacing={2}>
              <Grid item>
                <Chip
                  label="All Projects"
                  onClick={() => handleFilterChange('project', '')}
                  color={!filters.project ? 'primary' : 'default'}
                />
              </Grid>
              {projects.map((project, index) => (
                <Grid item key={index}>
                  <Chip
                    label={project}
                    onClick={() => handleFilterChange('project', project)}
                    color={filters.project === project ? 'primary' : 'default'}
                    onDelete={() => handleEditProjectDialogOpen(project)}
                    deleteIcon={<EditIcon />}
                  />
                </Grid>
              ))}
              <Grid item>
                <Chip
                  label="Add Project"
                  icon={<AddIcon />}
                  onClick={() => handleEditProjectDialogOpen('')}
                />
              </Grid>
            </Grid>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: darkTheme.palette.text.secondary }}>Avatar</TableCell>
                  <TableCell style={{ color: darkTheme.palette.text.secondary }}>Client Name</TableCell>
                  <TableCell style={{ color: darkTheme.palette.text.secondary }}>Email</TableCell>
                  <TableCell style={{ color: darkTheme.palette.text.secondary }}>Project</TableCell>
                  <TableCell style={{ color: darkTheme.palette.text.secondary }}>Executed Date</TableCell>
                  <TableCell style={{ color: darkTheme.palette.text.secondary }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <Avatar sx={{ bgcolor: darkTheme.palette.primary.main }}>
                        {getInitials(client.name)}
                      </Avatar>
                    </TableCell>
                    <TableCell>{client.name}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.project}</TableCell>
                    <TableCell>{client.executedDate}</TableCell>
                    <TableCell>
                      <Tooltip title="View Details">
                        <IconButton color="primary" onClick={() => handleDialogOpen(client)}>
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Regenerate Report">
                        <IconButton color="secondary" onClick={() => handleRegenerateReport(client)}>
                          <ReplayIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="View Report">
                        <IconButton color="default">
                          <ReportIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Client Details Dialog */}
        {selectedClient && (
          <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="sm" fullWidth>
            <DialogTitle>Client Details</DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6">{selectedClient.name}</Typography>
                  <Typography variant="body1" color="textSecondary">{selectedClient.email}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Project</Typography>
                  <Typography variant="body2">{selectedClient.project}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Executed Date</Typography>
                  <Typography variant="body2">{selectedClient.executedDate}</Typography>
                </Grid>
                {/* Add more client details here */}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        )}

        {/* Add/Edit Project Dialog */}
        <Dialog open={editProjectDialog} onClose={handleEditProjectDialogClose} maxWidth="sm" fullWidth>
          <DialogTitle>{projectToEdit ? 'Edit Project' : 'Add New Project'}</DialogTitle>
          <DialogContent>
            <TextField
              label="Project Name"
              variant="outlined"
              fullWidth
              value={newProject}
              onChange={(e) => setNewProject(e.target.value)}
              sx={{ mt: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditProjectDialogClose} color="secondary">
              Cancel
            </Button>
            {projectToEdit ? (
              <>
                <Button onClick={handleUpdateProject} color="primary">
                  Update
                </Button>
                <Button onClick={() => handleDeleteProject(projectToEdit)} color="error">
                  Delete
                </Button>
              </>
            ) : (
              <Button onClick={handleAddProject} color="primary">
                Add Project
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}
