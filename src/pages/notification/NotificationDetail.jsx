import {
  Alert,
  Card,
  Container,
  Divider,
  Grid,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import AvatarUser from "../../components/AvatarUser";
import LinkBar from "../../components/LinkBar";
import Page from "../../components/Page";
import InfoItem from "../../components/InfoItem";
import DeleteButton from "../../components/DeleteButton";
import * as CONSTANT from "../../constans/constans";

export default function NotificationDetail() {
  const navigate = useNavigate();
  const { _id } = useParams();
  const [notification, setNotification] = useState();

  const [snackBar, setSnackBar] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [alertType, setAlertType] = useState("");

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBar(false);
  };

  const handleGetNotificationById = async () => {
    try {
      const res = await axios.get(`${CONSTANT.SERVER}/noti/getById/` + _id);
      setNotification(res.data);
    } catch (error) {
      navigate("/404");
    }
  };

  useEffect(() => {
    handleGetNotificationById();
    // eslint-disable-next-line
  }, []);

  const handleDelete = async () => {
    try {
      await axios.post(`${CONSTANT.SERVER}/noti/delete/` + _id);
      setSnackBar(true);
      setAlertContent("Delete Success!");
      setAlertType("success");
      navigate(-1);
    } catch (error) {
      setSnackBar(true);
      setAlertContent("Delete Fail!");
      setAlertType("error");
    }
  };

  const BREADCRUMBS = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Notifications", href: "/notifications" },
    { label: notification?.title, href: "#" },
  ];

  return (
    <Page title="Notification Detail">
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={snackBar}
        autoHideDuration={5000}
        onClose={handleCloseSnackBar}
      >
        <Alert
          variant="filled"
          onClose={handleCloseSnackBar}
          severity={alertType}
          sx={{ color: "#fff" }}
        >
          {alertContent}
        </Alert>
      </Snackbar>
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
          <DeleteButton type="notification" action={handleDelete} />
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
