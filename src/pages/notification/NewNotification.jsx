import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { HiPlus } from "react-icons/hi";
import { useSelector } from "react-redux";

export default function NewNotification() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  const admin = useSelector((state) => state.auth?.login.currentUser);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSendNoti = async () => {
    try {
      await axios.post("http://localhost:8000/noti/add",{
        title: title,
        content: content,
        user_id: admin._id
      });
      setOpen(false);
    } catch (error) {
    }
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="info"
        startIcon={<HiPlus />}
        onClick={handleClickOpen}
      >
        New Notification
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New notification</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            If you send a notification here, every user can receive it.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            autoFocus
            multiline
            rows={10}
            margin="dense"
            id="content"
            label="Content"
            type="text"
            fullWidth
            onChange={(e) => setContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSendNoti}>Send Notification</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
