import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { HiTrash } from "react-icons/hi";
import { useNavigate, useParams } from "react-router";
import AvatarUser from "../../components/AvatarUser";
import LinkBar from "../../components/LinkBar";
import Page from "../../components/Page";
import InfoItem from "../../components/InfoItem";

export default function EventDetail() {
  const navigate = useNavigate();
  const { _id } = useParams();

  const [event, setEvent] = useState();

  const handleGetEventById = async () => {
    try {
      const rest = await axios.get(
        "http://localhost:8000/event/getEvent/" + _id
      );
      setEvent(rest.data);
      console.log(rest.data);
    } catch (error) {}
  };

  useEffect(() => {
    handleGetEventById();
    // eslint-disable-next-line
  }, []);

  const handleDelete = async () => {
    try {
      await axios.post("http://localhost:8000/event/delete/", { id: _id });
      navigate("/events");
    } catch (error) {}
  };

  const BREADCRUMBS = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Event", href: "/events" },
    { label: event?.title, href: "#" },
  ];

  return (
    <Page title="Event">
      <LinkBar array={BREADCRUMBS}></LinkBar>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h4" gutterBottom>
            {event?.title}
          </Typography>
          <Button
            variant="outlined"
            color="error"
            startIcon={<HiTrash />}
            onClick={handleDelete}
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
                  <InfoItem title="Title" value={event?.title} isRequired />
                  <InfoItem title="Type" value={event?.type} isRequired />
                  <InfoItem title="Description" value={event?.description} />
                  <InfoItem
                    title="Organization Day"
                    value={event?.date_time}
                    isRequired
                  />
                  <InfoItem
                    title="Created By"
                    value={
                      <AvatarUser
                        id={event?.created_by._id}
                        fullname={event?.created_by.fullname}
                        avatar={event?.created_by.avatar_url}
                      />
                    }
                    isRequired
                  />
                </TableBody>
              </Table>
            </TableContainer>
            <Card sx={{ p: 2, mb: 2, width: "100%" }}>
              <Typography variant="subtitle1" mb={2}>
                Joiners
              </Typography>
              <Divider />
              <Box
                sx={{
                  mt: 2,
                  display: "grid",
                  gap: 2,
                  gridTemplateColumns: "repeat(2, 1fr)",
                }}
              >
                {event?.user_joined.map((row) => {
                  return (
                    <Card sx={{ p: 2 }}>
                      <AvatarUser
                        id={row._id}
                        fullname={row.fullname}
                        avatar={row.avatar_url}
                      />
                    </Card>
                  );
                })}
              </Box>
            </Card>
          </Grid>
          <Grid item xs={6} md={4}>
            <Card sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle1" mb={2}>
                Account Configuration
              </Typography>
              <Divider />

              <InfoItem
                title="Create At"
                value={event?.createdAt?.substring(0, 10)}
                isRequired
              />
              <InfoItem
                title="Update At"
                value={event?.updatedAt?.substring(0, 10)}
              />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
