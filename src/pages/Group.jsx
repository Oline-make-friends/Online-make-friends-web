import { filter } from "lodash";
import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import {
  Card,
  Table,
  Stack,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from "@mui/material";

import { HiPlus } from "react-icons/hi";

import Page from "../components/Page";
import Scrollbar from "../components/Scrollbar";
import SearchNotFound from "../components/SearchNotFound";
import { TableHeader, TableToolbar } from "../components/table";

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "admin", label: "Admin", alignRight: false },
  { id: "createdAt", label: "Date Create", alignRight: false },
  { id: "content", label: "Content", alignRight: false },
  { id: "" },
];

function applyFilter(array, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  if (query) {
    return filter(
      array,
      (group) => group.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Group() {
  const [groups, setGroup] = useState([]);
  const handleGetAllGroup = async () => {
    try {
      const res = await axios.get("http://localhost:8000/group/getAll");

      setGroup(res.data);
      console.log(res.data);
      toast.success("get all group success!");
    } catch (error) {
      toast.error("get all group  fail!");
    }
  };
  useEffect(() => {
    handleGetAllGroup();
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - groups.length) : 0;

  const filteredGroup = applyFilter(groups, filterName);

  const isUserNotFound = filteredGroup.length === 0;

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
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<HiPlus />}
          >
            New Group
          </Button>
        </Stack>

        <Card>
          <TableToolbar
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHeader headLabel={TABLE_HEAD} rowCount={groups.length} />
                <TableBody>
                  {groups
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { _id, name, admins, createdAt, content } = row;

                      return (
                        <TableRow hover onClick="#" key={_id} tabIndex={-1}>
                          <TableCell align="left">{name}</TableCell>
                          <TableCell align="left">{admins.map(admin => admin.fullname + "\n")}</TableCell>
                          <TableCell align="left">{createdAt}</TableCell>
                          <TableCell align="left">{content}</TableCell>
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
            count={groups.length}
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
