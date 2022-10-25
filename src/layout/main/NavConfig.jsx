import { MdSpaceDashboard, MdArticle, MdGroupWork, MdReport } from "react-icons/md";
import { FaHouseUser } from "react-icons/fa";
import { RiNotificationBadgeFill, RiMessage2Fill } from "react-icons/ri";

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: <MdSpaceDashboard size={22}/>,
  },
  {
    title: 'posts',
    path: '/posts',
    icon: <MdArticle size={22}/>,
  },
  {
    title: 'users',
    path: '/users',
    icon: <FaHouseUser size={22}/>,
  },
  {
    title: 'notifications',
    path: '/notifications',
    icon: <RiNotificationBadgeFill size={22}/>,
  },
  {
    title: 'messages',
    path: '/messages',
    icon: <RiMessage2Fill size={22}/>,
  },
  {
    title: 'groups',
    path: '/groups',
    icon: <MdGroupWork size={22}/>,
  },
  {
    title: 'reports',
    path: '/reports',
    icon: <MdReport size={22}/>,
  }
];

export default navConfig;
