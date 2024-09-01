import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { AttachFile, InsertPhoto, Send } from '@mui/icons-material';

export default function WriteEmail({ open, onClose }) {
  const [emailData, setEmailData] = useState({
    to: '',
    cc: '',
    subject: '',
    body: '',
  });

  const handleChange = (e) => {
    setEmailData({ ...emailData, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>New Message</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal">
          <InputLabel>To</InputLabel>
          <OutlinedInput name="to" value={emailData.to} onChange={handleChange} />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>CC</InputLabel>
          <OutlinedInput name="cc" value={emailData.cc} onChange={handleChange} />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Subject"
            name="subject"
            value={emailData.subject}
            onChange={handleChange}
            variant="outlined"
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Message"
            name="body"
            multiline
            rows={4}
            value={emailData.body}
            onChange={handleChange}
            variant="outlined"
          />
        </FormControl>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Box>
            <IconButton>
              <AttachFile />
            </IconButton>
            <IconButton>
              <InsertPhoto />
            </IconButton>
          </Box>
          <Button
            variant="contained"
            color="primary"
            endIcon={<Send />}
            onClick={onClose}
          >
            Send
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
