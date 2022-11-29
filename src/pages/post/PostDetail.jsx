import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { filter } from "lodash";
import { useNavigate } from "react-router";
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
  Snackbar,
  Alert,
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
import InfoItem from "../../components/InfoItem";
import {
  FILTER_DELETED_STATUS_OPTIONS,
  FILTER_GENDER_OPTIONS,
  FILTER_STATUS_OPTIONS,
  USER_TABLE_HEAD,
} from "../../constans/constans";
import DeleteButton from "../../components/DeleteButton";

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
                  <Label variant="ghost" color="warning">
                    #{post?.hashtag}
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
                    {sentenceCase(
                      post?.is_deleted === true ? "Deleted" : "Not Deleted"
                    )}
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
              <InfoItem
                title="Update At"
                value={post?.updatedAt.substring(0, 10)}
              />
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
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [genderQuery, setGenderQuery] = useState("");
  const [statusQuery, setStatusQuery] = useState("");

  function applyFilter(array, searchQuery, genderQuery, statusQuery) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    var filteredList = array;
    if (searchQuery || genderQuery || statusQuery) {
      if (searchQuery) {
        filteredList = filter(
          filteredList,
          (_user) =>
            _user.fullname
              .trim()
              .toLowerCase()
              .indexOf(searchQuery.trim().toLowerCase()) !== -1 ||
            _user.username
              .trim()
              .toLowerCase()
              .indexOf(searchQuery.trim().toLowerCase()) !== -1
        );
      }
      if (genderQuery) {
        filteredList = filter(
          filteredList,
          (_user) => _user.gender.toLowerCase() === genderQuery.toLowerCase()
        );
      }
      if (statusQuery) {
        filteredList = filter(
          filteredList,
          (_user) => _user.is_active.toString() === statusQuery.toLowerCase()
        );
      }
      return filteredList;
    }
    return stabilizedThis.map((el) => el[0]);
  }

  const filteredUsers = applyFilter(
    likes,
    searchQuery,
    genderQuery,
    statusQuery
  );

  const isUserNotFound = filteredUsers.length === 0;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredUsers.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchQuery = (event) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const handleGenderQuery = (event) => {
    setGenderQuery(event.target.value);
    setPage(0);
  };

  const handleStatusQuery = (event) => {
    setStatusQuery(event.target.value);
    setPage(0);
  };

  const FILTER_CONDITIONS = [
    {
      type: "input",
      query: searchQuery,
      label: "Search by Fullname, Email...",
      onChange: handleSearchQuery,
    },
    {
      type: "select",
      query: genderQuery,
      label: "Gender",
      onChange: handleGenderQuery,
      items: FILTER_GENDER_OPTIONS,
    },
    {
      type: "select",
      query: statusQuery,
      label: "Status",
      onChange: handleStatusQuery,
      items: FILTER_STATUS_OPTIONS,
    },
  ];

  return (
    <Card>
      <TableToolbar conditions={FILTER_CONDITIONS} />

      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <TableHeader
              headLabel={USER_TABLE_HEAD}
              rowCount={filteredUsers.length}
            />
            <TableBody>
              {filteredUsers
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
                    <SearchNotFound searchQuery={searchQuery} />
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
        count={filteredUsers.length}
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
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [creatorQuery, setCreatorQuery] = useState("");
  const [statusQuery, setStatusQuery] = useState("");
  const [creatorList, setCreatorList] = useState([]);

  const filteredComments = applyFilter(
    comments,
    searchQuery,
    creatorQuery,
    statusQuery
  );

  const isCommentNotFound = filteredComments.length === 0;

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - filteredComments.length)
      : 0;

  const handleGetAllCreator = async () => {
    try {
      const res = await axios.get("http://localhost:8000/user/getAllUser");
      const temp = [{ value: "", display: "All" }];
      for (let i = 0; i < res.data.length; i++) {
        temp.push({
          value: res.data[i]._id,
          display: res.data[i].fullname,
        });
      }
      setCreatorList(
        temp.sort(function (a, b) {
          if (a.display.toLowerCase() === "all") return -1;
          if (b.display.toLowerCase() === "all") return 1;
          if (a.display.toLowerCase() < b.display.toLowerCase()) return -1;
          if (a.display.toLowerCase() > b.display.toLowerCase()) return 1;
          return 0;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAllCreator();
    // eslint-disable-next-line
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchQuery = (event) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const handleCreatorQuery = (event) => {
    setCreatorQuery(event.target.value);
    setPage(0);
  };

  const handleStatusQuery = (event) => {
    setStatusQuery(event.target.value);
    setPage(0);
  };

  const FILTER_CONDITIONS = [
    {
      type: "input",
      query: searchQuery,
      label: "Search by Content...",
      onChange: handleSearchQuery,
    },
    {
      type: "select",
      query: creatorQuery,
      label: "Creator",
      onChange: handleCreatorQuery,
      items: creatorList,
    },
    {
      type: "select",
      query: statusQuery,
      label: "Status",
      onChange: handleStatusQuery,
      items: FILTER_DELETED_STATUS_OPTIONS,
    },
  ];

  function applyFilter(array, searchQuery, creatorQuery, statusQuery) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    var filteredList = array;
    if (searchQuery || creatorQuery || statusQuery) {
      if (searchQuery) {
        filteredList = filter(
          filteredList,
          (_comment) =>
            _comment.content &&
            _comment.content
              .trim()
              .toLowerCase()
              .indexOf(searchQuery.trim().toLowerCase()) !== -1
        );
      }
      if (creatorQuery) {
        filteredList = filter(
          filteredList,
          (_comment) =>
            _comment.user_id &&
            _comment.user_id.toLowerCase() === creatorQuery.toLowerCase()
        );
      }
      if (statusQuery) {
        filteredList = filter(
          filteredList,
          (_comment) =>
            _comment.is_deleted.toString() === statusQuery.toLowerCase()
        );
      }
      return filteredList;
    }
    return stabilizedThis.map((el) => el[0]);
  }

  return (
    <Card>
      <TableToolbar conditions={FILTER_CONDITIONS} />

      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <TableHeader
              headLabel={COMMENT_TABLE_HEAD}
              rowCount={filteredComments.length}
            />
            <TableBody>
              {filteredComments
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
                          {is_deleted ? "Deleted" : "Not Deleted"}
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

            {isCommentNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                    <SearchNotFound searchQuery={filteredComments} />
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
        count={filteredComments.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
}

export default function PostDetail() {
  const navigate = useNavigate();
  const { _id } = useParams();
  const [post, setPost] = useState();

  const [snackBar, setSnackBar] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [alertType, setAlertType] = useState("");

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBar(false);
  };

  const handleGetPostById = async () => {
    try {
      const rest = await axios.post(
        "http://localhost:8000/post/getPost/" + _id
      );
      setPost(rest.data);
    } catch (error) {
      navigate("/404");
    }
  };

  useEffect(() => {
    handleGetPostById();
    // eslint-disable-next-line
  }, []);

  const BREADCRUMBS = [
    { label: "Dashboard", href: "dashboard" },
    { label: "Posts", href: "/posts" },
    { label: "Post Detail", href: "#" },
  ];

  const handleDeletePost = async () => {
    try {
      await axios.post(`http://localhost:8000/post/delete/` + _id);
      setSnackBar(true);
      setAlertContent("Delete Success!");
      setAlertType("success");
      navigate(-1);
    } catch (error) {
      setSnackBar(true);
      setAlertContent("Delete Fail!");
      setAlertType("error");
    }
  };

  const [tab, setTab] = useState("overview");
  const handleTab = (event, newTab) => {
    setTab(newTab);
  };

  return (
    <Page title="Post Detail">
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={snackBar}
        autoHideDuration={5000}
        onClose={handleCloseSnackBar}
      >
        <Alert
          variant="filled"
          onClose={handleCloseSnackBar}
          severity={alertType}
          sx={{ color: "#fff" }}
        >
          {alertContent}
        </Alert>
      </Snackbar>
      <LinkBar array={BREADCRUMBS} />
      <Container>
        <Card sx={{ padding: 2 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="subtitle1">Post Detail</Typography>
            <DeleteButton type="post" action={handleDeletePost} />
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
