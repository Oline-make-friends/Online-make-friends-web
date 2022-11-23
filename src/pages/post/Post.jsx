import { filter } from "lodash";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  Card,
  Table,
  Stack,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from "@mui/material";

import Page from "../../components/Page";
import Scrollbar from "../../components/Scrollbar";
import SearchNotFound from "../../components/SearchNotFound";
import { TableHeader, TableToolbar } from "../../components/table";
import LinkBar from "../../components/LinkBar";
import axios from "axios";

const TABLE_HEAD = [
  { id: "title", label: "Title", alignRight: false },
  { id: "createdBy", label: "Created By", alignRight: false },
  { id: "type", label: "Type", alignRight: false },
  { id: "like", label: "Like", alignRight: false },
  { id: "comment", label: "Comment", alignRight: false },
  { id: "createAt", label: "Created Day", alignRight: false },
  { id: "updatedAt", label: "Updated Day", alignRight: false },
];

const BREADCRUMBS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Posts", href: "#" },
];

function applyFilter(array, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  if (query) {
    return filter(
      array,
      (_post) => _post.name.to.indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

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

  const [page, setPage] = useState(0);

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - posts.length) : 0;

  const filteredPosts = applyFilter(posts, filterName);

  const isPostNotFound = filteredPosts.length === 0;

  return (
    <Page title="Posts">
      <LinkBar array={BREADCRUMBS}></LinkBar>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Post
          </Typography>
        </Stack>

        <Card>
          <TableToolbar
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHeader headLabel={TABLE_HEAD} rowCount={posts.length} />
                <TableBody>
                  {posts
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        _id,
                        created_by,
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
                              // navigate("/post/" + _id);
                              navigate("/post/" + _id, {
                                state: { isGroup: false },
                              });
                            }}
                          >
                            {content}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              navigate("/user/" + created_by._id);
                              window.location.reload();
                            }}
                          >
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Avatar
                                alt={created_by.fullname}
                                src={created_by.avatar_url}
                              />
                              <Typography variant="subtitle2" noWrap>
                                {created_by.fullname}
                              </Typography>
                            </Stack>
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
      </Container>
    </Page>
  );
}
