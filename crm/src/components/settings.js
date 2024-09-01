import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
  IconButton,
  Switch,
  TextField,
  Button,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  AppBar,
  Toolbar,
  CssBaseline,
  InputAdornment,
  MenuItem,
  Avatar,
  FormControlLabel,
  FormGroup,
  Select,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SecurityIcon from '@mui/icons-material/Security';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import ApiIcon from '@mui/icons-material/Api';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import MenuIcon from '@mui/icons-material/Menu';
import SaveIcon from '@mui/icons-material/Save';
import RestoreIcon from '@mui/icons-material/Restore';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ColorLensIcon from '@mui/icons-material/ColorLens';

import DrawerMenu from './drawer';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

// Define a dynamic theme that can be customized by the user
const defaultTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196f3',
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

// Sections Configuration
const allSections = [
  { id: 'security', title: 'Security', icon: <LockIcon/>, roles: ['admin', 'user'] },
  { id: 'credentials', title: 'Credentials', icon: <LockIcon />, roles: ['admin', 'user'] },
  { id: 'emailIntegration', title: 'Email Integration', icon: <EmailIcon />, roles: ['admin'] },
  { id: 'apiKeys', title: 'API Keys', icon: <VpnKeyIcon />, roles: ['admin'] },
  { id: 'notifications', title: 'Notifications', icon: <NotificationsIcon />, roles: ['user'] },
  { id: 'biometrics', title: 'Biometrics', icon: <FingerprintIcon />, roles: ['admin', 'user'] },
  { id: 'appearance', title: 'Appearance', icon: <ToggleOnIcon />, roles: ['admin', 'user'] },
  { id: 'privacy', title: 'Privacy', icon: <LockIcon />, roles: ['admin', 'user'] },
  { id: 'integrations', title: 'Integrations', icon: <ApiIcon />, roles: ['admin'] },
  { id: 'backup', title: 'Backup & Restore', icon: <RestoreIcon />, roles: ['admin'] },
  { id: 'account', title: 'Account Settings', icon: <SecurityIcon />, roles: ['user'] },
  { id: 'sessions', title: 'Active Sessions', icon: <SecurityIcon />, roles: ['admin'] },
  { id: 'pushNotifications', title: 'Push Notifications', icon: <NotificationsIcon />, roles: ['user'] },
  { id: 'connections', title: 'Connected Apps', icon: <ApiIcon />, roles: ['admin'] },
  { id: 'logs', title: 'Activity Logs', icon: <SecurityIcon />, roles: ['admin'] },
];

export default function Settings() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [userRole, setUserRole] = useState('user'); // Example: Can be switched to 'admin'
  const [sections, setSections] = useState(allSections.filter((section) => section.roles.includes(userRole)));
  const [theme, setTheme] = useState(defaultTheme);
  const [openAIKeyInvalid, setOpenAIKeyInvalid] = useState(false);
  const [emailKeyInvalid, setEmailKeyInvalid] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleOpenModal = (section) => {
    setSelectedSection(section);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSaveChanges = () => {
    console.log('Changes saved');
    setOpenModal(false);
  };

  const handleRoleChange = (event) => {
    setUserRole(event.target.value);
    setSections(allSections.filter((section) => section.roles.includes(event.target.value)));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedSections = Array.from(sections);
    const [movedSection] = reorderedSections.splice(result.source.index, 1);
    reorderedSections.splice(result.destination.index, 0, movedSection);
    setSections(reorderedSections);
  };

  const validateAPIKey = (value) => {
    setOpenAIKeyInvalid(value.length !== 32);
  };

  const validateEmailKey = (value) => {
    setEmailKeyInvalid(!/^[a-zA-Z0-9]{20,}$/.test(value));
  };

  const handleThemeChange = (event) => {
    const { name, value } = event.target;
    setTheme((prevTheme) => ({
      ...prevTheme,
      palette: {
        ...prevTheme.palette,
        [name]: { main: value },
      },
    }));
  };

  return (
    <ThemeProvider theme={theme}>
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
              Settings
            </Typography>
            <Box sx={{ ml: 'auto' }}>
              <FormControlLabel
                control={<Switch checked={theme.palette.mode === 'dark'} onChange={(e) => setTheme(createTheme({ palette: { mode: e.target.checked ? 'dark' : 'light' } }))} />}
                label="Dark Mode"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={userRole === 'admin'}
                    onChange={(e) => handleRoleChange({ target: { value: e.target.checked ? 'admin' : 'user' } })}
                  />
                }
                label="Admin Mode"
              />
            </Box>
          </Toolbar>
        </AppBar>

        <DrawerMenu open={drawerOpen} onClose={toggleDrawer(false)} />

        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
          <Typography variant="h2" align="center" gutterBottom>
            Settings
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" gutterBottom>
            Customize Your Experience
          </Typography>

          <Divider sx={{ my: 4 }} />

          {/* Theme Customization */}
          <Paper elevation={4} sx={{ p: 4, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Theme Customization
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Primary Color"
                type="color"
                name="primary"
                defaultValue={theme.palette.primary.main}
                onChange={handleThemeChange}
                sx={{ flex: 1 }}
              />
              <TextField
                label="Secondary Color"
                type="color"
                name="secondary"
                defaultValue={theme.palette.secondary.main}
                onChange={handleThemeChange}
                sx={{ flex: 1 }}
              />
            </Box>
          </Paper>

          {/* Settings Sections */}
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="sections">
              {(provided) => (
                <Grid container spacing={4} ref={provided.innerRef} {...provided.droppableProps}>
                  {sections.map((section, index) => (
                    <Draggable key={section.id} draggableId={section.id} index={index}>
                      {(provided) => (
                        <Grid
                          item
                          xs={12}
                          md={6}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Paper elevation={4} sx={{ p: 4, display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
                              {section.icon}
                            </Avatar>
                            <Box sx={{ flexGrow: 1 }}>
                              <Typography variant="h6" gutterBottom>
                                {section.title}
                              </Typography>
                              <Typography variant="body2" color="textSecondary" gutterBottom>
                                Manage and configure your {section.title.toLowerCase()} settings.
                              </Typography>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleOpenModal(section)}
                                sx={{ mt: 1 }}
                              >
                                Configure
                              </Button>
                            </Box>
                            <IconButton {...provided.dragHandleProps}>
                              <DragIndicatorIcon />
                            </IconButton>
                          </Paper>
                        </Grid>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Grid>
              )}
            </Droppable>
          </DragDropContext>
        </Box>

        {/* Modal for Section Configuration */}
        <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
          <DialogTitle>
            <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
              {selectedSection ? selectedSection.icon : ''}
            </Avatar>
            {selectedSection ? selectedSection.title : 'Settings'}
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1" gutterBottom>
              Configure your {selectedSection ? selectedSection.title.toLowerCase() : ''} settings here.
            </Typography>
            <Divider sx={{ my: 2 }} />
            {/* Example Toggle Setting */}
            <List>
              <ListItem>
                <ListItemText primary="Enable Feature X" />
                <ListItemSecondaryAction>
                  <Switch edge="end" />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText primary="Enable Feature Y" />
                <ListItemSecondaryAction>
                  <Switch edge="end" />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
            {/* Example TextField for API Key */}
            {selectedSection && selectedSection.id === 'apiKeys' && (
              <>
                <TextField
                  label="OpenAI API Key"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VpnKeyIcon />
                      </InputAdornment>
                    ),
                  }}
                  error={openAIKeyInvalid}
                  helperText={openAIKeyInvalid ? "Invalid API Key" : ""}
                  onChange={(e) => validateAPIKey(e.target.value)}
                />
                <TextField
                  label="Email Integration API Key"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                  error={emailKeyInvalid}
                  helperText={emailKeyInvalid ? "Invalid API Key" : ""}
                  onChange={(e) => validateEmailKey(e.target.value)}
                />
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="secondary">
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}
