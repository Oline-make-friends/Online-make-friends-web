import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useState, useEffect } from "react";
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
import Label from "../../components/Label";
import Scrollbar from "../../components/Scrollbar";
import SearchNotFound from "../../components/SearchNotFound";
import { TableHeader, TableToolbar } from "../../components/table";
import AvatarUser from "../../components/AvatarUser";
import { useNavigate } from "react-router";
import LinkBar from "../../components/LinkBar";
import { FILTER_REPORT_STATUS_OPTIONS, REPORT_TABLE_HEAD } from "../../constans/constans";

const BREADCRUMBS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Report", href: "#" },
];

function applyFilter(array, searchQuery, reporterQuery, statusQuery) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  var filteredList = array;
  if (searchQuery || reporterQuery || statusQuery) {
    if (searchQuery) {
      filteredList = filter(
        filteredList,
        (_report) =>
          _report.content &&
          _report.content
            .trim()
            .toLowerCase()
            .indexOf(searchQuery.trim().toLowerCase()) !== -1
      );
    }
    if (reporterQuery) {
      filteredList = filter(
        filteredList,
        (_report) =>
        _report.sent_by &&
        _report.sent_by._id.trim() === reporterQuery.trim()
      );
    }
    if (statusQuery) {
      filteredList = filter(
        filteredList,
        (_report) => _report.status.toString() === statusQuery.toLowerCase()
      );
    }
    return filteredList;
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Report() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [reporterQuery, setReporterQuery] = useState("");
  const [statusQuery, setStatusQuery] = useState("");
  const [reporterList, setReporterList] = useState([]);

  const filteredReports = applyFilter(
    reports,
    searchQuery,
    reporterQuery,
    statusQuery
  );

  const isReportNotFound = filteredReports.length === 0;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredReports.length) : 0;
    
  const handleGetAllReport = async () => {
    try {
      const res = await axios.get("http://localhost:8000/report/getAll");
      setReports(res.data);

      const res2 = await axios.get("http://localhost:8000/user/getAllUser");
      console.log(res2.data[0]);
      const temp = [{ value: "", display: "All" }];
      for (let i = 0; i < res2.data.length; i++) {
        temp.push({
          value: res2.data[i]._id,
          display: res2.data[i].fullname,
        });
      }
      console.log(temp);
      setReporterList(
        temp.sort(function (a, b) {
          if (a.display.toLowerCase() === "all") return -1;
          if (b.display.toLowerCase() === "all") return 1;
          if (a.display.toLowerCase() < b.display.toLowerCase()) return -1;
          if (a.display.toLowerCase() > b.display.toLowerCase()) return 1;
          return 0;
        })
      );
    } catch (error) {
      toast.error("get report fail!");
    }
  };

  useEffect(() => {
    handleGetAllReport();
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

  const handleReporterQuery = (event) => {
    setReporterQuery(event.target.value);
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
      label: "Search by Content...",
      onChange: handleSearchQuery,
    },
    {
      type: "select",
      query: reporterQuery,
      label: "Reporter",
      onChange: handleReporterQuery,
      items: reporterList
    },
    {
      type: "select",
      query: statusQuery,
      label: "Status",
      onChange: handleStatusQuery,
      items: FILTER_REPORT_STATUS_OPTIONS
    }
  ];

  return (
    <Page title="Reports">
      <LinkBar array={BREADCRUMBS} />
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Report
          </Typography>
        </Stack>

        <Card>
          <TableToolbar conditions={FILTER_CONDITIONS} />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHeader
                  headLabel={REPORT_TABLE_HEAD}
                  rowCount={filteredReports.length}
                />
                <TableBody>
                  {filteredReports
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        _id,
                        sent_by,
                        content,
                        status,
                        createdAt,
                        updatedAt,
                      } = row;

                      return (
                        <TableRow hover key={_id} tabIndex={-1}>
                          <TableCell
                            align="left"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              navigate("/report/" + _id);
                            }}
                          >
                            {content}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <AvatarUser id={sent_by._id} />
                          </TableCell>
                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={status ? "success" : "warning"}
                            >
                              {sentenceCase(status ? "Done" : "Pending")}
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

                {isReportNotFound && (
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
            count={filteredReports.length}
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
