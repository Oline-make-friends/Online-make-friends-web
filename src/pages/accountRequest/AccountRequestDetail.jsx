import {
  Avatar,
  Button,
  Card,
  Divider,
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
import { useParams } from "react-router";
import Label from "../../components/Label";
import LinkBar from "../../components/LinkBar";
import Page from "../../components/Page";

const BREADCRUMBS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Request", href: "#" },
];

function InfoItem({ title, value, isRequired }) {
  return (
    <TableRow>
      <TableCell width="20%">
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

export default function AccountRequestDetail() {
  const { _id } = useParams();

  const [request, setRequest] = useState();

  const handleGetRequestById = async () => {
    try {
      const rest = await axios.post(
        "http://localhost:8000/user/getUser/" + _id
      );
      setRequest(rest.data);
      console.log(rest.data);
    } catch (error) {}
  };
  const handleStatusUser = async () => {
    try {
      await axios.post(`http://localhost:8000/user/blockUser/${_id}`);
      await axios.post(`http://localhost:8000/user/proveUser/${_id}`);
      handleGetRequestById();
    } catch (error) {}
  };

  useEffect(() => {
    handleGetRequestById();
    // eslint-disable-next-line
  }, []);

  return (
    <Page title="Request">
      <LinkBar array={BREADCRUMBS}></LinkBar>

      <TableContainer component={Card} sx={{ padding: 2, mb: 2 }}>
        <Typography variant="subtitle1" mb={2}>
          Basic Information
        </Typography>
        <Divider />

        <Table sx={{ minWidth: 500 }}>
          <TableBody>
            <InfoItem
              title="Avatar"
              value={
                <Avatar
                  variant="square"
                  sx={{ borderRadius: 1, width: 122, height: 122 }}
                  alt={request?.fullname}
                  src={request?.avatar_url}
                />
              }
              isRequired
            />
            <InfoItem title="Fullname" value={request?.fullname} isRequired />
            <InfoItem title="Email" value={request?.username} isRequired />
            <InfoItem
              title="Gender"
              value={
                <Label
                  variant="ghost"
                  color={request?.gender === "Male" ? "info" : "error"}
                >
                  {request?.gender}
                </Label>
              }
            />
            <InfoItem
              title="Prove Image"
              value={
                <Avatar
                  variant="square"
                  sx={{ borderRadius: 1, width: 122, height: 122 }}
                  alt="prove_image"
                  src={request?.proveImage_url}
                />
              }
              isRequired
            />
            <InfoItem
              title="Status"
              value={
                <Label
                  variant="ghost"
                  color={request?.is_active ? "info" : "error"}
                >
                  {request?.is_active === true ? "Proved" : "Not yet"}
                </Label>
              }
            />
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer component={Card} sx={{ padding: 2 }}>
        <Typography variant="subtitle1" mb={2}>
          Account Configuration
        </Typography>
        <Divider />

        <Table sx={{ minWidth: 500 }}>
          <TableBody>
            <InfoItem
              title="Create At"
              value={request?.createdAt?.substring(0, 10)}
              isRequired
            />
            <InfoItem
              title="Update At"
              value={request?.updatedAt?.substring(0, 10)}
            />
          </TableBody>
        </Table>
      </TableContainer>
      <Stack direction="row" justifyContent="left">
        <Button
          sx={{ margin: 2 }}
          color="success"
          variant="contained"
          onClick={() => handleStatusUser()}
        >
          Prove
        </Button>
        <Button
          sx={{ margin: 2 }}
          color="error"
          variant="contained"
          onClick={() => handleStatusUser()}
        >
          Disprove
        </Button>
      </Stack>
    </Page>
  );
}
