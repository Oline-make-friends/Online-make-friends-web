import { filter } from "lodash";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

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
import AvatarUser from "../../components/AvatarUser";
import { FILTER_DELETED_STATUS_OPTIONS, GROUP_TABLE_HEAD } from "../../constans/constans";
import Label from "../../components/Label";

function applyFilter(array, searchQuery, adminQuery, statusQuery) {
  console.log(statusQuery)
  const stabilizedThis = array.map((el, index) => [el, index]);
  var filteredList = array;
  console.log(filteredList);
  if (searchQuery || adminQuery || statusQuery) {
    if (searchQuery) {
      filteredList = filter(
        filteredList,
        (_group) =>
          _group.name
            .trim()
            .toLowerCase()
            .indexOf(searchQuery.trim().toLowerCase()) !== -1 ||
          _group.content
            .trim()
            .toLowerCase()
            .indexOf(searchQuery.trim().toLowerCase()) !== -1
      );
    }
    if (adminQuery) {
      filteredList = filter(
        filteredList,
        (_group) => _group.admins.includes(adminQuery.toLowerCase()) 
      );
    }
    if (statusQuery) {
      filteredList = filter(
        filteredList,
        (_group) => _group.is_deleted.toString() === statusQuery.toLowerCase()
      );
    }
    return filteredList;
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Group() {
  const navigate = useNavigate();
  const [groups, setGroup] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [adminQuery, setAdminQuery] = useState("");
  const [statusQuery, setStatusQuery] = useState("");
  const [adminList, setAdminList] = useState([]);

  const filteredGroups = applyFilter(groups, searchQuery, adminQuery, statusQuery);

  const isGroupNotFound = filteredGroups.length === 0;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredGroups.length) : 0;

  const handleGetAllGroup = async () => {
    try {
      const res = await axios.get("http://localhost:8000/group/getAll");
      setGroup(res.data);
      
      const res2 = await axios.get("http://localhost:8000/user/getAllUser");
      const temp = [{value: "", display: "All"}];
      for (let i = 0; i < res2.data.length; i++) {
          temp.push({
            value: res2.data[i]._id,
            display: res2.data[i].fullname,
          });
      }
      console.log(temp);
      setAdminList(
        temp.sort(function (a, b) {
          if (a.display.toLowerCase() === "all") return -1;
          if (b.display.toLowerCase() === "all") return 1;
          if (a.display.toLowerCase() < b.display.toLowerCase()) return -1;
          if (a.display.toLowerCase() > b.display.toLowerCase()) return 1;
          return 0;
        })
      )
    } catch (error) {
      toast.error("get all group  fail!");
    }
  };

  useEffect(() => {
    handleGetAllGroup();
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

  const handleAdminQuery = (event) => {
    setAdminQuery(event.target.value);
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
      label: "Search by Name, Content...",
      onChange: handleSearchQuery
    },
    {
      type: "select",
      query: adminQuery,
      label: "Admin",
      onChange: handleAdminQuery,
      items: adminList
    },
    {
      type: "select",
      query: statusQuery,
      label: "Status",
      onChange: handleStatusQuery,
      items: FILTER_DELETED_STATUS_OPTIONS
    }
  ];

  return (
    <Page title="Group">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Group
          </Typography>
          {/* <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<HiPlus />}
          >
            New Group
          </Button> */}
        </Stack>

        <Card>
        <TableToolbar conditions={FILTER_CONDITIONS}/>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHeader
                  headLabel={GROUP_TABLE_HEAD}
                  rowCount={filteredGroups.length}
                />
                <TableBody>
                  {filteredGroups
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        _id,
                        name,
                        admins,
                        content,
                        is_deleted,
                        createdAt,
                        updatedAt,
                      } = row;
                      return (
                        <TableRow hover key={_id} tabIndex={-1}>
                          <TableCell
                            align="left"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              navigate("/group/" + _id);
                            }}
                          >
                            {name}
                          </TableCell>
                          <TableCell align="left">
                            {/* {admins.map((admin) => admin.fullname + "\n")} */}
                            {/* {admins[0]} */}
                            <AvatarUser id={admins[0]} />
                          </TableCell>
                          <TableCell align="left">{content}</TableCell>
                          <TableCell align="left">
                            <Label color={is_deleted ? "error" : "success"}>
                              {is_deleted ? "Deleted" : "Not Deleted"}
                            </Label>
                          </TableCell>
                          <TableCell align="left">
                            {createdAt?.substring(0, 10)}
                          </TableCell>
                          <TableCell align="left">
                            {updatedAt?.substring(0, 10)}
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

                {isGroupNotFound && (
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
            count={filteredGroups.length}
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
