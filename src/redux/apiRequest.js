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
    const res = await axios.post("http://localhost:8000/auth/login", user);
    dispatch(loginSuccess(res.data));
    toast.success("Login success!");
    navigate("/home");
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

export const handleGetAllUser = async (dispatch, toast) => {
  dispatch(getUserStart());
  try {
    const res = await axios.get("http://localhost:8000/user/getAll");
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
