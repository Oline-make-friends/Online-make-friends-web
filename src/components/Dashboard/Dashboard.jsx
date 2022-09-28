import React from "react";
import { Flex, Center, Text, Box } from "@chakra-ui/react";
import Report from "./Report";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [isActive, setIsActive] = useState([]);
  const [male, setMale] = useState([]);
  const [female, setFemale] = useState([]);
  const handleGetAllUser = async () => {
    try {
      const res = await axios.get("http://localhost:8000/user/getAllUser");
      toast.success("get user success!");
      let isActive = 0;
      let male = 0;
      let female = 0;
      setUsers(res.data);
      res.data.map((user) => {
        if (user.is_active === true) isActive++;
        if (user.gender === "Male") male++;
        return "";
      });
      female = res.data.length - male;
      setIsActive(isActive);
      setFemale(female);
      setMale(male);

      console.log(res.data);
    } catch (error) {
      toast.error("get notification  fail!");
    }
  };
  useEffect(() => {
    handleGetAllUser();
  }, []);
  return (
    <Box w="100%">
      <Flex align="center" justify="start">
        <Text fontSize="4xl" style={{ fontWeight: "bold" }} ml="40px">
          Dashboard
        </Text>
      </Flex>
      <Box
        style={{
          overflow: "scroll",
          height: "800px",
          width: "100%",
          color: "white",
        }}
      >
        <Flex direction="row" w="100%" height="150px" my="4">
          <Box
            w="30%"
            mx="3%"
            bg="#f7c8cf"
            bgGradient="linear(to-r, #0076f6, pink.500)"
            height="150px"
            borderRadius="10px"
            p="4"
          >
            <Center>
              <Text as="samp" fontSize="xl">
                {users.length + " "}
                User
              </Text>
            </Center>
          </Box>
          <Box
            w="30%"
            mx="3%"
            bg="#dc3545"
            bgGradient="linear(to-r, #dc3545, pink.200)"
            height="150px"
            borderRadius="10px"
            p="4"
          >
            <Center>
              <Text as="samp" fontSize="xl">
                {isActive + " "}
                Is active
              </Text>
            </Center>
          </Box>
          <Box
            w="30%"
            mx="3%"
            height="150px"
            borderRadius="10px"
            p="4"
            bg="#ffc108"
            bgGradient="linear(to-r, #ffc108, pink.200)"
          >
            <Center>
              <Text as="samp" fontSize="xl">
                {male + " "}
                Male
              </Text>
            </Center>
          </Box>

          <Box
            w="30%"
            mx="3%"
            bg="#28a745"
            height="150px"
            borderRadius="10px"
            p="4"
            bgGradient="linear(to-r, #28a745, pink.200)"
          >
            <Center>
              <Text as="samp" fontSize="xl">
                {female + " "}
                Female
              </Text>
            </Center>
          </Box>
        </Flex>
        <Report />
      </Box>
    </Box>
  );
};

export default Dashboard;
