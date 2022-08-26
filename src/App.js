import "./App.css";
import Login from "./pages/Login/Login";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import SideBar from "./components/SideBar/SideBar";
import Dashboard from "./components/Dashboard/Dashboard";
import User from "./pages/User/User";
import Profile from "./pages/User/Profile";
import Notification from "./pages/Notification/Notification";
import Message from "./pages/Message/Message";

function App() {
  const location = useLocation();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#e9ebed",
      }}
      className="app"
    >
      {location.pathname === "/" ? "" : <SideBar />}
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/message" element={<Message />} />
      </Routes>
    </div>
  );
}

export default App;
