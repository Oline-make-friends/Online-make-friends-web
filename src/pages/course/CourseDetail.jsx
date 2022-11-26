import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Stack,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import Page from "../../components/Page";
import LinkBar from "../../components/LinkBar";
import AvatarUser from "../../components/AvatarUser";
import { HiTrash } from "react-icons/hi";
import InfoItem from "../../components/InfoItem";

export default function CourseDetail() {
  const navigate = useNavigate();
  const { _id } = useParams();

  const [course, setCourse] = useState();

  const handleGetCourseById = async () => {
    try {
      const rest = await axios.get("http://localhost:8000/course/get/" + _id);
      setCourse(rest.data);
      console.log(rest.data);
    } catch (error) {}
  };

  useEffect(() => {
    handleGetCourseById();
    // eslint-disable-next-line
  }, []);

  const BREADCRUMBS = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Course", href: "/courses" },
    { label: course?.name, href: "#" },
  ];

  const deleteCourse = async () => {
    try {
      await axios.get("http://localhost:8000/course/delete/" + _id);
      toast.success("deleted course");
      navigate("/courses");
    } catch (error) {
      console.log(error.message);
      toast.error("check connection");
    }
  };

  return (
    <Page title="EventDetail">
      <LinkBar array={BREADCRUMBS}></LinkBar>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h4" gutterBottom>
            {course?.name}
          </Typography>
          <Button
            variant="outlined"
            color="error"
            startIcon={<HiTrash />}
            onClick={deleteCourse}
          >
            Delete
          </Button>
        </Stack>
        <Grid container spacing={1}>
          <Grid item xs={6} md={8}>
            <TableContainer component={Card} sx={{ padding: 2, mb: 2 }}>
              <Typography variant="subtitle1" mb={2}>
                Basic Information
              </Typography>
              <Divider />
              <Table>
                <TableBody>
                  <InfoItem title="Title" value={course?.name} isRequired />
                  <InfoItem title="Description" value={course?.description} />
                  <InfoItem
                    title="Created By"
                    value={
                      <AvatarUser
                        id={course?.created_by._id}
                      />
                    }
                  />
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={6} md={4}>
            <Card sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle1" mb={2}>
                Course Configuration
              </Typography>
              <Divider />

              <InfoItem
                title="Create At"
                value={course?.createdAt?.substring(0, 10)}
                isRequired
              />
              <InfoItem
                title="Update At"
                value={course?.updatedAt?.substring(0, 10)}
              />
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Container>
        {course?.quizs.map((row, counter) => {
          const { question, options, answer } = row;
          return (
            <Card sx={{ p: 2, mb: 2 }}>
              <Stack mb={2}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="subtitle1" gutterBottom>
                    Question {counter + 1}
                  </Typography>
                </Stack>
                <Divider />
              </Stack>
              <Grid container spacing={2}>
                <Grid item xs={6} md={8}>
                  <Typography variant="body2">{question}</Typography>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Stack direction="column">
                    {options.map((op, i) => {
                      return (
                        <Typography
                          variant="body2"
                          color={op === answer ? "success.dark" : ""}
                        >
                          Option {i + 1}: {op}
                        </Typography>
                      );
                    })}
                  </Stack>
                </Grid>
              </Grid>
            </Card>
          );
        })}
      </Container>
    </Page>
  );
}
