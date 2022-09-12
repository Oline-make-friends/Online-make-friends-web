import React from "react";
import {
  Flex,
  Center,
  Text,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { BsPencil } from "react-icons/bs";
import { RiDeleteBin5Fill } from "react-icons/ri";

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
                Men
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
                Women
              </Text>
            </Center>
          </Box>
        </Flex>
        <Box w="100%">
          <TableContainer
            style={{ color: "black" }}
            bg="white"
            m="4"
            borderRadius="20px"
          >
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Date</Th>
                  <Th>User report</Th>
                  <Th>Status</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>1/1/2022</Td>
                  <Td>Some one</Td>
                  <Td bg="red">Pending</Td>
                  <Td>
                    <Flex>
                      <BsPencil
                        size={40}
                        style={{
                          background: "#28a745",
                          padding: "10px",
                          borderRadius: "5px",
                          margin: "0 10px",
                        }}
                      />
                      <RiDeleteBin5Fill
                        size={40}
                        style={{
                          background: "#dc3545",
                          padding: "10px",
                          borderRadius: "5px",
                        }}
                      />
                    </Flex>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
