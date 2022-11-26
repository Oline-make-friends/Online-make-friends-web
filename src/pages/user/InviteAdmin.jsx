import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { HiPlus } from "react-icons/hi";

export default function InviteAdmin(){
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState();

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const handleInviteAdmin = async () => {
        try {
          await axios.post("http://localhost:8000/auth/inviteAdmin/" + email);
          setOpen(false);
        } catch (error) {
        }
      };

    return (
      <div>
        <Button variant="outlined" startIcon={<HiPlus />} onClick={handleClickOpen}>
          Invite new admin
        </Button>
        <Dialog open={open}>
          <DialogTitle>Invite Admin</DialogTitle>
          <DialogContent>
            <DialogContentText>Please enter admin email</DialogContentText>
            <TextField
              autoFocus
              variant="standard"
              margin="dense"
              id="email"
              label="Email"
              type="email"
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleInviteAdmin}>Invite</Button>
        </DialogActions>
        </Dialog>
      </div>
    );
}