import {
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

export default function NotificationDetail() {
  const navigate = useNavigate();
  const { _id } = useParams();
  const [notification, setNotification] = useState();

  const handleGetNotificationById = async () => {
    try {
      const res = await axios.get("http://localhost:8000/noti/getById/" + _id);
      setNotification(res.data);
      console.log(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    handleGetNotificationById();
    // eslint-disable-next-line
  }, []);

  const handleDelete = async () => {
    try {
      await axios.post("http://localhost:8000/noti/delete/" + _id);
      navigate("/notifications");
    } catch (error) {}
  };

  const BREADCRUMBS = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Notification", href: "/notifications" },
    { label: "Notification Detail", href: "#" },
  ];

  return (
    <Page title="Notification">
      <LinkBar array={BREADCRUMBS}></LinkBar>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h4" gutterBottom>
            {notification?.title}
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
                  <InfoItem
                    title="Title"
                    value={notification?.title}
                    isRequired
                  />

                  <InfoItem title="Content" value={notification?.content} />
                  <InfoItem
                    title="Created By"
                    value={<AvatarUser id={notification?.user_id} />}
                    isRequired
                  />
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={6} md={4}>
            <Card sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle1" mb={2}>
                Account Configuration
              </Typography>
              <Divider />

              <InfoItem
                title="Create At"
                value={notification?.createdAt?.substring(0, 10)}
                isRequired
              />
              <InfoItem
                title="Update At"
                value={notification?.updatedAt?.substring(0, 10)}
              />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
