import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { filter } from "lodash";

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

import LinkBar from "../../components/LinkBar";
import Page from "../../components/Page";
import { TableHeader, TableToolbar } from "../../components/table";
import Scrollbar from "../../components/Scrollbar";
import AvatarUser from "../../components/AvatarUser";
import SearchNotFound from "../../components/SearchNotFound";
import { COURSE_TABLE_HEAD } from "../../constans/constans";
import * as CONSTANT from "../../constans/constans";

const BREADCRUMBS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Courses", href: "#" },
];

function applyFilter(array, searchQuery, creatorQuery) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  var filteredList = array;
  if (searchQuery || creatorQuery) {
    if (searchQuery) {
      filteredList = filter(
        filteredList,
        (_course) =>
          _course.name
            .trim()
            .toLowerCase()
            .indexOf(searchQuery.trim().toLowerCase()) !== -1 ||
          (_course.description &&
            _course.description
              .trim()
              .toLowerCase()
              .indexOf(searchQuery.trim().toLowerCase()) !== -1)
      );
    }
    if (creatorQuery) {
      filteredList = filter(
        filteredList,
        (_course) =>
          _course.created_by._id.toLowerCase() === creatorQuery.toLowerCase()
      );
    }
    return filteredList;
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Course() {
  const navigate = useNavigate();
  const [courses, setCourse] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [creatorQuery, setCreatorQuery] = useState("");
  const [creatorList, setCreatorList] = useState("");

  const filteredCourses = applyFilter(courses, searchQuery, creatorQuery);

  const isCourseNotFound = filteredCourses.length === 0;

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - filteredCourses.length)
      : 0;

  const handleGetAllCourse = async () => {
    try {
      const res = await axios.get(`${CONSTANT.SERVER}/course/getAll`);
      setCourse(res.data?.reverse());

      const res2 = await axios.get(`${CONSTANT.SERVER}/user/getAllUser`);
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
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    handleGetAllCourse();
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

  const handleCreatorQuery = (event) => {
    setCreatorQuery(event.target.value);
    setPage(0);
  };

  const FILTER_CONDITIONS = [
    {
      type: "input",
      query: searchQuery,
      label: "Search by Name, Description...",
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
    <Page title="Courses">
      <LinkBar array={BREADCRUMBS}></LinkBar>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h4" gutterBottom>
            Courses
          </Typography>
        </Stack>

        <Card>
          <TableToolbar conditions={FILTER_CONDITIONS} />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHeader
                  headLabel={COURSE_TABLE_HEAD}
                  rowCount={filteredCourses.length}
                />
                <TableBody>
                  {filteredCourses
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
                              navigate("/course/" + _id);
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

                {isCourseNotFound && (
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
            count={filteredCourses.length}
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
