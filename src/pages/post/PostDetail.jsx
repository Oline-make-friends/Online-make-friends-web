import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";

import { AiFillDislike, AiFillLike, AiFillMessage } from "react-icons/ai";
import { MdShare } from "react-icons/md";
import "reactjs-popup/dist/index.css";

import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Box,
  Button,
} from "@mui/material";

import LinkBar from "../../components/LinkBar";
import Page from "../../components/Page";

export default function PostDetail() {
  const styles = {
    media: {
      maxHeight: "580px",
    },
  };
  const { state } = useLocation();
  const { isGroup } = state;
  const navigate = useNavigate();
  const { _id } = useParams();
  // const { isGroup } = useLocation();
  const [post, setPost] = useState();

  const handleGetPostById = async () => {
    try {
      console.log(handleGetPostById);
      const rest = await axios.post(
        "http://localhost:8000/post/getPost/" + _id
      );
      setPost(rest.data);
      console.log(post);
    } catch (error) {}
  };

  useEffect(() => {
    handleGetPostById();
    // eslint-disable-next-line
  }, []);

  console.log(post);

  const POST_INFO = [
    {
      number: post?.comments.length,
      icon: <AiFillMessage size={16} style={{ marginRight: "0.5" }} />,
    },
    {
      number: post?.likes.length,
      icon: <AiFillLike size={16} style={{ marginRight: "0.5" }} />,
    },
    {
      number: 94,
      icon: <AiFillDislike size={16} style={{ marginRight: "0.5" }} />,
    },
    { number: 78, icon: <MdShare size={16} style={{ marginRight: "0.5" }} /> },
  ];

  const BREADCRUMBS = [
    { label: "Dashboard", href: "dashboard" },
    { label: "Posts", href: "/posts" },
    { label: post?.title, href: "#" },
  ];

  const handleDeletePost = async () => {
    try {
      await axios.post(`http://localhost:8000/post/delete/` + _id);
      if (isGroup === true) {
        navigate(-1);
        return;
      }
      navigate("/posts");
      toast.success("delete post success!");
    } catch (error) {
      toast.error("delete post fail!");
    }
  };

  return (
    <Page title="Posts">
      <LinkBar array={BREADCRUMBS} />
      <Card sx={{ maxWidth: "80%", maxHeight: 900 }}>
        <CardHeader
          style={{ cursor: "pointer" }}
          avatar={<Avatar src={post?.created_by.avatar_url} alt="avatar" />}
          // action={
          //   <IconButton aria-label="settings">
          //     <MoreMenu
          //       array={[{ title: "Delete", icon: <HiTrash />, action: "" }]}
          //     />
          //   </IconButton>
          //   <Button>Delete</Button>
          // }
          title={post?.created_by.fullname}
          subheader={post?.createdAt?.substring(0, 10)}
          onClick={() => {
            navigate("/user/" + post?.created_by._id);
          }}
        />
        {post?.imageUrl !== "" && (
          <CardMedia
            component="img"
            height="400"
            image={post?.imageUrl}
            style={styles.media}
          />
        )}

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {post?.content}
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
        </CardActions>
      </Card>
    </Page>
  );
}
