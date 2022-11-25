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
import { TableHeader } from "../../components/table";
import AvatarUser from "../../components/AvatarUser";
import { useNavigate } from "react-router";
import LinkBar from "../../components/LinkBar";

const TABLE_HEAD = [
  { id: "content", label: "Content", alignRight: false },
  { id: "sent_by", label: "Reporter", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "createdAt", label: "Created At", alignRight: false },
  { id: "updatedAt", label: "Updated At", alignRight: false },
  { id: "" },
];

const BREADCRUMBS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Report", href: "#" },
];

function applyFilter(array, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  if (query) {
    return filter(
      array,
      (report) =>
        report.content.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Report() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const handleGetAllReport = async () => {
    try {
      const res = await axios.get("http://localhost:8000/report/getAll");
      toast.success("get report success!");
      setReports(res.data);
      console.log(res.data);
    } catch (error) {
      toast.error("get report fail!");
    }
  };

  useEffect(() => {
    handleGetAllReport();
  }, []);

  const [page, setPage] = useState(0);

  const [filterReport, setFilterReport] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByContent = (event) => {
    setFilterReport(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - reports.length) : 0;

  const filteredReportList = applyFilter(reports, filterReport);

  const isReportNotFound = filteredReportList.length === 0;

  return (
    <Page title="Report">
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
          {/* <TableToolbar
            filterName={filterReport}
            onFilterName={handleFilterByContent}
          /> */}

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHeader headLabel={TABLE_HEAD} rowCount={reports.length} />
                <TableBody>
                  {reports
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
                        <SearchNotFound searchQuery={filterReport} />
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
            count={reports.length}
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
