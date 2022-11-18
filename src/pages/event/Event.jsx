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

const TABLE_HEAD = [
  { id: "title", label: "Title", alignRight: false },
  { id: "type", label: "Type", alignRight: false },
  { id: "date_time", label: "Organization Day", alignRight: false },
  { id: "user_joined", label: "Joiners", alignRight: false },
  { id: "createdBy", label: "Creator", alignRight: false },
  { id: "createdAt", label: "Created Day", alignRight: false },
  { id: "updatedAt", label: "Updated Day", alignRight: false },
  { id: "" },
];

const BREADCRUMBS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Event", href: "#" },
];

function applyFilter(array, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    if (query) {
      return filter(
        array,
        (_event) => _event.name.to.indexOf(query.toLowerCase()) !== -1
      );
    }
    return stabilizedThis.map((el) => el[0]);
  }

export default function Event(){
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
  
    const handleGetAllEvent = async () => {
        try {
            const res = await axios.get("http://localhost:8000/event/getAll");
            setEvents(res.data);
            console.log(res.data);
          } catch (error) {
          }
    };
    useEffect(() => {
        handleGetAllEvent();
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
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - events.length) : 0;
  
    const filteredUsers = applyFilter(events, filterName);
  
    const isUserNotFound = filteredUsers.length === 0;
  
    return (
      <Page title="Event">
      <LinkBar array={BREADCRUMBS}></LinkBar>
        <Container>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
          >
            <Typography variant="h4" gutterBottom>
              Event
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
                    rowCount={events.length}
                  />
                  <TableBody>
                    {events
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
                              style={{cursor: "pointer"}}
                              onClick={() => {
                                navigate("/user/" + created_by._id);
                              }}
                            >
                              <AvatarUser id={created_by._id} fullname={created_by.fullname} avatar={created_by.avatar_url}/>
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
              count={events.length}
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