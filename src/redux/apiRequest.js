import axios from "axios";
import { loginFail, loginStart, loginSuccess, logOut } from "./authSlice";
import {
  getUserStart,
  getUserFail,
  getUserSuccess,
  getProfileSuccess,
} from "./userSlice";

export const loginUser = async (user, dispatch, navigate, toast) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:8000/auth/loginAdmin", user);
    if (res.data === "Your are not admin") {
      return "Your are not admin";
    }
    dispatch(loginSuccess(res.data));
    toast.success("Login success!");

    navigate("/");
  } catch (error) {
    dispatch(loginFail());
    toast.error("Check username and password");
  }
};

export const logOutUser = (dispatch) => {
  try {
    dispatch(logOut());
  } catch (error) {}
};

export const loginByGmail = async (email, dispatch, navigate, toast) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      `http://localhost:8000/auth/loginByGmail/${email}`
    );
    dispatch(loginSuccess(res.data));
    navigate("/profile");
  } catch (error) {
    dispatch(loginFail());
    toast.error(error.message);
  }
};

export const handleGetAllUser = async (dispatch, toast) => {
  dispatch(getUserStart());
  try {
    const res = await axios.get("http://localhost:8000/user/getAllUser");
    dispatch(getUserSuccess(res.data));

    toast.success("get user success");
  } catch (error) {
    toast.error("can not get Users");
    dispatch(getUserFail());
  }
};

export const handleGetUserProfile = async (dispatch, toast, id) => {
  try {
    const res = await axios.post(`http://localhost:8000/user/getUser/${id}`);
    dispatch(getProfileSuccess(res.data));

    toast.success("get user profile success");
  } catch (error) {
    toast.error("can not get profile");
  }
};

export const handleSendEmailResetPassword = async (toast, username) => {
  try {
    await axios.post(
      `http://localhost:8000/sendMail/sendEmailResetPassword/${username}`
    );

    toast.success("send email success");
  } catch (error) {
    toast.error("can not find user");
  }
};
