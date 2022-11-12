import { filter } from 'lodash';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from "axios";

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
} from '@mui/material';

import { HiPlus, HiTrash } from "react-icons/hi";

import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { TableHeader, TableToolbar } from '../components/table';

const TABLE_HEAD = [
  { id: 'title', label: 'Title', alignRight: false },
  { id: 'content', label: 'Content', alignRight: false },
  { id: 'createAt', label: 'Created Day', alignRight: false },
  { id: 'user_id', label: 'Created By', alignRight: false },
  { id: '' },
];

function applyFilter(array, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  if (query) {
    return filter(array, (noti) => noti.title.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Notification() {
  const [notis, setNotis] = useState([]);
  const handleGetAllNoti = async () => {
    try {
      const res = await axios.get("http://localhost:8000/noti/getAll");
      toast.success("get notification success!");
      setNotis(res.data);
      console.log(res.data);
    } catch (error) {
      toast.error("get notification  fail!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.post("http://localhost:8000/noti/delete/" + id);
      toast.success("delete notification success!");
      handleGetAllNoti();
    } catch (error) {
      toast.error("delete notification  fail!");
    }
  };
  useEffect(() => {
    handleGetAllNoti();
    // eslint-disable-next-line
  }, []);

  const [page, setPage] = useState(0);

  const [filterNoti, setFilterNoti] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByTitle = (event) => {
    setFilterNoti(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - notis.length) : 0;

  const filteredNotiList = applyFilter(notis, filterNoti);

  const isNotiNotFound = filteredNotiList.length === 0;

  return (
    <Page title="Notification">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Notification
          </Typography>
          <Button variant="contained" component={RouterLink} to="#" startIcon={<HiPlus/>}>
            New Notification
          </Button>
        </Stack>

        <Card>
          <TableToolbar filterName={filterNoti} onFilterName={handleFilterByTitle} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHeader
                  headLabel={TABLE_HEAD}
                  rowCount={notis.length}
                />
                <TableBody>
                  {notis.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { _id, title, content, createdAt, updatedAt } = row;

                    return (
                      <TableRow hover key={_id} tabIndex={-1}>
                        <TableCell align="left">{title}</TableCell>
                        <TableCell align="left">{content}</TableCell>
                        <TableCell align="left">{createdAt}</TableCell>
                        <TableCell align="left">{updatedAt}</TableCell>
                        <TableCell component="th" scope="row">
                          <Button
                          sx={{backgroundColor: "error"}}
                            variant="contained"
                            onClick={handleDelete(_id)}
                            startIcon={<HiTrash />}
                          >
                            Delete
                          </Button>
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

                {isNotiNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterNoti} />
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
            count={notis.length}
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
