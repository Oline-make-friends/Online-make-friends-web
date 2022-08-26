import React from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  Heading,
  Button,
  Avatar,
  Center,
} from "@chakra-ui/react";
import { BiLike } from "react-icons/bi";
import { BsFillChatLeftDotsFill } from "react-icons/bs";

const Profile = () => {
  return (
    <Box
      style={{
        overflow: "scroll",
        height: "800px",
        width: "100%",
        color: "white",
      }}
    >
      <Flex w="100%" h="500px" m="2" direction="center" p="4">
        <Image
          src="https://bit.ly/dan-abramov"
          alt="Dan Abramov"
          w="250px"
          h="300px"
          mx="4"
        />
        <Box style={{ color: "black" }} w="40%" h="100%" py="4">
          <Heading as="h1" fontSize="4xl">
            Sylwia Weller
          </Heading>
          <Text color="gray" fontSize="lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, saepe
          </Text>
          <br />
          <Flex justify="flex-start">
            <Flex direction="column" mr="30%">
              <Text style={{ fontWeight: "bold" }}>abcdxyz@gmail.com</Text>
              <Text style={{ fontWeight: "bold" }}>Software Engineer</Text>
            </Flex>
            <Flex direction="column">
              <Text style={{ fontWeight: "bold" }}>TPHCM</Text>
              <Text style={{ fontWeight: "bold" }}>Hokage</Text>
            </Flex>
          </Flex>
          <Button my="4" bg="#0076f6">
            <Text color="white">Send message</Text>
          </Button>
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
          height: "800px",
          width: "100%",
          color: "black",
        }}
      >
        <Box
          style={{
            width: "50%",
          }}
        >
          <Flex
            direction="column"
            align="start"
            border="1px"
            borderColor="black"
            borderRadius="10px"
            my="4"
            bg="white"
          >
            <Box my="2">
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
                  <Text>17/08/2022</Text>
                </Center>
              </Flex>
            </Box>
            <Box mx="2">
              <Text>Content post here</Text>
            </Box>
            <Box>
              <Image
                border="1px"
                borderColor="black"
                src="https://gamek.mediacdn.vn/133514250583805952/2020/5/31/anh-4-15909430232362015900333.png"
                alt="image"
              />
            </Box>
            <Flex alignItems="start" my="2">
              <BiLike size={25} style={{ marginRight: "5px" }} />
              <BsFillChatLeftDotsFill size={25} />

              <Text mx="2">See comment</Text>
            </Flex>
          </Flex>

          <Flex
            direction="column"
            align="start"
            border="1px"
            borderColor="black"
            borderRadius="10px"
          >
            <Box my="2">
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
                  <Text>17/08/2022</Text>
                </Center>
              </Flex>
            </Box>
            <Box mx="2">
              <Text>Content post here</Text>
            </Box>
            <Box>
              <Image
                src="https://gamek.mediacdn.vn/133514250583805952/2020/5/31/anh-4-15909430232362015900333.png"
                alt="image"
              />
            </Box>
            <Flex alignItems="start" my="2">
              <BiLike size={25} style={{ marginRight: "5px" }} />
              <BsFillChatLeftDotsFill size={25} />

              <Text mx="2">See comment</Text>
            </Flex>
          </Flex>
        </Box>
      </Center>
    </Box>
  );
};

export default Profile;
