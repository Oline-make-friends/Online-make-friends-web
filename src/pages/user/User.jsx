import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
import Label from "../../components/Label";
import Scrollbar from "../../components/Scrollbar";
import SearchNotFound from "../../components/SearchNotFound";
import { TableHeader, TableToolbar } from "../../components/table";
import LinkBar from "../../components/LinkBar";
import axios from "axios";
import InviteAdmin from "./InviteAdmin";
import { FILTER_GENDER_OPTIONS, FILTER_STATUS_OPTIONS, USER_TABLE_HEAD } from "../../constans/constans";

const BREADCRUMBS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Users", href: "#" },
];
function applyFilter(array, searchQuery, genderQuery, statusQuery) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  var filteredList = array;
  console.log(filteredList);
  if (searchQuery || genderQuery || statusQuery) {
    if (searchQuery) {
      filteredList = filter(
        filteredList,
        (_user) =>
          _user.fullname.trim().toLowerCase().indexOf(searchQuery.trim().toLowerCase()) !== -1||
          _user.username.trim().toLowerCase().indexOf(searchQuery.trim().toLowerCase()) !== -1
      );
    }
    if (genderQuery) {
      filteredList = filter(
        filteredList,
        (_user) =>
          _user.gender.toLowerCase() === genderQuery.toLowerCase()
      );
    }
    if (statusQuery) {
      filteredList = filter(
        filteredList,
        (_user) =>
          _user.is_active.toString() === statusQuery.toLowerCase()
      );
    }
    return filteredList;
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [genderQuery, setGenderQuery] = useState("");
  const [statusQuery, setStatusQuery] = useState("");

  const filteredUsers = applyFilter(
    userList,
    searchQuery,
    genderQuery,
    statusQuery
  );

  const isUserNotFound = filteredUsers.length === 0;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredUsers.length) : 0;

  const handleGetAllUser = async () => {
    try {
      const res = await axios.get("http://localhost:8000/user/getAllUser");
      setUserList(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    handleGetAllUser();
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
      onChange: handleSearchQuery
    },
    {
      type: "select",
      query: genderQuery,
      label: "Gender",
      onChange: handleGenderQuery,
      items: FILTER_GENDER_OPTIONS
    },
    {
      type: "select",
      query: statusQuery,
      label: "Status",
      onChange: handleStatusQuery,
      items: FILTER_STATUS_OPTIONS
    }
  ];

  return (
    <Page title="Users">
      <LinkBar array={BREADCRUMBS}></LinkBar>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <InviteAdmin />
        </Stack>

        <Card>
          <TableToolbar
            conditions={FILTER_CONDITIONS}
          />

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
                        //is_admin,
                        is_active,
                        createdAt,
                        updatedAt,
                      } = row;

                      return (
                        <TableRow hover key={_id} tabIndex={-1}>
                          <TableCell
                            component="th"
                            scope="row"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              navigate("/user/" + _id);
                            }}
                          >
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Avatar alt={fullname} src={avatar_url} />
                              <Typography variant="subtitle2" noWrap>
                                {fullname}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{username}</TableCell>
                          <TableCell align="left">{gender}</TableCell>
                          <TableCell align="left">{location}</TableCell>
                          <TableCell align="left">{major}</TableCell>
                          {/* <TableCell align="left">
                            {is_admin ? "Admin" : "Member"}
                          </TableCell> */}
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
                            {createdAt.substring(0, 10)}
                          </TableCell>
                          <TableCell align="left">
                            {updatedAt.substring(0, 10)}
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
      </Container>
    </Page>
  );
}
