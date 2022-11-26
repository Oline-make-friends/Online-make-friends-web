import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Card,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  Snackbar,
  Stack,
  Tab,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import Page from "../components/Page";
import Image from "../components/Image";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

import { loginByGmail } from "../redux/apiRequest";
import LinkBar from "../components/LinkBar";
import moment from "moment/moment";

const BREADCRUMBS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Profile", href: "#" },
];

const genders = ["Male", "Female"];

function GeneralTab({ info }) {
  const dispatch = useDispatch();

  const [fullname, setFullname] = useState(info.fullname);
  const [gender, setGender] = useState(info.gender);
  const [location, setLocation] = useState(info.location);
  const [major, setMajor] = useState(info.major);
  const [about, setAbout] = useState(info.about);
  const [image, setImage] = useState("");
  const [avatar, setAvatar] = useState(info.avatar_url);
  const [dateOfBirth, setDateOfBirth] = useState(info.date_of_birth);

  const [change, setChange] = useState(false);
  const [loading, setLoading] = useState(false);

  const [snackBar, setSnackBar] = useState(true);
  const [alertContent, setAlertContent] = useState("Hello");
  const [alertType, setAlertType] = useState("info");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBar(false);
  };

  const updateAvatar = async (avatarURL) => {
    try {
      await axios.post(`http://localhost:8000/user/update/${info._id}`, {
        avatar_url: avatarURL,
      });
      setAvatar(avatarURL);
      loginByGmail(info.username, dispatch, null, null);
      setSnackBar(true);
      setAlertType("success");
      setAlertContent("Change Avatar Success!");
    } catch (error) {
      setSnackBar(true);
      setAlertType("error");
      setAlertContent("Change Avatar Fail!");
    }
  };

  const uploadImage = (e) => {
    e.preventDefault();
    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "oi7qyalz");
      setLoading(true);
      axios
        .post(
          "https://api.cloudinary.com/v1_1/mklaaicogido123/image/upload",
          formData
        )
        .then((response) => {
          // setUrl(response.data.url);
          // setAvatar(response.data.url);
          setLoading(false);
          updateAvatar(response.data.url);
        })
        .catch((err) => {
          setLoading(false);
          console.error(err);
        });
    } else {
      setSnackBar(true);
      setAlertType("warning");
      setAlertContent("Choose image before change!");
    }
  };

  const updateProfile = async () => {
    try {
      await axios.post(`http://localhost:8000/user/update/${info._id}`, {
        fullname: fullname,
        about: about,
        gender: gender,
        location: location,
        major: major,
        date_of_birth: dateOfBirth,
      });
      loginByGmail(info.username, dispatch, null, null);
      setSnackBar(true);
      setAlertType("success");
      setAlertContent("Update Profile Success!");
      setChange(false);
    } catch (error) {
      setSnackBar(true);
      setAlertType("error");
      setAlertContent("Update Profile Fail!");
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={snackBar}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={alertType}>
          {alertContent}
        </Alert>
      </Snackbar>
      <Stack direction="row" spacing={5} my={4} alignItems="center">
        <Stack direction="column">
          <Image image={info.avatar_url} alt={info.fullname} style={{borderRadius: "50%", width: 80, height: 80}}/>
          <input
            id="ip"
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            sx={{ display: "none" }}
          />
        </Stack>
        <Button variant="outlined" sx={{ height: "50%" }} onClick={uploadImage}>
          Update Avatar
        </Button>
      </Stack>
      <Divider />
      <Stack spacing={5} my={4}>
        <TextField
          required
          disabled
          name="email"
          label="Email"
          value={info?.username}
        />
        <TextField
          required
          name="fullname"
          label="Fullname"
          value={fullname}
          onChange={(e) => {
            setFullname(e.target.value);
            setChange(true);
          }}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={genders}
          value={gender}
          onChange={(event, newValue) => {
            setGender(newValue);
            setChange(true);
          }}
          renderInput={(params) => (
            <TextField {...params} name="gender" label="Gender" />
          )}
        />
        <TextField
          name="location"
          label="Location"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
            setChange(true);
          }}
        />
        <TextField
          name="major"
          label="Major"
          value={major}
          onChange={(e) => {
            setMajor(e.target.value);
            setChange(true);
          }}
        />
        <TextField
          multiline
          name="about"
          label="About"
          value={about}
          onChange={(e) => {
            setAbout(e.target.value);
            setChange(true);
          }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date of birth"
            value={dateOfBirth}
            maxDate={moment().subtract(15, "years")._d}
            onChange={(newValue) => {
              setDateOfBirth(newValue);
              setChange(true);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Button disabled={!change} variant="contained" onClick={updateProfile}>
          Update
        </Button>
      </Stack>
    </Box>
  );
}

function UpdatePasswordTab() {
  const user = useSelector((state) => state.auth?.login?.currentUser);
  const [password, setPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirm, setConfirm] = useState();
  const [noti, setNoti] = useState();

  const [showPassword, setShowPassword] = useState();
  const [showNewPassword, setShowNewPassword] = useState();
  const [showConfirm, setShowConfirm] = useState();
  console.log(user);

  const updatePassword = async () => {
    try {
      if (password !== user.password) {
        setNoti("Current password is wrong");
        return;
      }
      if (newPassword !== confirm) {
        setNoti("Confirm password is wrong");
        return;
      }
      await axios.post(`http://localhost:8000/user/update/${user._id}`, {
        password: newPassword,
      });
      setPassword("");
      setNewPassword("");
      setConfirm("");
      setNoti("Update password success");
    } catch (error) {
      setNoti("Update password fail,check input");
    }
  };

  return (
    <form>
      <Stack direction="column" spacing={5} my={4} alignItems="start">
        <b>{noti}</b>
        <TextField
          required
          fullWidth
          name="password"
          label="Current Password"
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? "text" : "password"}
          value={password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          value={newPassword}
          required
          fullWidth
          name="newPassword"
          label="New Password"
          onChange={(e) => setNewPassword(e.target.value)}
          type={showNewPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  edge="end"
                >
                  {showNewPassword ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          value={confirm}
          required
          fullWidth
          name="confirm"
          label="Confirm Password"
          onChange={(e) => setConfirm(e.target.value)}
          type={showConfirm ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirm(!showConfirm)}
                  edge="end"
                >
                  {showConfirm ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          onClick={() => {
            updatePassword();
          }}
        >
          Update
        </Button>
      </Stack>
    </form>
  );
}

const Profile = () => {
  const user = useSelector((state) => state.auth?.login.currentUser);

  const [value, setValue] = useState("general");
  const handleTab = (event, newValue) => {
    setValue(newValue);
  };

  console.log(user);

  return (
    <Page title="Profile">
      <LinkBar array={BREADCRUMBS}></LinkBar>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Your Profile
          </Typography>
        </Stack>
        <Card sx={{ maxWidth: "750px" }}>
          <TabContext value={value} onChange={handleTab}>
            <Box>
              <TabList onChange={handleTab}>
                <Tab value="general" label="General" />
                <Tab value="update" label="Update Password" />
              </TabList>
            </Box>
            <TabPanel value="general">
              <GeneralTab info={user} />
            </TabPanel>
            <TabPanel value="update">
              <UpdatePasswordTab />
            </TabPanel>
          </TabContext>
        </Card>
      </Container>
    </Page>
  );
};

export default Profile;
