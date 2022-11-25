import { filter } from "lodash";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

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
import NewNotification from "./NewNotification";
import AvatarUser from "../../components/AvatarUser";

const TABLE_HEAD = [
  { id: "title", label: "Title", alignRight: false },
  { id: "content", label: "Content", alignRight: false },
  { id: "receiver", label: "Receiver", alignRight: false },
  { id: "createAt", label: "Created At", alignRight: false },
  { id: "updatedAt", label: "Updated At", alignRight: false },
];

const BREADCRUMBS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Notification", href: "#" },
];

function applyFilter(array, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  if (query) {
    return filter(
      array,
      (noti) => noti.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Notification() {
  const navigate = useNavigate();
  const [notis, setNotis] = useState([]);
  // const handleGetAllNoti = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:8000/noti/getAll");
  //     toast.success("get notification success!");
  //     setNotis(res.data);
  //     console.log(res.data);
  //   } catch (error) {
  //     toast.error("get notification  fail!");
  //   }
  // };

  const handleGetAllNoti = async () => {
    try {
      const res = await axios.get("http://localhost:8000/noti/getAll");
      ///
      let temp = [];

      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i]?.user_id?.is_admin === true) {
          temp.push(res.data[i]);
        }
      }
      //////
      setNotis(temp);
    } catch (error) {
      toast.error("get notification fail");
    }
  };

  useEffect(() => {
    handleGetAllNoti();
    // eslint-disable-next-line
  }, []);

  const [page, setPage] = useState(0);

  const [filterNoti, setFilterNoti] = useState("");

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

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - notis.length) : 0;

  const filteredNotiList = applyFilter(notis, filterNoti);

  const isNotiNotFound = filteredNotiList.length === 0;

  return (
    <Page title="Notification">
      <LinkBar array={BREADCRUMBS} />
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Notification
          </Typography>
          <NewNotification />
        </Stack>

        <Card>
          <TableToolbar
            filterName={filterNoti}
            onFilterName={handleFilterByTitle}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHeader headLabel={TABLE_HEAD} rowCount={notis.length} />
                <TableBody>
                  {notis
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        _id,
                        title,
                        content,
                        user_id,
                        createdAt,
                        updatedAt,
                      } = row;

                      return (
                        <TableRow hover key={_id} tabIndex={-1}>
                          <TableCell
                            align="left"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              navigate("/notification/" + _id);
                            }}
                          >
                            {title}
                          </TableCell>

                          <TableCell align="left">
                            {content?.substring(0, 30)}
                            {content?.length > 30 ? "..." : ""}
                          </TableCell>
                          <TableCell align="left">
                            <AvatarUser id={user_id._id} />
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
