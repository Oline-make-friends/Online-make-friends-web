import {
  Button,
  Card,
  Divider,
  Stack,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Label from "../../components/Label";
import LinkBar from "../../components/LinkBar";
import Page from "../../components/Page";
import Image from "../../components/Image";
import InfoItem from "../../components/InfoItem";

const BREADCRUMBS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Request", href: "#" },
];

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
      <LinkBar array={BREADCRUMBS} />

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
                <Image
                  image={request?.avatar_url}
                  alt={request?.fullname}
                  style={{ borderRadius: 10, width: 122, height: 122 }}
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
                <Image
                  image={request?.proveImage_url}
                  alt="prove_image"
                  style={{ borderRadius: 10, width: 122, height: 122 }}
                />
              }
              isRequired
            />
            <InfoItem
              title="Status"
              value={
                <Label
                  variant="ghost"
                  color={request?.is_prove ? "info" : "error"}
                >
                  {request?.is_prove === true ? "Proved" : "Not yet"}
                </Label>
              }
            />
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer component={Card} sx={{ padding: 2, zIndex: "-1" }}>
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
      <Stack direction="row" justifyContent="left" sx={{ zIndex: "-1" }}>
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
