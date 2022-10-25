import { useRef, useState } from 'react';
import { MdMoreVert } from 'react-icons/md';

import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';

export default function MoreMenu({array, ...other}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <MdMoreVert size={16} style={{marginRight: "0.5"}} />
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
      {array.map((item)=> {
        const { title, icon, action } = item;
        return (<MenuItem sx={{ color: "text.secondary" }} onClick={action}>
          <ListItemIcon>
            {icon}
          </ListItemIcon>
          <ListItemText
            primary={title}
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>)})}
      </Menu>
    </>
  );
}
