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
import { sentenceCase } from "change-case";
import { filter } from "lodash";
import { useEffect, useState } from "react";
import { HiTrash } from "react-icons/hi";
import { useNavigate, useParams } from "react-router";
import AvatarUser from "../../components/AvatarUser";
import Image from "../../components/Image";
import Label from "../../components/Label";
import LinkBar from "../../components/LinkBar";
import Page from "../../components/Page";
import Scrollbar from "../../components/Scrollbar";
import SearchNotFound from "../../components/SearchNotFound";
import { TableHeader, TableToolbar } from "../../components/table";

const MEMBER_TABLE_HEAD = [
    { id: "fullname", label: "User", alignRight: false },
    { id: "email", label: "Email", alignRight: false },
    { id: "gender", label: "Gender", alignRight: false },
    { id: "location", label: "Location", alignRight: false },
    { id: "major", label: "Major", alignRight: false },
    { id: "is_admin", label: "Role", alignRight: false },
    { id: "createAt", label: "Created Day", alignRight: false },
    { id: "is_active", label: "Status", alignRight: false },
  ];

const POST_TABLE_HEAD = [
  { id: "title", label: "Title", alignRight: false },
  { id: "type", label: "Type", alignRight: false },
  { id: "like", label: "Like", alignRight: false },
  { id: "comment", label: "Comment", alignRight: false },
  { id: "createAt", label: "Created Day", alignRight: false },
  { id: "updatedAt", label: "Updated Day", alignRight: false },
];

function InfoItem({ title, value, isRequired }) {
  return (
    <TableRow>
      <TableCell width="130">
        <Stack direction="row">
          {isRequired && (
            <Typography variant="subtitle2" color="error.main">
              *
            </Typography>
          )}
          <Typography variant="subtitle2">{title}:</Typography>
        </Stack>
      </TableCell>
      <TableCell sx={{ alignItems: "start" }}>
        <Typography variant="body2">{value}</Typography>
      </TableCell>
    </TableRow>
  );
}

function OverViewTab({ group }) {
    console.log(group?.admins)
    console.log(group?.name)
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
                    {sentenceCase(group?.is_delete === true ? "Deleted" : "Active")}
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
              <InfoItem title="Update At" value={group?.updatedAt?.substring(0, 10)} />
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
    const [filterName, setFilterName] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const filteredUsers = applyFilter(members, filterName);
  
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
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - members.length) : 0;
  
    return (
      <Card>
        <TableToolbar />
  
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <TableHeader headLabel={MEMBER_TABLE_HEAD} rowCount={members.length} />
              <TableBody>
                {members
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
                          <AvatarUser id={_id} fullname={fullname} avatar={avatar_url}/>                        
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
          count={members.length}
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
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const filteredPosts = applyFilter(posts, filterName);

  const isPostNotFound = filteredPosts.length === 0;

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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - posts.length) : 0;

  return (
    <Card>
      <TableToolbar />

      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <TableHeader
              headLabel={POST_TABLE_HEAD}
              rowCount={posts.length}
            />
            <TableBody>
              {posts
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
        count={posts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
}

export default function GroupDetail() {
  const { _id } = useParams();
  const [group, setGroup] = useState();

  const handleGetGroupById = async () => {
    try {
      const rest = await axios.get("http://localhost:8000/group/get/" + _id);
      setGroup(rest.data);
      console.log(rest.data);
    } catch (error) {}
  };

  useEffect(() => {
    handleGetGroupById();
    // eslint-disable-next-line
  }, []);

  const BREADCRUMBS = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Group", href: "/groups" },
    { label: group?.name, href: "#" },
  ];

  const [tab, setTab] = useState("overview");

  const handleTab = (event, newTab) => {
    console.log(newTab)
    setTab(newTab);
  };

  return (
    <Page title="Group Detail">
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
                images={[group?.avatar_url]}
                alt={group?.name}
                style={{ borderRadius: 10, width: 122, height: 122 }}
              />
              <Typography variant="subtitle1" noWrap>
                {group?.name}
              </Typography>
            </Stack>
            <Button variant="outlined" color="error" startIcon={<HiTrash />}>
              Delete
            </Button>
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
