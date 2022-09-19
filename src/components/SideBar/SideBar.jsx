import React, { useState } from "react";
import {
  Flex,
  Text,
  IconButton,
  Divider,
  Avatar,
  Heading,
  Button,
} from "@chakra-ui/react";
import { FiMenu, FiUser, FiHome } from "react-icons/fi";
import { VscDashboard } from "react-icons/vsc";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineMessage } from "react-icons/ai";
import NavItem from "./NavItem";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../redux/apiRequest";

export default function Sidebar() {
  const user = useSelector((state) => state.auth?.login.currentUser);
  const dispatch = useDispatch();
  const logOut = () => {
    logOutUser(dispatch);
  };
  const [navSize, changeNavSize] = useState("large");
  return (
    <Flex
      pos="sticky"
      h="100vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      borderRadius="20px"
      border="1px"
      flexDir="column"
      justifyContent="space-between"
      px="20px"
      bg="white"
    >
      <Flex
        flexDir="column"
        w="100%"
        alignItems={navSize === "small" ? "center" : "flex-start"}
        as="nav"
      >
        <IconButton
          background="none"
          mt={5}
          _hover={{ background: "none" }}
          icon={<FiMenu />}
          onClick={() => {
            if (navSize === "small") changeNavSize("large");
            else changeNavSize("small");
          }}
        />
        <NavItem
          navSize={navSize}
          icon={VscDashboard}
          title="Dashboard"
          href="/dashboard"
        />
        <NavItem navSize={navSize} icon={FiHome} title="Posts" href="/home" />
        <NavItem navSize={navSize} icon={FiUser} title="Users" href="/user" />
        <NavItem
          navSize={navSize}
          icon={IoMdNotificationsOutline}
          title="Notification"
          href="/notification"
        />
        <NavItem
          navSize={navSize}
          icon={AiOutlineMessage}
          title="Message"
          href="/message"
        />
      </Flex>

      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize === "small" ? "center" : "flex-start"}
        mb={4}
      >
        <Divider display={navSize === "small" ? "none" : "flex"} />
        <Flex mt={4} align="center">
          <Avatar size="sm" src="avatar-1.jpg" />
          <Flex
            flexDir="column"
            ml={4}
            display={navSize === "small" ? "none" : "flex"}
          >
            <Heading as="h3" size="sm">
              {user?.fullname}
            </Heading>
            <Text color="gray">Admin</Text>
            <Button onClick={() => logOut()}>Logout</Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
