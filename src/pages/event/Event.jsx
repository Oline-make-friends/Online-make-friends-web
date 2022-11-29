import axios from "axios";
import { filter } from "lodash";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

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

import AvatarUser from "../../components/AvatarUser";
import LinkBar from "../../components/LinkBar";
import Page from "../../components/Page";
import Scrollbar from "../../components/Scrollbar";
import SearchNotFound from "../../components/SearchNotFound";
import { TableHeader, TableToolbar } from "../../components/table";
import { EVENT_TABLE_HEAD } from "../../constans/constans";

const BREADCRUMBS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Events", href: "#" },
];

function applyFilter(array, searchQuery, organizationDateQuery, creatorQuery) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  var filteredList = array;
  if (searchQuery || organizationDateQuery || creatorQuery) {
    if (searchQuery) {
      filteredList = filter(
        filteredList,
        (_event) =>
          (_event.title &&
            _event.title
              .trim()
              .toLowerCase()
              .indexOf(searchQuery.trim().toLowerCase()) !== -1) ||
          (_event.type &&
            _event.type
              .trim()
              .toLowerCase()
              .indexOf(searchQuery.trim().toLowerCase()) !== -1)
      );
    }
    if (organizationDateQuery) {
      filteredList = filter(
        filteredList,
        (_event) => _event.date_time === organizationDateQuery
      );
    }
    if (creatorQuery) {
      filteredList = filter(
        filteredList,
        (_event) =>
          _event.created_by &&
          _event.created_by._id.trim() === creatorQuery.trim()
      );
    }
    return filteredList;
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Event() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [organizationDateQuery, setOrganizationDateQuery] = useState("");
  const [creatorQuery, setCreatorQuery] = useState("");
  const [creatorList, setCreatorList] = useState([]);

  const filteredEvents = applyFilter(
    events,
    searchQuery,
    organizationDateQuery,
    creatorQuery
  );

  const isEventNotFound = filteredEvents.length === 0;

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - filteredEvents.length)
      : 0;

  const handleGetAllEvent = async () => {
    try {
      const res = await axios.get("http://localhost:8000/event/getAll");
      setEvents(res.data);

      const res2 = await axios.get("http://localhost:8000/user/getAllUser");
      const temp = [{ value: "", display: "All" }];
      for (let i = 0; i < res2.data.length; i++) {
        temp.push({
          value: res2.data[i]._id,
          display: res2.data[i].fullname,
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
    } catch (error) {}
  };

  useEffect(() => {
    handleGetAllEvent();
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

  const handleOrganizationDateQuery = (event) => {
    setOrganizationDateQuery(event.target.value);
    setPage(0);
  };

  const handleCreatorQuery = (event) => {
    setCreatorQuery(event.target.value);
    setPage(0);
  };

  const FILTER_CONDITIONS = [
    {
      type: "input",
      query: searchQuery,
      label: "Search by Title, Type...",
      onChange: handleSearchQuery,
    },
    {
      type: "date",
      query: organizationDateQuery,
      label: "Organization Day",
      onChange: handleOrganizationDateQuery,
    },
    {
      type: "select",
      query: creatorQuery,
      label: "Creator",
      onChange: handleCreatorQuery,
      items: creatorList,
    },
  ];

  return (
    <Page title="Events">
      <LinkBar array={BREADCRUMBS}></LinkBar>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h4" gutterBottom>
            Events
          </Typography>
        </Stack>

        <Card>
          <TableToolbar conditions={FILTER_CONDITIONS} />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHeader
                  headLabel={EVENT_TABLE_HEAD}
                  rowCount={filteredEvents.length}
                />
                <TableBody>
                  {filteredEvents
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        _id,
                        title,
                        type,
                        date_time,
                        user_joined,
                        created_by,
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
                              navigate("/event/" + _id);
                            }}
                          >
                            {title}
                          </TableCell>
                          <TableCell align="left">{type}</TableCell>
                          <TableCell align="left">{date_time}</TableCell>
                          <TableCell align="left">
                            {user_joined.length}
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              navigate("/user/" + created_by._id);
                            }}
                          >
                            <AvatarUser
                              id={created_by._id}
                              fullname={created_by.fullname}
                              avatar={created_by.avatar_url}
                            />
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

                {isEventNotFound && (
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
            count={filteredEvents.length}
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
