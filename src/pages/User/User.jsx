import React from "react";
import {
  Box,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Avatar,
  Center,
  TableCaption,
  Link,
} from "@chakra-ui/react";
import { TiDelete } from "react-icons/ti";
import { AiFillSetting } from "react-icons/ai";
import { GrStatusGoodSmall } from "react-icons/gr";

export default function User() {
  return (
    <Box
      style={{
        overflow: "scroll",
        height: "800px",
        width: "100%",
        color: "white",
      }}
    >
      <Flex direction="row" align="center" justify="start" width="100%">
        <Text
          fontSize="4xl"
          style={{ fontWeight: "bold", color: "black" }}
          ml="40px"
        >
          Manage User
        </Text>
      </Flex>
      <TableContainer
        style={{ color: "black" }}
        bg="white"
        m="4"
        borderRadius="20px"
      >
        <Table variant="simple">
          <TableCaption>
            <Flex justify="space-between">
              <Text>Showing 5 out of 25 entris</Text>
              <Flex justify="space-between">
                <Text mx="2">Previous</Text>
                <Box
                  _hover={{ bg: "#0076f6" }}
                  _focus={{ boxShadow: "outline" }}
                  w="30px"
                  h="30px"
                >
                  1
                </Box>
                <Box
                  _hover={{ bg: "#0076f6" }}
                  _focus={{ boxShadow: "outline" }}
                  w="30px"
                  h="30px"
                >
                  2
                </Box>
                <Box
                  _hover={{ bg: "#0076f6" }}
                  _focus={{ boxShadow: "outline" }}
                  w="30px"
                  h="30px"
                >
                  3
                </Box>

                <Text mx="2">Next</Text>
              </Flex>
            </Flex>
          </TableCaption>
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Name</Th>
              <Th>Date create</Th>
              <Th>Role</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>1</Td>
              <Td>
                <Flex>
                  <Avatar
                    m={[2, 2]}
                    name="Dan Abrahmov"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8kQL47PtECE3iRRjzyfgXbNcPgFX4txEG6w&usqp=CAU"
                  />
                  <Center style={{ display: "flex", flexDirection: "column" }}>
                    <Text>
                      <b>Duy Phong</b>
                    </Text>
                  </Center>
                </Flex>
              </Td>
              <Td>1/1/2022</Td>
              <Td>Admin</Td>
              <Td>
                <Flex align="center">
                  <GrStatusGoodSmall size={12} style={{ color: "green" }} />
                  <Text mx="1">Active</Text>
                </Flex>
              </Td>
              <Td>
                <Flex>
                  <Link href="/profile">
                    <AiFillSetting size={30} style={{ color: "#0076f6" }} />
                  </Link>
                  <TiDelete size={30} style={{ color: "red" }} />
                </Flex>
              </Td>
            </Tr>
            <Tr>
              <Td>2</Td>
              <Td>
                <Flex>
                  <Avatar
                    m={[2, 2]}
                    name="Dan Abrahmov"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8kQL47PtECE3iRRjzyfgXbNcPgFX4txEG6w&usqp=CAU"
                  />
                  <Center style={{ display: "flex", flexDirection: "column" }}>
                    <Text>
                      <b>Duy Phong</b>
                    </Text>
                  </Center>
                </Flex>
              </Td>
              <Td>1/1/2022</Td>
              <Td>User</Td>
              <Td>
                <Flex align="center">
                  <GrStatusGoodSmall size={12} style={{ color: "red" }} />
                  <Text mx="1">Banned</Text>
                </Flex>
              </Td>
              <Td>
                <Flex>
                  <AiFillSetting size={30} style={{ color: "#0076f6" }} />
                  <TiDelete size={30} style={{ color: "red" }} />
                </Flex>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
