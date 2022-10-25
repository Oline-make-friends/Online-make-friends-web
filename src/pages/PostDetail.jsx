import React from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Box
} from "@mui/material";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./Post.css";
import MoreMenu from "../components/MoreMenu";
import { HiTrash } from "react-icons/hi";
import { AiFillDislike, AiFillLike, AiFillMessage } from "react-icons/ai";
import { MdShare } from "react-icons/md";

export default function PostDetail () {
  const { state } = useLocation();
  const post = state.post;
  const { _id, comments, likes, created_by, imageUrl, createdAt, content } = post;
  const POST_INFO = [
    { number: comments.length, icon: <AiFillMessage size={16} style={{marginRight: "0.5"}}/> },
    { number: likes.length, icon: <AiFillLike size={16} style={{marginRight: "0.5"}}/> },
    { number: 94, icon: <AiFillDislike size={16} style={{marginRight: "0.5"}}/> },
    { number: 78, icon: <MdShare size={16} style={{marginRight: "0.5"}}/> },
  ];
  console.log(post);
  const handleDeletePost = async () => {
    try {
      await axios.post("http://localhost:8000/post/delete", {
        id: _id,
      });
      window.location.reload();
      toast.success("delete post success!");
    } catch (error) {
      toast.error("delete post fail!");
    }
  };
  return (
    <Card sx={{ maxWidth: "80%", maxHeight: 900 }}>
      <CardHeader
        avatar={<Avatar src={created_by.avatar_url} alt="avatar" />}
        action={
          <IconButton aria-label="settings">
            <MoreMenu
              array={[{ title: "Delete", icon: <HiTrash />, action: "" }]}
            />
          </IconButton>
        }
        title={created_by.fullname}
        subheader={createdAt}
      />
      {imageUrl != "" && (
        <CardMedia component="img" height="400" image={imageUrl} />
      )}

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {POST_INFO.map((info, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              ml: index === 0 ? 0 : 1.5,
              color: "grey.500",
            }}
          >
            {info.icon}
            <Typography variant="caption">{info.number}</Typography>
          </Box>
        ))}
        <MoreMenu
          array={[
            {
              title: "Delete",
              icon: <HiTrash />,
              action: { handleDeletePost },
            },
          ]}
        />
      </CardActions>
    </Card>
  );
};

