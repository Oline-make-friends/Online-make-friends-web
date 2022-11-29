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
import { NOTI_TABLE_HEAD } from "../../constans/constans";

const BREADCRUMBS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Notifications", href: "#" },
];

function applyFilter(array, searchQuery, creatorQuery) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  var filteredList = array;
  if (searchQuery || creatorQuery) {
    if (searchQuery) {
      filteredList = filter(
        filteredList,
        (_noti) =>
          (_noti.title &&
            _noti.title
              .trim()
              .toLowerCase()
              .indexOf(searchQuery.trim().toLowerCase()) !== -1) ||
          (_noti.content &&
            _noti.content
              .trim()
              .toLowerCase()
              .indexOf(searchQuery.trim().toLowerCase()) !== -1)
      );
    }
    if (creatorQuery) {
      filteredList = filter(
        filteredList,
        (_noti) =>
          _noti.user_id && _noti.user_id._id.trim() === creatorQuery.trim()
      );
    }
    return filteredList;
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Notification() {
  const navigate = useNavigate();
  const [notis, setNotis] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [creatorQuery, setCreatorQuery] = useState("");
  const [creatorList, setCreatorList] = useState([]);

  const filteredNotis = applyFilter(notis, searchQuery, creatorQuery);

  const isNotiNotFound = filteredNotis.length === 0;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredNotis.length) : 0;

  const handleGetAllNoti = async () => {
    try {
      const res = await axios.get("http://localhost:8000/noti/getAll");
      let temp = [];
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i]?.user_id?.is_admin === true) {
          temp.push(res.data[i]);
        }
      }
      setNotis(temp);

      const res2 = await axios.get("http://localhost:8000/user/getAllAdmin");
      const temp2 = [{ value: "", display: "All" }];
      for (let i = 0; i < res2.data.length; i++) {
        temp2.push({
          value: res2.data[i]._id,
          display: res2.data[i].fullname
            ? res2.data[i].fullname
            : res2.data[i].username,
        });
      }
      setCreatorList(
        temp2.sort(function (a, b) {
          if (a.display.toLowerCase() === "all") return -1;
          if (b.display.toLowerCase() === "all") return 1;
          if (a.display.toLowerCase() < b.display.toLowerCase()) return -1;
          if (a.display.toLowerCase() > b.display.toLowerCase()) return 1;
          return 0;
        })
      );
    } catch (error) {
      toast.error("get notification fail");
    }
  };

  useEffect(() => {
    handleGetAllNoti();
    // eslint-disable-next-line
  }, [notis]);

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

  const handleCreatorQuery = (event) => {
    setCreatorQuery(event.target.value);
    setPage(0);
  };

  const FILTER_CONDITIONS = [
    {
      type: "input",
      query: searchQuery,
      label: "Search by Title, Content...",
      onChange: handleSearchQuery,
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
    <Page title="Notifications">
      <LinkBar array={BREADCRUMBS} />
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Notifications
          </Typography>
          <NewNotification />
        </Stack>

        <Card>
          <TableToolbar conditions={FILTER_CONDITIONS} />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHeader
                  headLabel={NOTI_TABLE_HEAD}
                  rowCount={filteredNotis.length}
                />
                <TableBody>
                  {filteredNotis
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
            count={filteredNotis.length}
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
