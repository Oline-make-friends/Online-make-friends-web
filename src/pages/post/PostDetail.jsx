import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { filter } from "lodash";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";

import "reactjs-popup/dist/index.css";

import {
  Card,
  Typography,
  Box,
  Container,
  Tab,
  Grid,
  TableContainer,
  Divider,
  Table,
  TableBody,
  TablePagination,
  TableRow,
  TableCell,
  Stack,
  Button,
} from "@mui/material";

import LinkBar from "../../components/LinkBar";
import Page from "../../components/Page";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import AvatarUser from "../../components/AvatarUser";
import Image from "../../components/Image";
import Label from "../../components/Label";
import { sentenceCase } from "change-case";
import { TableHeader, TableToolbar } from "../../components/table";
import Scrollbar from "../../components/Scrollbar";
import SearchNotFound from "../../components/SearchNotFound";
import { HiTrash } from "react-icons/hi";
import InfoItem from "../../components/InfoItem";

const LIKE_TABLE_HEAD = [
  { id: "fullname", label: "User", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "gender", label: "Gender", alignRight: false },
  { id: "location", label: "Location", alignRight: false },
  { id: "major", label: "Major", alignRight: false },
  { id: "is_admin", label: "Role", alignRight: false },
  { id: "createAt", label: "Created Day", alignRight: false },
  { id: "is_active", label: "Status", alignRight: false },
];

const COMMENT_TABLE_HEAD = [
  { id: "creator", label: "Creator", alignRight: false },
  { id: "content", label: "Content", alignRight: false },
  { id: "is_deleted", label: "Status", alignRight: false },
  { id: "createAt", label: "Created Day", alignRight: false },
  { id: "updatedAt", label: "Updated Day", alignRight: false },
];

function OverViewTab({ post }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={8}>
        <TableContainer component={Card} sx={{ padding: 2 }}>
          <Typography variant="subtitle1" mb={2}>
            Basic Information
          </Typography>
          <Divider />

          <Table sx={{ minWidth: 500 }}>
            <TableBody>
              <InfoItem
                title="Creator"
                value={<AvatarUser id={post?.created_by._id} />}
                isRequired
              />
              <InfoItem title="Content" value={post?.content} />
              <InfoItem
                title="Hashtag"
                value={
                  <Label variant="ghost" color="info">
                    {post?.hashtag}
                  </Label>
                }
              />
              <InfoItem
                title="Image"
                value={
                  post?.imageUrl != null && (
                    <Image
                      image={post?.imageUrl}
                      style={{ borderRadius: 10, width: 122, height: 122 }}
                    />
                  )
                }
              />
              <InfoItem
                title="Status"
                value={
                  <Label
                    variant="ghost"
                    color={post?.is_deleted ? "error" : "success"}
                  >
                    {sentenceCase(post?.is_deleted === true ? "Deleted" : "Active")}
                  </Label>
                }
                isRequired
              />
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={6} md={4}>
        <TableContainer component={Card} sx={{ padding: 2 }}>
          <Typography variant="subtitle1" mb={2}>
            Post Configuration
          </Typography>
          <Divider />

          <Table sx={{ minWidth: 500 }}>
            <TableBody>
              <InfoItem
                title="Create At"
                value={post?.createdAt.substring(0, 10)}
                isRequired
              />
              <InfoItem title="Update At" value={post?.updatedAt.substring(0, 10)} />
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

function LikesTab({ likes }) {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const filteredUsers = applyFilter(likes, filterName);

  const isUserNotFound = filteredUsers.length === 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function applyFilter(array, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    if (query) {
      return filter(
        array,
        (_user) => _user.name.to.indexOf(query.toLowerCase()) !== -1
      );
    }
    return stabilizedThis.map((el) => el[0]);
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - likes.length) : 0;

  return (
    <Card>
      <TableToolbar />

      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <TableHeader headLabel={LIKE_TABLE_HEAD} rowCount={likes.length} />
            <TableBody>
              {likes
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const {
                    _id,
                    avatar_url,
                    fullname,
                    username,
                    gender,
                    location,
                    major,
                    is_admin,
                    createdAt,
                    is_active,
                  } = row;
                  console.log(_id);
                  return (
                    <TableRow hover key={_id} tabIndex={-1}>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          navigate("/user/" + _id);
                          window.location.reload();
                        }}
                      >
                        <AvatarUser
                          id={_id}
                          fullname={fullname}
                          avatar={avatar_url}
                        />
                      </TableCell>
                      <TableCell align="left">{username}</TableCell>
                      <TableCell align="left">{gender}</TableCell>
                      <TableCell align="left">{location}</TableCell>
                      <TableCell align="left">{major}</TableCell>
                      <TableCell align="left">
                        {is_admin ? "Admin" : "Member"}
                      </TableCell>
                      <TableCell align="left">
                        {createdAt.toString().substring(0, 10)}
                      </TableCell>
                      <TableCell align="left">
                        <Label
                          variant="ghost"
                          color={is_active ? "success" : "error"}
                        >
                          {sentenceCase(
                            is_active === true ? "active" : "banned"
                          )}
                        </Label>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>

            {isUserNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                    <SearchNotFound searchQuery={filterName} />
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Scrollbar>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={likes.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
}

function CommentsTab({ comments }) {

  const [page, setPage] = useState(0);
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const filteredComments = applyFilter(comments, filterName);

  const isPostNotFound = filteredComments.length === 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function applyFilter(array, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    if (query) {
      return filter(
        array,
        (comment) => comment.content.to.indexOf(query.toLowerCase()) !== -1
      );
    }
    return stabilizedThis.map((el) => el[0]);
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - comments.length) : 0;

  return (
    <Card>
      <TableToolbar />

      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <TableHeader
              headLabel={COMMENT_TABLE_HEAD}
              rowCount={comments.length}
            />
            <TableBody>
              {comments
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const {
                    _id,
                    content,
                    user_id,
                    is_deleted,
                    createdAt,
                    updatedAt,
                  } = row;
                  return (
                    <TableRow hover key={_id} tabIndex={-1}>
                      <TableCell>
                        <AvatarUser id={user_id} />
                      </TableCell>
                      <TableCell align="left">{content}</TableCell>
                      <TableCell align="left">
                        <Label
                          variant="ghost"
                          color={is_deleted ? "error" : "success"}
                        >
                          {is_deleted?"Deleted":"Active"}
                        </Label>
                      </TableCell>
                      <TableCell align="left">
                        {createdAt.toString().substring(0, 10)}
                      </TableCell>
                      <TableCell align="left">
                        {updatedAt.toString().substring(0, 10)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>

            {isPostNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                    <SearchNotFound searchQuery={filterName} />
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Scrollbar>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={comments.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
}

export default function PostDetail() {
  const { state } = useLocation();
  const { isPost } = state;
  const navigate = useNavigate();
  const { _id } = useParams();
  // const { isPost } = useLocation();
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

  const BREADCRUMBS = [
    { label: "Dashboard", href: "dashboard" },
    { label: "Posts", href: "/posts" },
    { label: "Post Detail", href: "#" },
  ];

  const handleDeletePost = async () => {
    try {
      await axios.post(`http://localhost:8000/post/delete/` + _id);
      if (isPost === true) {
        navigate(-1);
        return;
      }
      navigate("/posts");
      toast.success("delete post success!");
    } catch (error) {
      toast.error("delete post fail!");
    }
  };

  const [tab, setTab] = useState("overview");
  const handleTab = (event, newTab) => {
    console.log(newTab);
    setTab(newTab);
  };

  return (
    <Page title="Post Detail">
      <LinkBar array={BREADCRUMBS} />
      <Container>
        <Card sx={{ padding: 2 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="subtitle1">Post Detail</Typography>
            <Button
              variant="outlined"
              color="error"
              startIcon={<HiTrash />}
              onClick={handleDeletePost}
            >
              Delete
            </Button>
          </Stack>
          <TabContext value={tab} onChange={handleTab}>
            <Box>
              <TabList onChange={handleTab}>
                <Tab value="overview" label="Overview" />
                <Tab value="likes" label="Likes" />
                <Tab value="comments" label="Comments" />
              </TabList>
            </Box>
            <TabPanel value="overview">
              <OverViewTab post={post} />
            </TabPanel>
            <TabPanel value="likes">
              <LikesTab likes={post?.likes} />
            </TabPanel>
            <TabPanel value="comments">
              <CommentsTab comments={post?.comments} />
            </TabPanel>
          </TabContext>
        </Card>
      </Container>
    </Page>
  );
}
