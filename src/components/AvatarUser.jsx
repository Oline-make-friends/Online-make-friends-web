import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Stack, Typography } from "@mui/material";
import axios from "axios";

const AvatarUser = ({ id, fullname, avatar }) => {
  const navigate = useNavigate();
  const handleGetUser = async () => {
    try {
      const res = await axios.post("http://localhost:8000/user/getUser/" + id);
      setUser(res.data);
      console.log(res.data);
    } catch (error) {}
  };
  const [user, setUser] = useState({});

  useEffect(() => {
    handleGetUser();
    // eslint-disable-next-line
  }, []);

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      style={{ cursor: "pointer" }}
      onClick={() => {
        navigate("/user/" + id);
      }}
    >
      <Avatar alt={fullname} src={user?.avatar_url} />
      <Typography variant="subtitle2" noWrap>
        {user?.fullname}
      </Typography>
    </Stack>
  );
};

export default AvatarUser;
