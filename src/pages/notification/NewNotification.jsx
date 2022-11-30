import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { HiPlus } from "react-icons/hi";
import { useSelector } from "react-redux";
import * as CONSTANT from "../../constans/constans";

export default function NewNotification() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  const [snackBar, setSnackBar] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [alertType, setAlertType] = useState("");

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBar(false);
  };

  const admin = useSelector((state) => state.auth?.login.currentUser);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSendNoti = async () => {
    try {
      await axios.post(`${CONSTANT.SERVER}/noti/add`, {
        title: title,
        content: content,
        user_id: admin._id,
      });
      handleClose();
      setSnackBar(true);
      setAlertContent("Your notification have been created!");
      setAlertType("success");
    } catch (error) {
      setSnackBar(true);
      setAlertContent("Fail to create your notification!");
      setAlertType("error");
    }
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={snackBar}
        autoHideDuration={5000}
        onClose={handleCloseSnackBar}
      >
        <Alert
          variant="filled"
          onClose={handleCloseSnackBar}
          severity={alertType}
          sx={{ color: "#fff" }}
        >
          {alertContent}
        </Alert>
      </Snackbar>
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
