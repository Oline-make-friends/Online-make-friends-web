import { filter } from "lodash";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Card,
  Table,
  Stack,
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
import AvatarUser from "../../components/AvatarUser";
import axios from "axios";
import {
  FILTER_POST_TYPE_OPTIONS,
  POST_TABLE_HEAD,
} from "../../constans/constans";
import Label from "../../components/Label";

const BREADCRUMBS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Posts", href: "#" },
];

function applyFilter(
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

export default function Post() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [hashtagQuery, setHashtagQuery] = useState("");
  const [createdByQuery, setCreatedByQuery] = useState("");
  const [typeQuery, setTypeQuery] = useState("");
  const [createdByList, setCreatedByList] = useState([]);

  const filteredPosts = applyFilter(
    posts,
    searchQuery,
    hashtagQuery,
    createdByQuery,
    typeQuery
  );

  const isPostNotFound = filteredPosts.length === 0;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredPosts.length) : 0;

  const handleGetAllPost = async () => {
    try {
      const res = await axios.get("http://localhost:8000/post/getAll");
      setPosts(res?.data);
      const res2 = await axios.get("http://localhost:8000/user/getAllUser");
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAllPost();
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
            Posts
          </Typography>
        </Stack>

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
                  {console.log(filteredPosts)}
                  {filteredPosts
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        _id,
                        created_by,
                        content,
                        hashtag,
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
                          <TableCell align="left">
                            <Label variant="ghost" color="warning">
                              #{hashtag}
                            </Label>
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
                              <AvatarUser id={created_by?._id} />
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
      </Container>
    </Page>
  );
}
