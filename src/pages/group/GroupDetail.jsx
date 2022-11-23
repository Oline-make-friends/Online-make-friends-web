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
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import Page from "../../components/Page";
import LinkBar from "../../components/LinkBar";
import AvatarUser from "../../components/AvatarUser";
import { HiTrash } from "react-icons/hi";
import Post from "./Post";

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

const GroupDetail = () => {
  const deleteGroup = async () => {
    try {
      await axios.post("http://localhost:8000/group/delete", {
        _id: _id,
      });
      navigate("/groups");
    } catch (error) {
      toast.error("Send noti fail!");
    }
  };
  const navigate = useNavigate();
  const { _id } = useParams();

  const [group, setGroup] = useState();

  const handleGetGroup = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/group/get/${_id}`);
      setGroup(res.data);
      console.log(res.data?.posts);
    } catch (error) {}
  };

  useEffect(() => {
    handleGetGroup();
    // eslint-disable-next-line
  }, []);

  const BREADCRUMBS = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Groups", href: "/groups" },
    { label: "Group detail", href: "/groupDetail" },
  ];
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
            Group Detail
          </Typography>
          <Button
            variant="outlined"
            color="error"
            startIcon={<HiTrash />}
            onClick={() => deleteGroup()}
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
                  <InfoItem title="Group name" value={group?.name} isRequired />
                  <InfoItem title="Description" value={group?.content} />
                  <InfoItem
                    title="Created By"
                    value={
                      <AvatarUser
                        id={group?.admins[0]?._id}
                        url={group?.admins[0]?.avatar_url}
                      />
                      // fullname={source?.created_by.fullname}
                      // avatar={source?.created_by.avatar_url}
                    }
                  />
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={6} md={4}>
            <Card sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle1" mb={2}>
                Group Configuration
              </Typography>
              <Divider />

              <InfoItem
                title="Create At"
                value={group?.createdAt?.substring(0, 10)}
                isRequired
              />
              <InfoItem
                title="Update At"
                value={group?.updatedAt?.substring(0, 10)}
              />
            </Card>
          </Grid>
        </Grid>

        {/* //////////////? */}
        <Post id={_id} />
        {/* //////////////////// */}
      </Container>
    </Page>
  );
};

export default GroupDetail;
