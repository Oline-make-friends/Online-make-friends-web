import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import axios from "axios";
import { filter } from "lodash";

import { Card, Container, Stack, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Typography } from "@mui/material";

import LinkBar from "../../components/LinkBar";
import Page from "../../components/Page";
import { TableHeader, TableToolbar } from "../../components/table";
import Scrollbar from "../../components/Scrollbar";
import AvatarUser from "../../components/AvatarUser";
import SearchNotFound from "../../components/SearchNotFound";

const BREADCRUMBS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Source", href: "#" },
];

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "description", label: "Description", alignRight: false },
  { id: "amount", label: "Question Amount", alignRight: false },
  { id: "createdBy", label: "Creator", alignRight: false },
  { id: "createdAt", label: "Created Day", alignRight: false },
  { id: "updatedAt", label: "Updated Day", alignRight: false },
  { id: "" },
];

function applyFilter(array, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  if (query) {
    return filter(
      array,
      (_source) => _source.name.to.indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Source() {
  const navigate = useNavigate();
  const [sources, setSource] = useState([]);

  const handleGetAllSource = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/course/getAll`);
      console.log(res.data);
      setSource(res.data?.reverse());
    } catch (error) {
      console.log(error.message);
      toast.error("can not get all source");
    }
  };

  useEffect(() => {
    handleGetAllSource();
    // eslint-disable-next-line
  }, []);

  const [page, setPage] = useState(0);

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (source, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (source) => {
    setRowsPerPage(parseInt(source.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (source) => {
    setFilterName(source.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sources.length) : 0;

  const filteredSources = applyFilter(sources, filterName);

  const isSourceNotFound = filteredSources.length === 0;
  
  return (
    <Page title="Source">
      <LinkBar array={BREADCRUMBS}></LinkBar>
      <Container>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
          >
            <Typography variant="h4" gutterBottom>
              Sources
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
                    rowCount={sources.length}
                  />
                  <TableBody>
                    {sources
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                        const {
                          _id,
                          name,
                          description,
                          quizs,
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
                                navigate("/source/" + _id);
                              }}
                            >
                              {name}
                            </TableCell>
                            <TableCell align="left">{description}</TableCell>
                            <TableCell align="center">{quizs.length}</TableCell>
                            <TableCell align="left">
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
  
                  {isSourceNotFound && (
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
              count={sources.length}
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
