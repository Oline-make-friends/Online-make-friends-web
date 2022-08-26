import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Avatar,
  Center,
  Text,
} from "@chakra-ui/react";
import { AiFillSetting } from "react-icons/ai";
import { RiDeleteBin5Fill } from "react-icons/ri";
import SendNoti from "../../components/SendNoti/SendNoti";

const Notification = () => {
  return (
    <Box w="100%" h="800px">
      <Text
        fontSize="4xl"
        style={{ fontWeight: "bold", color: "black" }}
        ml="40px"
      >
        Manage Notification
      </Text>
      <SendNoti />
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
              <Th>Created by</Th>
              <Th>Tittle</Th>
              <Th>Content</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>1/1/2022</Td>
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
              <Td>Tittle of notification</Td>
              <Td>Some thing here</Td>
              <Td>
                <Flex>
                  <AiFillSetting
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
  );
};

export default Notification;
