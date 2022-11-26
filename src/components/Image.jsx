import { Dialog, IconButton, styled } from "@mui/material";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  top:50,
  right:50,
  color: 'white'
}));

export default function Image({image, alt, ...others}) {
  console.log(image)
  console.log(alt)
  const [open, setOpen] = useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div style={{ cursor: "pointer", zIndex: "999" }}>
      <img
        src={image}
        alt={alt}
        onClick={() => {
          handleOpen();
        }}
        {...others}
      />

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: { borderRadius: 0, backgroundColor: "transparent" },
        }}
      >
        <CloseButton onClick={handleClose}>
          <AiOutlineClose size={50} />
        </CloseButton>
        <img src={image} alt={alt} />
      </Dialog>
    </div>
  );
}
