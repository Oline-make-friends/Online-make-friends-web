import {
  MdSpaceDashboard,
  MdArticle,
  MdGroupWork,
  MdReport,
} from "react-icons/md";
import { GiBookshelf } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import { AiFillBell } from "react-icons/ai";
import { RiCalendarEventFill } from "react-icons/ri";
import { BsFillChatFill } from "react-icons/bs";

const navConfig = [
  {
    title: "dashboard",
    path: "/dashboard",
    icon: <MdSpaceDashboard size={22} />,
  },
  {
    title: "account",
    icon: <FaUser size={22} />,
    children: [
      {
        title: "users",
        path: "/users",
      },
      {
        title: "account requests",
        path: "/requests",
      },
    ],
  },
  {
    title: "posts",
    path: "/posts",
    icon: <MdArticle size={22} />,
  },
  {
    title: "courses",
    path: "/courses",
    icon: <GiBookshelf size={22} />,
  },
  {
    title: "groups",
    path: "/groups",
    icon: <MdGroupWork size={22} />,
  },
  {
    title: "events",
    path: "/events",
    icon: <RiCalendarEventFill size={22} />,
  },
  {
    title: "reports",
    path: "/reports",
    icon: <MdReport size={22} />,
  },
  {
    title: "notifications",
    path: "/notifications",
    icon: <AiFillBell size={22} />,
  },
  {
    title: "Chat",
    path: "/chat",
    icon: <BsFillChatFill size={22} />,
  },
];

export default navConfig;
