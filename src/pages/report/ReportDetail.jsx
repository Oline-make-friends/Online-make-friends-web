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
import { sentenceCase } from "change-case";
import { useEffect, useState } from "react";
import { HiTrash } from "react-icons/hi";
import { useNavigate, useParams } from "react-router";
import AvatarUser from "../../components/AvatarUser";
import Label from "../../components/Label";
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

export default function ReportDetail() {
  const navigate = useNavigate();
  const { _id } = useParams();

  const [report, setReport] = useState();

  const handleGetReportById = async () => {
    try {
      const rest = await axios.get(
        "http://localhost:8000/report/getReport/" + _id
      );
      setReport(rest.data);
      console.log(rest.data);
    } catch (error) {}
  };

  const handleDeleteReport = async (id) => {
    try {
      await axios.post("http://localhost:8000/report/delete/" + _id);
      navigate("/reports");
    } catch (error) {}
  };
  const handleStatusReport = async (id) => {
    try {
      await axios.post("http://localhost:8000/report/updateStatus/" + _id);
      handleGetReportById();
    } catch (error) {}
  };

  useEffect(() => {
    handleGetReportById();
    // eslint-disable-next-line
  }, []);

  const BREADCRUMBS = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Report", href: "/reports" },
    { label: "Report Detail", href: "#" },
  ];

  return (
    <Page title="Report">
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
          <Button
            sx={{ margin: 2 }}
            color="error"
            variant="outlined"
            startIcon={<HiTrash />}
            onClick={() => handleDeleteReport()}
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
