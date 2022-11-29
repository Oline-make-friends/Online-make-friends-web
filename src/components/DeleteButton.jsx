import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { HiTrash } from "react-icons/hi";

export default function DeleteButton({ type, action }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="error"
        startIcon={<HiTrash />}
        onClick={handleClickOpen}
      >
        Delete
      </Button>
      <Dialog open={open}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>You want to delete this {type}?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={action}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
