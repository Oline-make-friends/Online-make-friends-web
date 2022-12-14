import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Card,
  Container,
  Typography,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";

import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

import { loginUser, handleSendEmailResetPassword } from "../redux/apiRequest";

import useResponsive from "../hooks/useResponsive";

import Page from "../components/Page";
import Logo from "../components/Logo";

const RootStyle = styled("div")(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const HeaderStyle = styled("header")(({ theme }) => ({
  zIndex: 9,
  top: 0,
  lineHeight: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  position: "absolute",
  padding: theme.spacing(3),
  justifyContent: "space-between",
  [theme.breakpoints.up("md")]: {
    alignItems: "flex-start",
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

export default function Login() {
  const mdUp = useResponsive("up", "md");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [err, setError] = useState("");

  const logIn = async (e) => {
    try {
      e.preventDefault();
      const newUser = {
        username: email,
        password: password,
      };
      loginUser(newUser, dispatch, navigate, toast);
      if (
        (await loginUser(newUser, dispatch, navigate, toast)) ===
        "Your are not admin"
      ) {
        setError("Your are not admin");
      } else {
        setError("Email or password is wrong");
      }
    } catch (error) {
      setError("Email or password is wrong");
    }
  };

  const handleSendEmailReset = () => {
    handleSendEmailResetPassword(toast, email);
  };

  return (
    <Page title="Login">
      <RootStyle>
        <HeaderStyle>
          <Logo />
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img
              src="/illustrations/login.png"
              alt="login"
              width="80%"
              style={{ alignSelf: "center" }}
            />
          </SectionStyle>
        )}

        <Container maxWidth="sm">
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              Sign in to FStudy Admin
            </Typography>

            <Typography sx={{ color: "text.secondary", mb: 2 }}>
              Enter your details below.
            </Typography>
            {err && (
              <Alert
                severity="error"
                sx={{ display: "flex", mb: 5 }}
                onClose={() => {
                  setError("");
                }}
              >
                {err}
              </Alert>
            )}
            <form onSubmit={logIn}>
              <Stack spacing={3}>
                <TextField
                  name="email"
                  label="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <TextField
                  name="password"
                  label="Password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? (
                            <BsFillEyeFill />
                          ) : (
                            <BsFillEyeSlashFill />
                          )}
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
                <Link
                  variant="subtitle2"
                  underline="hover"
                  onClick={handleSendEmailReset}
                  style={{ cursor: "pointer" }}
                >
                  {/* Send email reset password */}
                  {err}
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
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
