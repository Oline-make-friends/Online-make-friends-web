import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Alert,
  Box,
  Card,
  Container,
  Divider,
  Grid,
  Snackbar,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { sentenceCase } from "change-case";
import { filter } from "lodash";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import AvatarUser from "../../components/AvatarUser";
import Image from "../../components/Image";
import Label from "../../components/Label";
import LinkBar from "../../components/LinkBar";
import Page from "../../components/Page";
import Scrollbar from "../../components/Scrollbar";
import SearchNotFound from "../../components/SearchNotFound";
import { TableHeader, TableToolbar } from "../../components/table";
import InfoItem from "../../components/InfoItem";
import * as CONSTANT from "../../constans/constans";
import {
  FILTER_GENDER_OPTIONS,
  FILTER_POST_TYPE_OPTIONS,
  FILTER_STATUS_OPTIONS,
  POST_TABLE_HEAD,
  USER_TABLE_HEAD,
} from "../../constans/constans";
import DeleteButton from "../../components/DeleteButton";

function applyUserFilter(array, searchQuery, genderQuery, statusQuery) {
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

function applyPostFilter(
  array,
  searchQuery,
  hashtagQuery,
  createdByQuery,
  typeQuery
) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  var filteredList = array;
  if (searchQuery || hashtagQuery || createdByQuery || typeQuery) {
    if (searchQuery) {
      filteredList = filter(
        filteredList,
        (_post) =>
          _post.content &&
          _post.content
            .trim()
            .toLowerCase()
            .indexOf(searchQuery.trim().toLowerCase()) !== -1
      );
    }
    if (hashtagQuery) {
      filteredList = filter(
        filteredList,
        (_post) =>
          _post.hashtag &&
          _post.hashtag
            .trim()
            .toLowerCase()
            .indexOf(hashtagQuery.trim().toLowerCase()) !== -1
      );
    }
    if (createdByQuery) {
      filteredList = filter(
        filteredList,
        (_post) =>
          _post.created_by &&
          _post.created_by._id.trim() === createdByQuery.trim()
      );
    }
    if (typeQuery) {
      filteredList = filter(
        filteredList,
        (_post) =>
          _post.type && _post.type.toLowerCase() === typeQuery.toLowerCase()
      );
    }
    return filteredList;
  }
  return stabilizedThis.map((el) => el[0]);
}

function OverViewTab({ group }) {
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
              <InfoItem title="Name" value={group?.name} isRequired />
              <InfoItem title="Content" value={group?.content} />
              <InfoItem
                title="Status"
                value={
                  <Label
                    variant="ghost"
                    color={group?.is_delete ? "error" : "success"}
                  >
                    {sentenceCase(
                      group?.is_deleted === true ? "Deleted" : "Not Deleted"
                    )}
                  </Label>
                }
                isRequired
              />
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer component={Card} sx={{ padding: 2 }}>
          <Typography variant="subtitle1" mb={2}>
            Admins
          </Typography>
          <Divider />
          <Box
            sx={{
              mt: 2,
              display: "grid",
              gap: 2,
              gridTemplateColumns: "repeat(2, 1fr)",
            }}
          >
            {group?.admins.map((row) => {
              return (
                <Card sx={{ p: 2 }}>
                  <AvatarUser
                    id={row._id}
                    fullname={row.fullname}
                    avatar={row.avatar_url}
                  />
                </Card>
              );
            })}
          </Box>
        </TableContainer>
      </Grid>
      <Grid item xs={6} md={4}>
        <TableContainer component={Card} sx={{ padding: 2 }}>
          <Typography variant="subtitle1" mb={2}>
            Group Configuration
          </Typography>
          <Divider />

          <Table sx={{ minWidth: 500 }}>
            <TableBody>
              <InfoItem
                title="Create At"
                value={group?.createdAt?.substring(0, 10)}
                isRequired
              />
              <InfoItem
                title="Update At"
                value={group?.updatedAt?.substring(0, 10)}
              />
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

function MemberTab({ members }) {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [genderQuery, setGenderQuery] = useState("");
  const [statusQuery, setStatusQuery] = useState("");

  const filteredUsers = applyUserFilter(
    members,
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

function PostsTab({ posts }) {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [hashtagQuery, setHashtagQuery] = useState("");
  const [createdByQuery, setCreatedByQuery] = useState("");
  const [typeQuery, setTypeQuery] = useState("");
  const [createdByList, setCreatedByList] = useState([]);

  const filteredPosts = applyPostFilter(
    posts,
    searchQuery,
    hashtagQuery,
    createdByQuery,
    typeQuery
  );

  const isPostNotFound = filteredPosts.length === 0;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredPosts.length) : 0;

  const handleGetCreatedByList = async () => {
    const res2 = await axios.get(`${CONSTANT.SERVER}/user/getAllUser`);
    const temp = [{ value: "", display: "All" }];
    for (let i = 0; i < res2.data.length; i++) {
      temp.push({
        value: res2.data[i]._id,
        display: res2.data[i].fullname,
      });
    }
    setCreatedByList(
      temp.sort(function (a, b) {
        if (a.display.toLowerCase() === "all") return -1;
        if (b.display.toLowerCase() === "all") return 1;
        if (a.display.toLowerCase() < b.display.toLowerCase()) return -1;
        if (a.display.toLowerCase() > b.display.toLowerCase()) return 1;
        return 0;
      })
    );
  };

  useEffect(() => {
    handleGetCreatedByList();
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

  const handleHashtagQuery = (event) => {
    setHashtagQuery(event.target.value);
    setPage(0);
  };

  const handleCreatedByQuery = (event) => {
    setCreatedByQuery(event.target.value);
    setPage(0);
  };

  const handleTypeQuery = (event) => {
    setTypeQuery(event.target.value);
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
      type: "input",
      query: hashtagQuery,
      label: "Search by Hashtag...",
      onChange: handleHashtagQuery,
    },
    {
      type: "select",
      query: createdByQuery,
      label: "Created By",
      onChange: handleCreatedByQuery,
      items: createdByList,
    },
    {
      type: "select",
      query: typeQuery,
      label: "Type",
      onChange: handleTypeQuery,
      items: FILTER_POST_TYPE_OPTIONS,
    },
  ];

  return (
    <Card>
      <TableToolbar conditions={FILTER_CONDITIONS} />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <TableHeader
              headLabel={POST_TABLE_HEAD}
              rowCount={filteredPosts.length}
            />
            <TableBody>
              {filteredPosts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const {
                    _id,
                    content,
                    hashtag,
                    created_by,
                    type,
                    likes,
                    comments,
                    createdAt,
                    updatedAt,
                  } = row;
                  return (
                    <TableRow hover key={_id} tabIndex={-1}>
                      <TableCell
                        align="left"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          navigate("/post/" + _id);
                        }}
                      >
                        {content}
                      </TableCell>
                      <TableCell align="left">
                        <Label color="warning">#{hashtag}</Label>
                      </TableCell>
                      <TableCell align="left">
                        <AvatarUser id={created_by._id} />
                      </TableCell>
                      <TableCell align="left">{type}</TableCell>
                      <TableCell align="left">{likes.length}</TableCell>
                      <TableCell align="left">{comments.length}</TableCell>
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
        count={filteredPosts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
}

export default function GroupDetail() {
  const navigate = useNavigate();
  const { _id } = useParams();
  const [group, setGroup] = useState();

  const [snackBar, setSnackBar] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [alertType, setAlertType] = useState("");

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBar(false);
  };

  const handleGetGroupById = async () => {
    try {
      const rest = await axios.get(`${CONSTANT.SERVER}/group/get/` + _id);
      setGroup(rest.data);
    } catch (error) {}
  };

  useEffect(() => {
    handleGetGroupById();
    // eslint-disable-next-line
  }, []);

  const BREADCRUMBS = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Groups", href: "/groups" },
    { label: group?.name, href: "#" },
  ];

  const [tab, setTab] = useState("overview");

  const handleTab = (event, newTab) => {
    setTab(newTab);
  };

  const handleDelete = async () => {
    try {
      await axios.post(`${CONSTANT.SERVER}/group/delete/`, { _id: _id });
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

  return (
    <Page title="Group Detail">
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
      <LinkBar array={BREADCRUMBS}></LinkBar>
      <Container>
        <Card sx={{ padding: 2 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack alignItems="center" direction="row" spacing={2}>
              <Image
                image={group?.avatar_url}
                alt={group?.name}
                style={{ borderRadius: 10, width: 122, height: 122 }}
              />
              <Typography variant="subtitle1" noWrap>
                {group?.name}
              </Typography>
            </Stack>

            <DeleteButton type="group" action={handleDelete} />
          </Stack>
          <TabContext value={tab} onChange={handleTab}>
            <Box>
              <TabList onChange={handleTab}>
                <Tab value="overview" label="Overview" />
                <Tab value="members" label="Members" />
                <Tab value="posts" label="Posts" />
              </TabList>
            </Box>
            <TabPanel value="overview">
              <OverViewTab group={group} />
            </TabPanel>
            <TabPanel value="members">
              <MemberTab members={group?.members} />
            </TabPanel>
            <TabPanel value="posts">
              <PostsTab posts={group?.posts} />
            </TabPanel>
          </TabContext>
        </Card>
      </Container>
    </Page>
  );
}
