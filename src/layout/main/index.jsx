import { useState } from "react";
import { Outlet } from "react-router-dom";

import { styled } from "@mui/material/styles";

import Header from "./Header";
import Sidebar from "./Sidebar";

const APP_BAR_SMALLSCREEN = 64;
const APP_BAR_LARGESCREEN = 92;

const RootStyle = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const MainStyle = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_SMALLSCREEN + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_LARGESCREEN + 24,
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
