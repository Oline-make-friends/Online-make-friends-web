import React from "react";

// import { CometChatUI } from "../cometchat-pro-react-ui-kit-master/cometchat-pro-react-ui-kit/CometChatWorkspace/src";
const CometChat = () => {
  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
      <iframe
        src="https://scintillating-khapse-dc761a.netlify.app/chatAdmin"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default CometChat;
