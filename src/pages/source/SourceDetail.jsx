import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Card, Container, Divider, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import Page from "../components/Page";
import LinkBar from "../components/LinkBar";
import AvatarUser from "../components/AvatarUser";

function InfoItem({ title, value, isRequired }) {
  return (
    <TableRow>
      <TableCell width="130">
        <Stack direction="row">
          {isRequired && (
            <Typography variant="subtitle2" color="error.main">
              *
            </Typography>
          )}
          <Typography variant="subtitle2">{title}:</Typography>
        </Stack>
      </TableCell>
      <TableCell sx={{ alignItems: "start" }}>
        <Typography variant="body2">{value}</Typography>
      </TableCell>
    </TableRow>
  );
}

export default function SourceDetail() {
  const navigate = useNavigate();
  const { _id } = useParams();
  console.log(_id);

  const [source, setSource] = useState();

  const handleGetSourceById = async () => {
    try {
      console.log("handleGetSourceById");
      const rest = await axios.get(
        "http://localhost:8000/course/get/" + _id
      );
      setSource(rest.data);
      console.log(rest.data);
    } catch (error) {}
  };

  useEffect(() => {
    handleGetSourceById();
    // eslint-disable-next-line
  }, []);

  const BREADCRUMBS = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Sources", href: "/sourses" },
    { label: source.name, href: "#" }
  ];

  const deleteSourse = async () => {
    try {
      await axios.get(`http://localhost:8000/course/delete/${_id}`);
      toast.success("deleted course");
      navigate("/sources");
    } catch (error) {
      console.log(error.message);
      toast.error("check connection");
    }
  };

  const deleteQuiz = async (quizid) => {
    try {
      await axios.get(`http://localhost:8000/quiz/delete/${quizid}`);
      toast.success("deleted that");
      window.location.reload();
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
            {source?.name}
          </Typography>
          <Button variant="contained" color="error">
            Delete Source
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
                  <InfoItem title="Title" value={source?.name} isRequired />
                  <InfoItem title="Description" value={source?.description} />
                  <InfoItem
                    title="Created By"
                    value={
                      <AvatarUser
                        id={source?.created_by._id}
                        fullname={source?.created_by.fullname}
                        avatar={source?.created_by.avatar_url}
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
                Source Configuration
              </Typography>
              <Divider />

              <InfoItem
                title="Create At"
                value={source?.createdAt?.substring(0, 10)}
                isRequired
              />
              <InfoItem
                title="Update At"
                value={source?.updatedAt?.substring(0, 10)}
              />
            </Card>
          </Grid>
        </Grid>
        <Card></Card>
      </Container>
    </Page>
  );
};