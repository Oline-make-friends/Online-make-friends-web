import React from "react";
import { Box, Avatar, Flex, Text, Center, Image } from "@chakra-ui/react";
import { BiLike } from "react-icons/bi";
import { BsFillChatLeftDotsFill } from "react-icons/bs";
const Home = () => {
  return (
    <Center
      style={{
        overflow: "scroll",
        height: "800px",
      }}
    >
      <Box
        style={{
          width: "50%",
          marginTop: "200px",
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
  );
};

export default Home;
