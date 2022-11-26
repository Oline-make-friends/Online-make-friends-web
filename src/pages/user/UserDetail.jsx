import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
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
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { filter } from "lodash";
import { sentenceCase } from "change-case";

import { AiFillLock, AiFillUnlock } from "react-icons/ai";

import LinkBar from "../../components/LinkBar";
import Page from "../../components/Page";
import Label from "../../components/Label";
import { TableHeader, TableToolbar } from "../../components/table";
import Scrollbar from "../../components/Scrollbar";
import SearchNotFound from "../../components/SearchNotFound";
import Image from "../../components/Image";
import AvatarUser from "../../components/AvatarUser";
import InfoItem from "../../components/InfoItem";
import {
  FILTER_GENDER_OPTIONS,
  FILTER_STATUS_OPTIONS,
  USER_TABLE_HEAD,
} from "../../constans/constans";

const POST_TABLE_HEAD = [
  { id: "title", label: "Title", alignRight: false },
  { id: "type", label: "Type", alignRight: false },
  { id: "like", label: "Like", alignRight: false },
  { id: "comment", label: "Comment", alignRight: false },
  { id: "createAt", label: "Created Day", alignRight: false },
  { id: "updatedAt", label: "Updated Day", alignRight: false },
];

function applyFilter(array, searchQuery, genderQuery, statusQuery) {
  console.log("applyFilter");
  console.log(searchQuery);
  console.log(genderQuery);
  console.log(statusQuery);
  const stabilizedThis = array.map((el, index) => [el, index]);
  var filteredList = array;
  console.log(filteredList);
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

function OverViewTab({
  _id,
  fullname,
  username,
  about,
  dob,
  gender,
  location,
  major,
  proveImage,
  createdAt,
  updatedAt,
  is_active,
  is_admin,
  is_prove,
}) {
  const handleStatusUser = () => {
    try {
      axios.post(`http://localhost:8000/user/blockUser/${_id}`);
      window.location.reload();
    } catch (error) {}
  };
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
              <InfoItem title="Fullname" value={fullname} isRequired />
              <InfoItem title="Email" value={username} isRequired />
              <InfoItem
                title="Role"
                value={
                  <Label variant="ghost" color={is_admin ? "error" : "info"}>
                    {sentenceCase(is_admin === true ? "Admin" : "Member")}
                  </Label>
                }
                isRequired
              />
              <InfoItem title="About" value={about} />
              <InfoItem title="Date of birth" value={dob} />
              <InfoItem
                title="Gender"
                value={
                  <Label
                    variant="ghost"
                    color={gender === "Male" ? "info" : "error"}
                  >
                    {gender}
                  </Label>
                }
              />
              <InfoItem title="Location" value={location} />
              <InfoItem title="Major" value={major} />
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer component={Card} sx={{ padding: 2 }}>
          <Typography variant="subtitle1" mb={2}>
            Account Configuration
          </Typography>
          <Divider />

          <Table sx={{ minWidth: 500 }}>
            <TableBody>
              <InfoItem
                title="Create At"
                value={createdAt?.substring(0, 10)}
                isRequired
              />
              <InfoItem title="Update At" value={updatedAt?.substring(0, 10)} />
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={6} md={4}>
        <Card sx={{ padding: 2 }}>
          <Typography variant="subtitle1" mb={2}>
            Statuses
          </Typography>
          <Stack direction="column" spacing={2}>
            <Stack direction="row" spacing={2}>
              <Typography variant="subtitle2">Prove Image:</Typography>
              <Image
                style={{ borderRadius: 10, width: 122, height: 122 }}
                image={proveImage}
                alt={fullname}
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <Label variant="ghost" color={is_active ? "success" : "error"}>
                {sentenceCase(is_active === true ? "active" : "banned")}
              </Label>
              <Label variant="ghost" color={is_prove ? "success" : "error"}>
                {sentenceCase(is_prove === true ? "Proved" : "Unproved")}
              </Label>
            </Stack>
            <Stack>
              <Button
                onClick={handleStatusUser}
                variant="contained"
                startIcon={is_active ? <AiFillLock /> : <AiFillUnlock />}
              >
                {is_active ? "Ban" : "Unban"}
              </Button>
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
}

function FriendsTab({ friendList }) {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [genderQuery, setGenderQuery] = useState("");
  const [statusQuery, setStatusQuery] = useState("");
  const filteredFriends = applyFilter(
    friendList,
    searchQuery,
    genderQuery,
    statusQuery
  );

  const isUserNotFound = filteredFriends.length === 0;

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - filteredFriends.length)
      : 0;

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
              rowCount={filteredFriends.length}
            />
            <TableBody>
              {filteredFriends
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
                    is_active,
                    createdAt,
                    updatedAt,
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
                        <Label
                          variant="ghost"
                          color={is_active ? "success" : "error"}
                        >
                          {sentenceCase(
                            is_active === true ? "active" : "banned"
                          )}
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
        count={filteredFriends.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
}

function FollowingTab({ followingList }) {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [genderQuery, setGenderQuery] = useState("");
  const [statusQuery, setStatusQuery] = useState("");

  const filteredUsers = applyFilter(
    followingList,
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
                    is_active,
                    createdAt,
                    updatedAt,
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
                        <Label
                          variant="ghost"
                          color={is_active ? "success" : "error"}
                        >
                          {sentenceCase(
                            is_active === true ? "active" : "banned"
                          )}
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

function PostsTab({ userId }) {
  const navigate = useNavigate();

  const [postList, setPostList] = useState([]);

  const [page, setPage] = useState(0);
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const filteredUsers = applyFilter(postList, filterName);

  useEffect(() => {
    handleGetPostByUserId();
    // eslint-disable-next-line
  }, []);

  const handleGetPostByUserId = async () => {
    try {
      const rest = await axios.post("http://localhost:8000/post/get/" + userId);
      setPostList(rest.data);
    } catch (error) {}
  };

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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - postList.length) : 0;

  return (
    <Card>
      <TableToolbar />

      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <TableHeader
              headLabel={POST_TABLE_HEAD}
              rowCount={postList.length}
            />
            <TableBody>
              {postList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const {
                    _id,
                    content,
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
        count={postList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
}

export default function UserDetail() {
  const { _id } = useParams();

  const [user, setUser] = useState();
  const [tab, setTab] = useState("overview");
  const handleTab = (event, newTab) => {
    setTab(newTab);
  };

  useEffect(() => {
    handleGetUserById();
    // eslint-disable-next-line
  }, []);

  const handleGetUserById = async () => {
    try {
      const rest = await axios.post(
        "http://localhost:8000/user/getUser/" + _id
      );
      setUser(rest.data);
      console.log(user);
    } catch (error) {}
  };

  const BREADCRUMBS = [
    { label: "Dashboard", href: "dashboard" },
    { label: "Users", href: "/users" },
    { label: user?.fullname, href: "#" },
  ];

  return (
    <Page title="Users">
      <LinkBar array={BREADCRUMBS} />
      <Container>
        <Card sx={{ padding: 2 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={2}>
              <Image
                image={user?.avatar_url}
                alt={user?.fullname}
                style={{ borderRadius: 10, width: 122, height: 122 }}
              />
              <Stack direction="column">
                <Typography variant="subtitle1" noWrap>
                  {user?.fullname}
                </Typography>
                <Typography variant="body2" noWrap>
                  {user?.username}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <TabContext value={tab} onChange={handleTab}>
            <Box>
              <TabList onChange={handleTab}>
                <Tab value="overview" label="Overview" />
                <Tab value="friends" label="Friends" />
                {/* <Tab value="followers" label="Followers" /> */}
                <Tab value="followings" label="Followings" />
                <Tab value="posts" label="Posts" />
              </TabList>
            </Box>
            <TabPanel value="overview">
              <OverViewTab
                _id={user?._id}
                fullname={user?.fullname}
                username={user?.username}
                about={user?.about}
                dob={user?.date_of_birth}
                gender={user?.gender}
                location={user?.location}
                major={user?.major}
                proveImage={user?.proveImage_url}
                createdAt={user?.createdAt}
                updatedAt={user?.updatedAt}
                is_active={user?.is_active}
                is_admin={user?.is_admin}
                is_prove={user?.is_prove}
              />
            </TabPanel>
            <TabPanel value="friends">
              <FriendsTab friendList={user?.friends} />
            </TabPanel>
            <TabPanel value="followings">
              <FollowingTab followingList={user?.follows} />
            </TabPanel>
            <TabPanel value="posts">
              <PostsTab userId={user?._id} />
            </TabPanel>
          </TabContext>
        </Card>
      </Container>
    </Page>
  );
}
