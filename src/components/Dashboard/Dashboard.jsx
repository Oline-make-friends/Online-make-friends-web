import React from "react";
import {
  Flex,
  Center,
  Text,
  Box,
} from "@chakra-ui/react";
import Report from "./Report";

const Dashboard = () => {
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
                600
                <br />
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
                600
                <br />
                Banned
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
                600
                <br />
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
                600
                <br />
                Female
              </Text>
            </Center>
          </Box>
        </Flex>
        <Report/>
      </Box>
    </Box>
  );
};

export default Dashboard;
