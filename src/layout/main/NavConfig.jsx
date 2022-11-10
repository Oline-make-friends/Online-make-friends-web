import { MdSpaceDashboard, MdArticle, MdGroupWork, MdReport } from "react-icons/md";
import { FaHouseUser } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import { RiNotificationBadgeFill, RiCalendarEventFill } from "react-icons/ri";

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: <MdSpaceDashboard size={22}/>
  },
  {
    title: 'user',
    icon: <FaHouseUser size={22}/>,
    children: [
      {
        title: 'users',
        path: '/users'
      },
      {
        title: 'account requests',
        path: '/requests'
      }
    ]
  },
  {
    title: 'posts',
    path: '/posts',
    icon: <MdArticle size={22}/>,
  },
  {
    title: 'groups',
    path: '/groups',
    icon: <MdGroupWork size={22}/>,
  },
  {
    title: 'events',
    path: '/events',
    icon: <RiCalendarEventFill size={22}/>,
  },
  {
    title: 'notifications',
    path: '/notifications',
    icon: <RiNotificationBadgeFill size={22}/>,
  },  
  {
    title: 'reports',
    path: '/reports',
    icon: <MdReport size={22}/>,
  },
  {
    title: 'configuration',
    icon: <AiFillSetting size={22} />,
    children: [
      {
        title: 'majors',
        path: '/majors'
      },
      {
        title: 'courses',
        path: '/courses'
      }
    ]
  },
];

export default navConfig;
