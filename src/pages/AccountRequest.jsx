import {
  Avatar,
  Card,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { filter } from "lodash";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { BsShieldFillCheck, BsShieldSlashFill } from "react-icons/bs";
import LinkBar from "../components/LinkBar";
import MoreMenu from "../components/MoreMenu";
import Page from "../components/Page";
import Scrollbar from "../components/Scrollbar";
import SearchNotFound from "../components/SearchNotFound";
import { TableHeader, TableToolbar } from "../components/table";

const BREADCRUMBS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Request", href: "#" },
];

const TABLE_HEAD = [
  { id: "fullname", label: "User", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "gender", label: "Gender", alignRight: false },
  { id: "status", label: "status", alignRight: false },
  { id: "createAt", label: "Created Day", alignRight: false },
  { id: "updatedAt", label: "Updated Day", alignRight: false },
  { id: "" },
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

export default function AccountRequest() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(0);
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleGetAllRequest = async () => {
    try {
      const rest = await axios.get(
        "http://localhost:8000/user/getAllProveAccount"
      );
      setRequests(rest.data);
    } catch (error) {}
  };

  useEffect(() => {
    handleGetAllRequest();
    // eslint-disable-next-line
  }, []);

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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - requests.length) : 0;

  const filteredUsers = applyFilter(requests, filterName);

  const isUserNotFound = filteredUsers.length === 0;
  console.log(requests);

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
            Account Request
          </Typography>
        </Stack>

        <Card>
          {/* <TableToolbar
            filterName={filterName}
            onFilterName={handleFilterByName}
          /> */}

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHeader
                  headLabel={TABLE_HEAD}
                  rowCount={requests.length}
                />
                <TableBody>
                  {requests
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        _id,
                        avatar_url,
                        fullname,
                        username,
                        gender,
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
                              navigate("/request/" + _id);
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
                          <TableCell align="left">
                            {is_active === true ? "Yes" : "Not yet"}
                          </TableCell>
                          <TableCell align="left">
                            {createdAt.toString().substring(0, 10)}
                          </TableCell>
                          <TableCell align="left">
                            {updatedAt.toString().substring(0, 10)}
                          </TableCell>
                          <TableCell align="right">
                            <MoreMenu
                              array={[
                                {
                                  title: "Prove",
                                  icon: <BsShieldFillCheck />,
                                  action: {},
                                },
                                {
                                  title: "Disprove",
                                  icon: <BsShieldSlashFill />,
                                  action: {},
                                },
                              ]}
                            />
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
            count={requests.length}
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
