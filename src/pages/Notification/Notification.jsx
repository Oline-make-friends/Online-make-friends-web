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
} from "@chakra-ui/react";
// import { AiFillSetting } from "react-icons/ai";
// import { RiDeleteBin5Fill } from "react-icons/ri";
import SendNoti from "../../components/SendNoti/SendNoti";
import Noti from "../../components/SendNoti/Noti";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Notification = () => {
  const [notis, setNotis] = useState([]);
  const handleGetAllNoti = async () => {
    try {
      const res = await axios.get("http://localhost:8000/noti/getAll");
      toast.success("get notification success!");
      setNotis(res.data);
      console.log(res.data);
    } catch (error) {
      toast.error("get notification  fail!");
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
                {/* <Th>Action</Th> */}
              </Tr>
            </Thead>
            <Tbody>
              {notis?.map((noti) => {
                return <Noti key={noti._id} noti={noti} />;
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Notification;
