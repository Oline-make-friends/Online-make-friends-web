import {
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

import LinkBar from "../../components/LinkBar";
import Page from "../../components/Page";
import Scrollbar from "../../components/Scrollbar";
import SearchNotFound from "../../components/SearchNotFound";
import { TableHeader, TableToolbar } from "../../components/table";
import AvatarUser from "../../components/AvatarUser";
import Label from "../../components/Label";
import * as CONSTANT from "../../constans/constans";
import {
  FILTER_GENDER_OPTIONS,
  FILTER_REQUEST_STATUS_OPTIONS,
  REQUEST_TABLE_HEAD,
} from "../../constans/constans";

const BREADCRUMBS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Requests", href: "#" },
];

function applyFilter(array, searchQuery, genderQuery, statusQuery) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  var filteredList = array;
  if (searchQuery || genderQuery || statusQuery) {
    if (searchQuery) {
      filteredList = filter(
        filteredList,
        (_request) =>
          _request.fullname &&
          (_request.fullname
            .trim()
            .toLowerCase()
            .indexOf(searchQuery.trim().toLowerCase()) !== -1 ||
            _request.username
              .trim()
              .toLowerCase()
              .indexOf(searchQuery.trim().toLowerCase()) !== -1)
      );
    }
    if (genderQuery) {
      filteredList = filter(
        filteredList,
        (_request) =>
          _request.gender &&
          _request.gender.toLowerCase() === genderQuery.toLowerCase()
      );
    }
    if (statusQuery) {
      filteredList = filter(
        filteredList,
        (_request) => _request.is_prove.toString() === statusQuery.toLowerCase()
      );
    }
    return filteredList;
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function AccountRequest() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [genderQuery, setGenderQuery] = useState("");
  const [statusQuery, setStatusQuery] = useState("");

  const filteredRequests = applyFilter(
    requests,
    searchQuery,
    genderQuery,
    statusQuery
  );

  const isRequestNotFound = filteredRequests.length === 0;

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - filteredRequests.length)
      : 0;

  const handleGetAllRequest = async () => {
    try {
      const rest = await axios.get(
        `${CONSTANT.SERVER}/user/getAllProveAccount`
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
      items: FILTER_REQUEST_STATUS_OPTIONS,
    },
  ];

  return (
    <Page title="Account Requests">
      <LinkBar array={BREADCRUMBS}></LinkBar>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Account Requests
          </Typography>
        </Stack>

        <Card>
          <TableToolbar conditions={FILTER_CONDITIONS} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHeader
                  headLabel={REQUEST_TABLE_HEAD}
                  rowCount={filteredRequests.length}
                />
                <TableBody>
                  {filteredRequests
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        _id,
                        avatar_url,
                        fullname,
                        username,
                        gender,
                        is_prove,
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
                            <AvatarUser
                              id={_id}
                              fullname={fullname}
                              avatar={avatar_url}
                            />
                          </TableCell>
                          <TableCell align="left">{username}</TableCell>
                          <TableCell align="left">{gender}</TableCell>
                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={is_prove ? "info" : "error"}
                            >
                              {is_prove === true ? "Proved" : "Not proved"}
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

                {isRequestNotFound && (
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
            count={filteredRequests.length}
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
