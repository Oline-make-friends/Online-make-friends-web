import { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from "axios";

import { HiPlus } from "react-icons/hi";

import { Grid, Button, Container, Stack, Typography } from '@mui/material';

import Page from '../components/Page';
import { PostCard, PostsSort, PostsSearch } from '../sections/post';

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

export default function Post() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const handleGetAllPost = async () => {
    try {
      const res = await axios.get("http://localhost:8000/post/getAll");
      toast.success("get post success!");
      setPosts(res.data);
      console.log(res.data);
    } catch (error) {
      toast.error("get post fail!");
    }
  };

  useEffect(() => {
    handleGetAllPost();
    // eslint-disable-next-line
  }, []);

  return (
    <Page title="Post">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Post
          </Typography>
          <Button variant="contained" component={RouterLink} to="#" startIcon={<HiPlus />}>
            New Post
          </Button>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <PostsSearch posts={posts} />
          <PostsSort options={SORT_OPTIONS} />
        </Stack>

        <Grid container spacing={3}>
          {posts.map((post, index) => (
            <PostCard key={post._id} post={post} index={index} />
          ))}
        </Grid>
      </Container>
    </Page>
  );
}
