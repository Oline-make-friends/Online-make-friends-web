import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Avatar, Flex, Text, Center, Image } from "@chakra-ui/react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./Post.css";

const Post = () => {
  const { state } = useLocation();
  const post = state.post;
  console.log(post);
  return (
    <Box
      style={{
        overflow: "scroll",
        height: "900px",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
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
        key={post._id}
      >
        <Box my="2">
          <Flex>
            <Avatar m={[2, 2]} src={`${post.created_by?.avatar_url}`} />
            <Center style={{ display: "flex", flexDirection: "column" }}>
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
        {/* hard code */}
        <Box px="4" py="2">
          <Popup
            trigger={
              <button>
                <Text>
                  <b>5 likes</b>
                </Text>
              </button>
            }
            modal
            nested
          >
            {(close) => (
              <div className="modal">
                <button className="close" onClick={close}>
                  &times;
                </button>
                <div className="header"> Likes </div>
                <div className="content">
                  <Flex>
                    <Avatar m={[2, 2]} src={`${post.created_by?.avatar_url}`} />
                    <Center
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <Text>
                        <b>{post.created_by.fullname}</b>
                      </Text>
                    </Center>
                  </Flex>
                </div>
                <div className="actions">
                  <button
                    className="button"
                    onClick={() => {
                      close();
                    }}
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            )}
          </Popup>
          <Flex alignItems="start">
            <Text mr="2">
              <b>An</b>
            </Text>
            <Text>Hehe</Text>
          </Flex>
          <Text style={{ color: "gray" }}>21 MINUTES AGO</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Post;
