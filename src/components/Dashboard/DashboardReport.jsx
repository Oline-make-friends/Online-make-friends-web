import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import {
  Card,
  Divider,
  CardHeader,
  CardContent,
  Typography,
} from "@mui/material";

import axios from "axios";
import { useNavigate } from "react-router";
import * as CONSTANT from "../../constans/constans";

DashboardReport.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function DashboardReport() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const handleGetAllReport = async () => {
    try {
      const res = await axios.get(`${CONSTANT.SERVER}/report/getAll`);
      setReports(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    handleGetAllReport();
  }, []);

  return (
    <Card>
      <CardHeader title="Reports" />
      <CardContent>
        {reports.map((report, count) => (
          <div>
            <Divider />
            <Typography
              sx={{ cursor: "pointer", mt: 2 }}
              onClick={() => navigate("/report/" + report._id)}
            >
              {count + 1}. {report.content}
            </Typography>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
