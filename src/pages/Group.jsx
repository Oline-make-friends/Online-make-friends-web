import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Text,
  Td,
} from "@chakra-ui/react";
// import { AiFillSetting } from "react-icons/ai";
// import { RiDeleteBin5Fill } from "react-icons/ri";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Group = () => {
  const [groups, setGroup] = useState([]);
  const handleGetAllNoti = async () => {
    try {
      const res = await axios.get("http://localhost:8000/group/getAll");

      setGroup(res.data);
      console.log(res.data);
      toast.success("get all group success!");
    } catch (error) {
      toast.error("get all group  fail!");
    }
  };
  useEffect(() => {
    handleGetAllNoti();
    // eslint-disable-next-line
  }, []);
  return (
    <Box
      style={{
        overflow: "scroll",
        height: "900px",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Box
        style={{
          marginTop: "20px",
        }}
      >
        <Text
          fontSize="4xl"
          style={{ fontWeight: "bold", color: "black" }}
          ml="40px"
        >
          Manage Notification
        </Text>
        <TableContainer
          style={{ color: "black" }}
          bg="white"
          m="4"
          borderRadius="20px"
        >
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Date create</Th>
                <Th>Admin</Th>
                <Th>Name</Th>
                <Th>Content</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {groups?.map((group) => {
                var d = new Date(group?.createdAt);

                var datestring =
                  d.getDate() +
                  "-" +
                  (d.getMonth() + 1) +
                  "-" +
                  d.getFullYear() +
                  " ";
                return (
                  <Tr key={group?._id}>
                    <Td>{datestring}</Td>
                    <Td>{group?.admin}</Td>
                    <Td>{group?.name}</Td>
                    <Td>{group?.content}</Td>
                    <Td>Detail</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Group;
