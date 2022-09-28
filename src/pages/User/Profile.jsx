import React from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  Heading,
  Avatar,
  Center,
  Link,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

// import { BiLike } from "react-icons/bi";
// import { BsFillChatLeftDotsFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleGetUserProfile } from "../../redux/apiRequest";
import { toast } from "react-toastify";
import axios from "axios";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profile = useSelector((state) => state.user?.users.profile);
  const [posts, setPosts] = useState([]);
  const handleGetAllPost = async () => {
    try {
      const res = await axios.post("http://localhost:8000/post/get/" + id);
      toast.success("get post success!");
      setPosts(res.data);
      console.log(res.data);
    } catch (error) {
      toast.error("get post user fail!");
    }
  };

  useEffect(() => {
    const fetchUser = () => {
      handleGetUserProfile(dispatch, toast, id);
    };
    fetchUser();
    console.log(profile);
    handleGetAllPost();
    // eslint-disable-next-line
  }, []);
  return (
    <Box
      style={{
        overflow: "scroll",
        height: "900px",
        width: "100%",
        color: "white",
        overflowX: "hidden",
      }}
    >
      <Flex w="100%" h="500px" m="2" direction="center" p="4">
        <Image
          src={profile?.avatar_url}
          alt="Dan Abramov"
          w="250px"
          h="300px"
          mx="4"
        />
        <Box style={{ color: "black" }} w="40%" h="100%" py="4">
          <Heading as="h1" fontSize="4xl">
            {profile?.fullname}
          </Heading>
          <Text color="gray" fontSize="lg">
            {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, saepe */}
            {profile?.about}
          </Text>
          <br />
          <Flex justify="flex-start">
            <Flex direction="column" mr="30%">
              <Text style={{ fontWeight: "bold" }}>
                Interest : {profile?.interrests}
              </Text>
              <Text style={{ fontWeight: "bold" }}>
                Major : {profile?.major}
              </Text>
            </Flex>
            <Flex direction="column">
              <Text style={{ fontWeight: "bold" }}>
                location:{profile?.location}
              </Text>
              <Text style={{ fontWeight: "bold" }}>
                Gender:{profile?.gender}
              </Text>
            </Flex>
          </Flex>
        </Box>
        <Box style={{ color: "black" }} h="100%" py="4" m="40px">
          <Text color="gray" fontWeight="bold">
            FRIEND LIST
          </Text>
          <Flex my="2">
            <Avatar size="sm" mx="1" src="avatar-1.jpg" />
            <Avatar size="sm" mx="1" src="avatar-1.jpg" />
            <Avatar size="sm" mx="1" src="avatar-1.jpg" />
          </Flex>
        </Box>
      </Flex>
      {/* ////////////////////// */}
      <Center
        style={{
          width: "100%",
          color: "black",
        }}
      >
        <Box
          style={{
            width: "50%",
          }}
        >
          {/*  */}
          {posts?.map((post) => {
            return (
              <Flex
                direction="column"
                align="start"
                border="1px"
                borderColor="black"
                borderRadius="10px"
                my="4"
                bg="white"
                key={post._id}
              >
                <Box my="2">
                  <Flex>
                    <Avatar m={[2, 2]} src={`${post.created_by.avatar_url}`} />
                    <Center
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <Text>
                        <b>{post.created_by.fullname}</b>
                      </Text>
                      <Text>{post.createdAt.substring(0, 10)}</Text>
                    </Center>
                  </Flex>
                </Box>
                <Box mx="2">
                  <Text>{post.content}</Text>
                </Box>
                <Box>
                  <Image
                    border="1px"
                    borderColor="black"
                    src={`${post.imageUrl}`}
                    alt="image"
                  />
                </Box>
                <Flex alignItems="start" my="2">
                  {/* <BiLike size={25} style={{ marginRight: "5px" }} />
              <BsFillChatLeftDotsFill size={25} />

              <Text mx="2">See comment</Text> */}
                  <Link
                    mx="4"
                    onClick={() => {
                      navigate("/post", {
                        state: {
                          post,
                        },
                      });
                    }}
                  >
                    <b>Detail</b>
                  </Link>
                </Flex>
              </Flex>
            );
          })}

          {/*  */}
        </Box>
      </Center>
    </Box>
  );
};

export default Profile;
