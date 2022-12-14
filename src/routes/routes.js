import { Navigate, useRoutes } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import LogoOnlyLayout from "../layout/LogoOnlyLayout";

import User from "../pages/user/User";
import UserDetail from "../pages/user/UserDetail";
import AccountRequest from "../pages/accountRequest/AccountRequest";
import AccountRequestDetail from "../pages/accountRequest/AccountRequestDetail";
import Notification from "../pages/notification/Notification";
import Group from "../pages/group/Group";
import Post from "../pages/post/Post";
import PostDetail from "../pages/post/PostDetail";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import NotFound from "../pages/Page404";
import Profile from "../pages/Profile";
import Report from "../pages/report/Report";
import Event from "../pages/event/Event";
import EventDetail from "../pages/event/EventDetail";
import Course from "../pages/course/Course";
import CourseDetail from "../pages/course/CourseDetail";
import CometChat from "../pages/Chat";

import RequireAuth from "../components/auth/RequireAuth";
import GroupDetail from "../pages/group/GroupDetail";
import ReportDetail from "../pages/report/ReportDetail";
import NotificationDetail from "../pages/notification/NotificationDetail";

export default function Router() {
  return useRoutes([
    {
      path: "",
      element: <RequireAuth />,
      children: [
        {
          path: "/",
          element: <MainLayout />,
          children: [
            { path: "", element: <Navigate to={"dashboard"} /> },
            { path: "dashboard", element: <Dashboard /> },
            { path: "posts", element: <Post /> },
            { path: "post/:_id", element: <PostDetail /> },
            { path: "users", element: <User /> },
            { path: "user/:_id", element: <UserDetail /> },
            { path: "requests", element: <AccountRequest /> },
            { path: "request/:_id", element: <AccountRequestDetail /> },
            { path: "events", element: <Event /> },
            { path: "event/:_id", element: <EventDetail /> },
            { path: "notifications", element: <Notification /> },
            { path: "notification/:_id", element: <NotificationDetail /> },
            { path: "groups", element: <Group /> },
            { path: "group/:_id", element: <GroupDetail /> },
            { path: "reports", element: <Report /> },
            { path: "report/:_id", element: <ReportDetail /> },
            { path: "courses", element: <Course /> },
            { path: "course/:_id", element: <CourseDetail /> },
            { path: "profile", element: <Profile /> },
            { path: "chat", element: <CometChat /> },
          ],
        },
      ],
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "/",
      element: <LogoOnlyLayout />,
      children: [
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);
}
