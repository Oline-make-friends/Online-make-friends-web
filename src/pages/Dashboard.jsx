import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { Grid, Container, Typography } from "@mui/material";

import Page from "../components/Page";
import DashboardReport from "../sections/dashboard/DashboardReport";
import AppWidgetSummary from "../components/Dashboard/AppWidgetSummary";
import Report from "./Report";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [isActive, setIsActive] = useState([]);
  const [male, setMale] = useState([]);
  const [female, setFemale] = useState([]);
  const handleGetAllUser = async () => {
    try {
      const res = await axios.get("http://localhost:8000/user/getAllUser");
      toast.success("get user success!");
      let isActive = 0;
      let male = 0;
      let female = 0;
      setUsers(res.data);
      res.data.map((user) => {
        if (user.is_active === true) isActive++;
        if (user.gender === "Male") male++;
        return "";
      });
      female = res.data.length - male;
      setIsActive(isActive);
      setFemale(female);
      setMale(male);

      console.log(res.data);
    } catch (error) {
      toast.error("get notification  fail!");
    }
  };
  useEffect(() => {
    handleGetAllUser();
  }, []);

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Total user"
              total={users.length}
              icon="<FaUsers size={24}/>"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Is active"
              total={isActive}
              color="info"
              icon={"<VscVmActive size{24}/>"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Male"
              total={male}
              color="warning"
              icon={"ant-design:windows-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Female"
              total={female + " "}
              color="error"
              icon={"ant-design:bug-filled"}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <DashboardReport
              title="Report"
              list={[
                { id: "1", label: "Create FireStone Logo" },
                { id: "2", label: "Add SCSS and JS files if required" },
                { id: "3", label: "Stakeholder Meeting" },
                { id: "4", label: "Scoping & Estimations" },
                { id: "5", label: "Sprint Showcase" },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
