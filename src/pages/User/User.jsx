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
import { TiDelete, TiTick } from "react-icons/ti";
import { AiFillSetting } from "react-icons/ai";
import { GrStatusGoodSmall } from "react-icons/gr";
import { useEffect } from "react";
import { handleGetAllUser } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function User() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.user.users.allUser);
  console.log(userList);

  const handleGetUsers = () => {
    handleGetAllUser(dispatch, toast);
  };
  useEffect(() => {
    handleGetUsers();
    console.log(userList);
    // eslint-disable-next-line
  }, []);

  const handleStatusUser = (id) => {
    try {
      axios.post(`http://localhost:8000/user/blockUser/${id}`);
      window.location.reload();
    } catch (error) {
      toast("check user information");
    }
  };
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
              {/* <Th>Role</Th> */}
              <Th>Status</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {userList?.map((user, index) => {
              return (
                <Tr key={user._id}>
                  <Td>{index + 1}</Td>
                  <Td>
                    <Flex>
                      <Avatar
                        m={[2, 2]}
                        name="Dan Abrahmov"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8kQL47PtECE3iRRjzyfgXbNcPgFX4txEG6w&usqp=CAU"
                      />
                      <Center
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <Text>
                          <b>{user.fullname}</b>
                        </Text>
                      </Center>
                    </Flex>
                  </Td>
                  <Td>{user.createdAt.substring(0, 10)}</Td>
                  {/* <Td>{user.is_admin === true ? "Admin" : "User"}</Td> */}
                  <Td>
                    <Flex align="center">
                      {user.is_active === true ? (
                        <GrStatusGoodSmall
                          size={12}
                          style={{ color: "green" }}
                        />
                      ) : (
                        <GrStatusGoodSmall size={12} style={{ color: "red" }} />
                      )}

                      <Text mx="1">
                        {user.is_active === true ? "Active" : "Banned"}
                      </Text>
                    </Flex>
                  </Td>
                  <Td>
                    <Flex>
                      <Link>
                        <AiFillSetting
                          size={30}
                          style={{ color: "#0076f6" }}
                          onClick={() => {
                            navigate("/profile/" + user._id);
                          }}
                        />
                      </Link>

                      {user.is_active === true ? (
                        <TiDelete
                          size={30}
                          style={{ color: "red" }}
                          onClick={() => handleStatusUser(user._id)}
                        />
                      ) : (
                        <TiTick
                          size={30}
                          style={{ color: "green" }}
                          onClick={() => handleStatusUser(user._id)}
                        />
                      )}
                    </Flex>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
