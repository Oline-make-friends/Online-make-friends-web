import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { MdMoreVert, MdEdit } from 'react-icons/md';
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";

import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';

export default function UserMoreMenu({userId, banned, ...other}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleStatusUser = () => {
    try {
      axios.post(`http://localhost:8000/user/blockUser/${userId}`);
      window.location.reload();
    } catch (error) {
      toast("check user information");
    }
  };

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <MdMoreVert size={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: "100%" },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem sx={{ color: "text.secondary" }} onClick={handleStatusUser}>
          <ListItemIcon>
            {banned ? <AiFillUnlock size={24} /> : <AiFillLock size={24} />}
          </ListItemIcon>
          <ListItemText
            primary={banned ? "Unban" : "Ban"}
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>

        <MenuItem
          component={RouterLink}
          to={"/profile/" + userId}
          sx={{ color: "text.secondary" }}
        >
          <ListItemIcon>
            <MdEdit size={24} />
          </ListItemIcon>
          <ListItemText
            primary="Edit"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
      </Menu>
    </>
  );
}
