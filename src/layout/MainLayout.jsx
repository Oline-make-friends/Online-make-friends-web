import { useState } from "react";
import { Outlet } from "react-router-dom";

import { styled } from "@mui/material/styles";

import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";

const APP_BAR_SMALLSCREEN = 64;
const APP_BAR_LARGESCREEN = 92;

const RootStyle = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const MainStyle = styled("div")(({ theme }) => ({
  zIndex: 0,
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  marginTop: APP_BAR_SMALLSCREEN,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    marginTop: APP_BAR_LARGESCREEN,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

export default function MainLayout() {
  const [open, setOpen] = useState(false);

  return (
    <RootStyle>
      <Header onOpenSidebar={() => setOpen(true)} />
      <Sidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
