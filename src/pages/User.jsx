import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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

import Page from "../components/Page";
import Label from "../components/Label";
import Scrollbar from "../components/Scrollbar";
import SearchNotFound from "../components/SearchNotFound";
import { TableHeader, TableToolbar } from "../components/table";
import LinkBar from "../components/LinkBar";
import UserMoreMenu from "../sections/user/UserMoreMenu";
import { handleGetAllUser } from "../redux/apiRequest";

const TABLE_HEAD = [
  { id: "fullname", label: "User", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "gender", label: "Gender", alignRight: false },
  { id: "location", label: "Location", alignRight: false },
  { id: "major", label: "Major", alignRight: false },
  { id: "is_admin", label: "Role", alignRight: false },
  { id: "createAt", label: "Created Day", alignRight: false },
  { id: "is_active", label: "Status", alignRight: false },
  { id: "" },
];

const BREADCRUMBS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Users", href: "#" },
];

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

export default function User() {
  const navigate = useNavigate();
  const userList = useSelector((state) => state?.user?.users?.allUser);
  const dispatch = useDispatch();

  const handleGetUsers = () => {
    handleGetAllUser(dispatch, toast);
  };
  useEffect(() => {
    handleGetUsers();
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

  const filteredUsers = applyFilter(userList, filterName);

  const isUserNotFound = filteredUsers.length === 0;

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
        </Stack>

        <Card>
          <TableToolbar
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHeader
                  headLabel={TABLE_HEAD}
                  rowCount={userList.length}
                />
                <TableBody>
                  {userList
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

                          <TableCell align="right">
                            <UserMoreMenu userId={_id} banned={!is_active} />
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
            count={userList.length}
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
