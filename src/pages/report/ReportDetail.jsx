import {
  Alert,
  Button,
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
import { sentenceCase } from "change-case";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import AvatarUser from "../../components/AvatarUser";
import Label from "../../components/Label";
import LinkBar from "../../components/LinkBar";
import Page from "../../components/Page";
import InfoItem from "../../components/InfoItem";
import DeleteButton from "../../components/DeleteButton";

export default function ReportDetail() {
  const navigate = useNavigate();
  const { _id } = useParams();
  const [report, setReport] = useState();

  const [snackBar, setSnackBar] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [alertType, setAlertType] = useState("");

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBar(false);
  };

  const handleGetReportById = async () => {
    try {
      const rest = await axios.get(
        "http://localhost:8000/report/getReport/" + _id
      );
      setReport(rest.data);
    } catch (error) {
      navigate("/404");
    }
  };

  const handleDeleteReport = async (id) => {
    try {
      await axios.post("http://localhost:8000/report/delete/" + _id);
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

  const handleStatusReport = async (id) => {
    try {
      await axios.post("http://localhost:8000/report/updateStatus/" + _id);
      setSnackBar(true);
      setAlertContent("Mark Done Report Success!");
      setAlertType("success");
    } catch (error) {
      setSnackBar(true);
      setAlertContent("Mark Done Report Fail!");
      setAlertType("error");
    }
  };

  useEffect(() => {
    handleGetReportById();
    // eslint-disable-next-line
  }, [report]);

  const BREADCRUMBS = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Reports", href: "/reports" },
    { label: "Report Detail", href: "#" },
  ];

  return (
    <Page title="Report Detail">
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
            Report Detail
          </Typography>
          <DeleteButton type="report" action={handleDeleteReport} />
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
                    title="Content"
                    value={report?.content}
                    isRequired
                  />
                  <InfoItem
                    title="Reporter"
                    value={<AvatarUser id={report?.sent_by?._id} />}
                    isRequired
                  />
                  <InfoItem
                    title="Status"
                    value={
                      <Label
                        variant="ghost"
                        color={report?.status ? "success" : "warning"}
                      >
                        {sentenceCase(report?.status ? "Done" : "Pending")}
                      </Label>
                    }
                    isRequired
                  />
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={6} md={4}>
            <Card sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle1" mb={2}>
                Report Configuration
              </Typography>
              <Divider />

              <InfoItem
                title="Create At"
                value={report?.createdAt?.substring(0, 10)}
                isRequired
              />
              <InfoItem
                title="Update At"
                value={report?.updatedAt?.substring(0, 10)}
              />
            </Card>
          </Grid>
        </Grid>
        <Stack direction="row" justifyContent="left" sx={{ zIndex: "-1" }}>
          {!report?.status && (
            <Button
              sx={{ margin: 2 }}
              color="success"
              variant="contained"
              onClick={() => handleStatusReport()}
            >
              Mark done
            </Button>
          )}
        </Stack>
      </Container>
    </Page>
  );
}
