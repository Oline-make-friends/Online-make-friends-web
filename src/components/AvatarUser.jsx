import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Stack, Typography } from "@mui/material";

const AvatarUser = ({id, fullname, avatar}) => {
  const navigate = useNavigate();

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      style={{cursor: "pointer"}}
      onClick={() => {
        navigate("/user/" + id);
      }}
    >
      <Avatar
        alt={fullname}
        src={avatar}
      />
      <Typography variant="subtitle2" noWrap>
        {fullname}
      </Typography>
    </Stack>
  );
};

export default AvatarUser;
