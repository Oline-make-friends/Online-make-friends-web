import { Box } from "@chakra-ui/react";
import React from "react";
// import { CometChatUI } from "../../cometchat-pro-react-ui-kit/CometChatWorkspace/src";
import { CometChatUI } from "../cometchat-pro-react-ui-kit/CometChatWorkspace/src";
const CometChat = () => {
  return (
    <Box style={{ width: "98vw", height: "95vh", backgroundColor: "white" }}>
      <CometChatUI />
    </Box>
  );
};

export default CometChat;
