import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, FormControl } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

import {
  loginUser,
  handleSendEmailResetPassword,
} from "../../redux/apiRequest";

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const logIn = async (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      password: password,
    };
    loginUser(newUser, dispatch, navigate, toast);
  };

  const handleSendEmailReset = () => {
    handleSendEmailResetPassword(toast, username);
  };

  return (
    <form onSubmit={logIn}>
      <Stack spacing={3}>
        <TextField name="username" label="Username" onChange={(e) => setUsername(e.target.value)}/>

        <TextField
          name="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? "text" : "password"}
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
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="end"
        sx={{ my: 2 }}
      >
        <Link variant="subtitle2" underline="hover" onClick={handleSendEmailReset} style={{cursor:"pointer"}}>
          Send email reset password
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
      >
        Login
      </LoadingButton>
    </form>
  );
}
