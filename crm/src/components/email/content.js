import React, { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Button,
  Divider,
  Snackbar,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Grid,
} from '@mui/material';
import {
  ReplyRounded as ReplyIcon,
  ForwardToInboxRounded as ForwardIcon,
  DeleteRounded as DeleteIcon,
  CheckCircleRounded as CheckCircleIcon,
  Folder as FolderIcon,
} from '@mui/icons-material';

export default function EmailContent({ email }) {
  const [snackbarOpen, setSnackbarOpen] = useState([false, false, false]);

  const handleSnackbarOpen = (index) => {
    const updatedSnackbarOpen = [...snackbarOpen];
    updatedSnackbarOpen[index] = true;
    setSnackbarOpen(updatedSnackbarOpen);
  };

  const handleSnackbarClose = (index) => {
    const updatedSnackbarOpen = [...snackbarOpen];
    updatedSnackbarOpen[index] = false;
    setSnackbarOpen(updatedSnackbarOpen);
  };

  return (
    <Box sx={{ p: 3, borderRadius: 3, boxShadow: 3, backgroundColor: 'background.paper' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Avatar src={email.avatar} alt={email.name} sx={{ width: 56, height: 56 }} />
        <Box sx={{ ml: 3 }}>
          <Typography variant="h6" fontWeight="bold">
            {email.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {email.date}
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ mb: 3 }} />
      <Typography variant="h5" sx={{ my: 3 }} fontWeight="bold">
        {email.title}
      </Typography>
      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
          {email.body}
        </Typography>
      </Box>
      <Divider sx={{ mb: 3 }} />
      <Typography variant="h6" sx={{ mt: 3 }} fontWeight="bold">
        Attachments
      </Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardMedia
              component="img"
              alt="Yosemite"
              height="140"
              image="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&h=160"
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardMedia
              component="img"
              alt="Yosemite"
              height="140"
              image="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&h=160"
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
            <FolderIcon />
            <Box sx={{ ml: 2 }}>
              <Typography variant="body2">videos-hike.zip</Typography>
              <Typography variant="caption">100 MB</Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
      <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<ReplyIcon />}
          onClick={() => handleSnackbarOpen(0)}
        >
          Reply
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<ForwardIcon />}
          onClick={() => handleSnackbarOpen(1)}
        >
          Forward
        </Button>
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => handleSnackbarOpen(2)}
        >
          Delete
        </Button>
      </Box>
      <Snackbar
        open={snackbarOpen[0]}
        onClose={() => handleSnackbarClose(0)}
        message="Your message has been sent."
        autoHideDuration={6000}
        action={<CheckCircleIcon />}
      />
      <Snackbar
        open={snackbarOpen[1]}
        onClose={() => handleSnackbarClose(1)}
        message="Your message has been forwarded."
        autoHideDuration={6000}
        action={<CheckCircleIcon />}
      />
      <Snackbar
        open={snackbarOpen[2]}
        onClose={() => handleSnackbarClose(2)}
        message="Your message has been deleted."
        autoHideDuration={6000}
        action={<CheckCircleIcon />}
      />
    </Box>
  );
}
