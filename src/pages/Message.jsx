import React from "react";
import { Flex, Box, Text, Center, Input } from "@chakra-ui/react";
import { Avatar } from '@mui/material';
import { IoMdSend } from "react-icons/io";

export default function Message() {
  return (
    <Box w="100%" h="800px">
      <Flex w="100%" h="800px" bg="white">
        <Box
          w="20%"
          borderRight="1px"
          borderColor="gray.200"
          style={{
            overflow: "scroll",
          }}
        >
          <Box w="100%">
            <Text
              fontSize="2xl"
              style={{ fontWeight: "bold", color: "black" }}
              ml="40px"
            >
              Send message
            </Text>
          </Box>
          <Flex bg="#f3f5f7" borderRadius="20px" my="2">
            <Avatar
              m={[2, 2]}
              name="Dan Abrahmov"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8kQL47PtECE3iRRjzyfgXbNcPgFX4txEG6w&usqp=CAU"
            />
            <Center style={{ display: "flex", flexDirection: "column" }}>
              <Text>
                <b>Duy Phong</b>
              </Text>
              <Text color="gray">Sent you message</Text>
            </Center>
          </Flex>
          <Flex bg="#f3f5f7" borderRadius="20px" my="2">
            <Avatar
              m={[2, 2]}
              name="Dan Abrahmov"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8kQL47PtECE3iRRjzyfgXbNcPgFX4txEG6w&usqp=CAU"
            />
            <Center style={{ display: "flex", flexDirection: "column" }}>
              <Text>
                <b>Duy Phong</b>
              </Text>
              <Text color="gray">Sent you message</Text>
            </Center>
          </Flex>
        </Box>
        {/* /////////////// */}
        <Box w="80%">
          <Center w="100%" borderBottom="1px" h="15%" borderColor="gray.200">
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
          </Center>
          <Flex
            className="Box_chat"
            direction="column"
            justify="space-between"
            h="85%"
            py="4"
          >
            <Flex
              h="100%"
              w="100%"
              direction="column"
              style={{
                overflow: "scroll",
              }}
            >
              <Box
                className="Sender"
                bg="#f7c8cf"
                w="40%"
                m="4"
                borderRadius="10px"
                ml="55%"
                p="2"
              >
                <Center>
                  <Text>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Accusamus nihil necessitatibus repellendus voluptate totam
                    doloremque, nam nesciunt, porro magni ea vitae mollitia eum
                    excepturi illum sequi expedita consequatur quibusdam sit!
                  </Text>
                </Center>
              </Box>

              <Box
                className="Receiver"
                bg="#f3f5f7"
                w="40%"
                m="4"
                borderRadius="10px"
                p="2"
              >
                <Center>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                  velit dignissimos quibusdam voluptatibus debitis a repellat
                  perferendis, officia cupiditate error quidem nam eveniet quo
                  quisquam cumque aperiam qui exercitationem facilis!
                </Center>
              </Box>
            </Flex>
            <Flex borderTop="1px" h="20%" borderColor="gray.200">
              <Input
                w="80%"
                h="100%"
                placeholder="Write a message"
                wordBreak="break-word"
                border="0px"
              />
              <Center w="20%" h="100%">
                <Box p="15px" bg="#496ada" borderRadius="10px">
                  <IoMdSend />
                </Box>
              </Center>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
