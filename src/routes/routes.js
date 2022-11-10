import { Navigate, useRoutes } from 'react-router-dom';

import MainLayout from '../layout/main';
import LogoOnlyLayout from '../layout/LogoOnlyLayout';

import User from '../pages/User';
import UserDetail from '../pages/UserDetail';
import AccountRequest from '../pages/AccountRequest';
import Notification from '../pages/Notification';
import Group from '../pages/Group';
import Post from '../pages/Post';
import PostDetail from '../pages/PostDetail';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import NotFound from '../pages/Page404';
import Profile from '../pages/Profile'

import RequireAuth from "../components/Auth/RequireAuth";
import Report from '../pages/Report';
import Event from '../pages/Event';
import Course from '../pages/Course';
import Major from '../pages/Major';
import AccountRequestDetail from '../pages/AccountRequestDetail';

export default function Router() {
  return useRoutes([
    {
      path: '',
      element: <RequireAuth/>,
      children: [
        { path: '/', element: <MainLayout/>, children: [
          { path: '', element: <Navigate to={'dashboard'}/>},
          { path: 'dashboard', element: <Dashboard />},
          { path: 'posts', element: <Post /> },
          { path: 'post/:_id', element: <PostDetail /> },
          { path: 'users', element: <User /> },
          { path: 'user/:_id', element: <UserDetail/>},
          { path: 'requests', element: <AccountRequest /> },  
          { path: 'request/:_id', element: <AccountRequestDetail /> }, 
          { path: 'events', element: <Event /> },     
          { path: 'notifications', element: <Notification /> },
          { path: 'groups', element: <Group /> },
          { path: 'reports', element: <Report /> },
          { path: 'majors', element: <Major /> },
          { path: 'courses', element: <Course /> },
          { path: 'profile', element: <Profile /> }
        ]}        
      ]
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
