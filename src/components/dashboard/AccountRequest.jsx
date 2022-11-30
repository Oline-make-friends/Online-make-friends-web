import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import * as CONSTANT from "../../constans/constans";

export default function AccountRequest() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const handleGetAllRequest = async () => {
    try {
      const rest = await axios.get(
        `${CONSTANT.SERVER}/user/getAllProveAccount`
      );
      setRequests(rest.data);
    } catch (error) {}
  };

  useEffect(() => {
    handleGetAllRequest();
  }, []);

  return (
    <Card>
      <CardHeader title="Account Requests" />
      <CardContent>
        {requests.map(
          (request) =>
            !request.is_prove && (
              <div>
                <Divider />
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  paddingY={2}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/request/" + request._id);
                  }}
                >
                  <Avatar alt={request.fullname} src={request.avatar_url} />
                  <Typography variant="body" noWrap>
                    {request.username}
                  </Typography>
                </Stack>
              </div>
            )
        )}
      </CardContent>
    </Card>
  );
}
