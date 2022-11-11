import LinkBar from "../components/LinkBar";
import Page from "../components/Page";
import React from "react";
import {
  Box,
  GridItem,
  Grid,
  Flex,
  Text,
  Button,
  Input,
  Center,
  Textarea,
} from "@chakra-ui/react";
import { Avatar } from "@mui/material";
// import AvatarUser from "../../components/AvatarUser";
import { useNavigate } from "react-router";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const BREADCRUMBS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Course", href: "#" },
];

export default function Course() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth?.login.currentUser);
  const [courses, setCourse] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState([]);

  const handleGetAllCourse = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/course/getAll`);
      console.log(res.data);
      setCourse(res.data?.reverse());
    } catch (error) {
      console.log(error.message);
      toast.error("can not get all course");
    }
  };

  const handleCreateCourse = async () => {
    try {
      if (name === "" || description === "") {
        toast.error("check input");
        return;
      }
      await axios.post(`http://localhost:8000/course/add`, {
        created_by: user?._id,
        name: name,
        description: description,
      });
      setName("");
      setDescription("");
      toast.success("create success");
      navigate("/allCourse");
      handleGetAllCourse();
    } catch (error) {
      toast.error("create fail");
    }
  };

  useEffect(() => {
    handleGetAllCourse();
    // eslint-disable-next-line
  }, []);
  return (
    <Page title="Course">
      <LinkBar array={BREADCRUMBS}></LinkBar>
      Hello Welcome to Course Page
      <Box h="90vh" w="100vw" p="4" overflowY="scroll" bg="rgba(0,0,0,0.2)">
        {/*  */}
        {/* <Center>
        <Flex width="50%" my="4">
          <Input
            placeholder="Find course"
            //   value={find}
            //   onChange={(e) => {
            //     setFind(e.target.value);
            //   }}
            bg="white"
          />
          <Button
            mx="2"
            //   onClick={() => {
            //     handleFindPost();
            //   }}
          >
            Find
          </Button>
        </Flex>
      </Center> */}
        {/*  */}
        <Grid templateColumns="repeat(5, 1fr)" gap={6} color="black">
          <GridItem w="100%" h="300px" bg="white" p="2" borderRadius="15px">
            <Flex w="100%" h="100%" direction="column">
              <Flex w="100%" h="80%" direction="column" p="2">
                <Text as="b" fontSize="2xl">
                  Add a new Course
                </Text>
                <Input
                  placeholder="Name course"
                  value={name}
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />
                <Textarea
                  my="2"
                  placeholder="Description"
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Button
                  bg="green.400"
                  onClick={() => {
                    handleCreateCourse();
                  }}
                >
                  Add
                </Button>
              </Flex>
            </Flex>
          </GridItem>

          {courses?.map((course) => {
            return (
              <GridItem
                w="100%"
                h="300px"
                bg="white"
                p="2"
                key={course?._id}
                onClick={() =>
                  navigate("/course", {
                    state: {
                      course,
                    },
                  })
                }
                _hover={{
                  background: "blue.100",
                }}
                cursor="pointer"
                borderRadius="15px"
              >
                <Flex w="100%" h="100%" direction="column">
                  <Flex w="100%" h="50%" direction="column" p="2">
                    <Text as="b" fontSize="2xl">
                      {course?.name}
                    </Text>
                    <Text>{course?.description}</Text>
                    <Text color="gray">{course?.quizs.length} Questions</Text>
                  </Flex>
                  <Avatar
                    alt={course?.created_by?.fullname}
                    src={course?.created_by?.avatar_url}
                  />
                  {/* <A user={course?.created_by} /> */}
                </Flex>
              </GridItem>
            );
          })}
        </Grid>
      </Box>
    </Page>
  );
}
